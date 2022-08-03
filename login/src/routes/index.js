const express= require('express');
const router = express.Router();

router.get ('/', (req, res) =>{
    res.send('Bienvenido a Developers');
});

module.exports = router;