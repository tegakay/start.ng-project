const lesson = require('../../../models/lesson')
const primary = require('../../../models/primary')
const mongoose = require('mongoose');

//Finish up and test

exports.booklesson = (req, res) => {

    const lessonTitle = req.body.lessonTitle;
    const Bookedby = req.body.Bookedby;
    const subject = req.body.subject;
    const className = req.body.className;

    if (!lessonTitle || !Bookedby || !subject || !className) {
        res.status(400).send({ message: 'all fields are required' })
    }

   lesson.findOne({ lessonTitle:lessonTitle })
       .then((lessons) => {
            if (lessons) {
                return res.status(423).send({ message: 'lesson already exists, try again' })

           } else {
                let lesson1 = new lesson(req.body);
                lesson1.save()
                
               }
       }).catch(
         (err)=>{throw err}
       ).then(()=>{
        primary.findOne({ class: className, subjectName: subject })
        .populate('lessonName')
        .exec(()=>res.status(200).send({message:'saved successfully'}))
       

       })



}

exports.findLesson = (req, res) => {
    lesson.find()
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
      });
    });

}
exports.findid = (req,res) =>{
    lesson.findById(req.params.lessonId).sort('-updatedAt')
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: "lesson not found with id " + req.params.lessonId
        });
      }
      res.send(order);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Order not found with id " + req.params.lessonId
        });
      }
      return res.status(500).send({
        message: "Error retrieving order with id " + req.params.lessonId
      });
    });
}

exports.updatelesson = (req,res)=>{
    lesson.findByIdAndUpdate(req.params.lessonId)
    .then(subjects => {
        if(!subjects) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.lessonId
            });
        }
        res.send({message: "Transaction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.lessonId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Transaction with id " + req.params.lessonId
        });
    });
}

exports.deletelesson = (req,res)=>{
    lesson.findByIdAndRemove(req.params.lessonId)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.lessonId
            });
        }
        res.send({message: "Transaction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.lessonId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Transaction with id " + req.params.lessonId
        });
    });
}
//update delete and get a lesson

