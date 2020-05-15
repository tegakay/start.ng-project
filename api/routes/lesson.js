const router = require('express').Router();
const lesson =require('../controllers/POST/lesson')
let middleware = require('../jwt/middleware')


router.get('/',middleware.checkToken, lesson.findLesson)
router.post('/',middleware.checkToken,lesson.booklesson)
router.get('/:lessonid',middleware.checkToken, lesson.findid)
router.delete('/:lessonid',middleware.checkToken,lesson.deletelesson)
router.put('/:lessonid',middleware.checkToken, lesson.updatelesson)





module.exports = router;