const router = require('express').Router();
const subject =require('../controllers/POST/subject')


router.get('/', subject.allSubject)
router.get('/:subjectid',subject.findsubject)
router.post('/',subject.addPrimary)
router.post('/tutor/register',subject.TutorRegister)
router.post('/tutor',subject.tutorfind)
router.post('/tutor/subject',subject.tutorsubjects)
router.delete('/tutor/:tutorid',subject.deleteID)
router.put('/tutor/:tutorid',subject.updateid)




module.exports = router;