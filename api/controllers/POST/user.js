const user = require('../../../models/user')

//admin search for all users
exports.findtutors = (req, res, next) => {
    user.find({ role: 'tutor' })
        .then((result) => res.send(result))
        .catch((err) => res.status(500).send({ message: 'an error occured,try again' }))
}
exports.findtutorid = (req, res) => {
    user.findById(req.params.tutorId).sort('-updatedAt')
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "lesson not found with id " + req.params.tutorId
                });
            }
            res.send(order);
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.tutorId
                });
            }
            return res.status(500).send({
                message: "Error retrieving order with id " + req.params.tutorId
            });
        });
}
