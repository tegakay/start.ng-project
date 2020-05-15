const router = require('express').Router();
const user =require('../controllers/POST/user')
let middleware = require('../jwt/middleware')

router.get('/', user.findtutors)
router.post('/:tutorid',user.findtutorid)





module.exports = router;