const router = require('express').Router();
const {logIn} = require('../controllers/login')

router.get('/', (req,res,nextt)=>{
    res.json('login here')
});
router.post('/',logIn)





module.exports = router;