const primary = require('../../../models/primary')
const mongoose = require('mongoose');


exports.addPrimary = (req, res, next) => {



  const className = req.body.className;
  const tutor = req.body.tutor;
  const subjectName = req.body.subjectName;


  if (!className) {
    res.status(400).send({
      status: false,
      message: "Class cant be empty"
    })
    return;
  }

  primary.find({subjectName: subjectName })
    .then(subject => {
      if (subject) {
        return res
          .status(423)
          .send({ status: false, message: "This subject already exists" });
      } else {
        const primaryclass = new primary({

          className: req.body.className,
          tutor: req.body.tutor,
          subjectName: req.body.subjectName

        });
        primaryclass.save()
          .then((result) => {
            //  console.log(primaryclass)
            res.status(200).send({ message: 'successful' })
          })
          .catch(err => {
            res.status(500).send({ message: 'bad request' })
          })
      }

    })






}

exports.allSubject = (req, res, next) => {
  primary.find()
    .then(
      (result => {
        //  console.log(result)
        res.send(result);
      }))
    .catch(err => res.status(500).send({ message: 'an error occured try again later' }))



}
//fix the ids
exports.findsubject = (req, res, next) => {
  primary.findById({ subject_id: req.params.subjectId })
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

//Test
exports.TutorRegister = (req, res, next) => {

  const classNAme = req.body.class;
  const TutorName = req.body.tutor;
  const subjectTitle = req.body.subjectTitle;


  if (!className || !TutorName || !lessonName) {
    res.status(404).send({ message: 'all fields are required' })
  }
  primary.findOneAndUpdate({ class: className, subjectName: subjectTitle }, { tutor: TutorName })
    .then((err, result) => {
      if (err) {
        res.status(500).send({ mesage: 'an error occured,Try again later' })
      } else {
        res.status(200).send({ message: 'saved successfully' })
      }
    })
}
exports.tutorfind = (req, res, next) => {
  const tutor = req.body.tutor;
  if (!tutor) {
    res.status(400).send({ message: 'name cant be blank' })
  }
  primary.find({ tutor })
    .then((result) => {
      if (result) {
        res.send(result)
      } else {
        res.status(404).send({ message: 'an error occured' })
      }
    })

}
//tutor find subject they take
exports.tutorsubjects = (req, res) => {
  primary.findAll({ tutor: req.body.tutorName })
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving your subjects."
      });
    });
}
//correct this

exports.deleteID = (req, res, next) => {
  primary.findByIdAndRemove(req.params.subjectId)
    .then(transaction => {
      if (!transaction) {
        return res.status(404).send({
          message: "Transaction not found with id " + req.params.subjectId
        });
      }
      res.send({ message: "Transaction deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Transaction not found with id " + req.params.subjectId
        });
      }
      return res.status(500).send({
        message: "Could not delete Transaction with id " + req.params.subjectId
      });
    });
}
exports.updateid = (req, res, next) => {
  primary.findByIdAndUpdate(req.params.subjectId)
    .then(subjects => {
      if (!subjects) {
        return res.status(404).send({
          message: "Transaction not found with id " + req.params.subjectId
        });
      }
      res.send({ message: "Transaction deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Transaction not found with id " + req.params.subjectId
        });
      }
      return res.status(500).send({
        message: "Could not delete Transaction with id " + req.params.subjectId
      });
    });
}