const router = require('express').Router();
const {signup} = require('../controllers/signup');


router.get('/', (req,res,nextt)=>{
    res.json('register here')
});

router.post('/', signup)

module.exports = router;