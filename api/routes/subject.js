const router = require('express').Router();
const subject =require('../controllers/POST/subject')
let middleware = require('../jwt/middleware')


router.get('/',middleware.checkToken, subject.allSubject)
router.get('/:subjectid',middleware.checkToken,subject.findsubject)
router.post('/',middleware.checkToken,subject.addPrimary)
router.post('/tutor/register',middleware.checkToken,subject.TutorRegister)
router.post('/tutor',middleware.checkToken,subject.tutorfind)
router.post('/tutor/subject',middleware.checkToken,subject.tutorsubjects)
router.delete('/tutor/:tutorid',middleware.checkToken,subject.deleteID)
router.put('/tutor/:tutorid',middleware.checkToken,subject.updateid)




module.exports = router;