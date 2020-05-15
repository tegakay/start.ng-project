const router = require('express').Router();
const user =require('../controllers/POST/user')


router.get('/', user.findtutors)
router.post('/:tutorid',user.findtutorid)





module.exports = router;