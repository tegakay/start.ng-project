const router = require('express').Router();
const lesson =require('../controllers/POST/lesson')


router.get('/', lesson.findLesson)
router.post('/',lesson.booklesson)
router.get('/:lessonid', lesson.findid)
router.delete('/:lessonid',lesson.deletelesson)
router.put('/:lessonid', lesson.updatelesson)





module.exports = router;