const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send(`Server is Running at port ${process.env.PORT || 5000}`);
});

module.exports = router