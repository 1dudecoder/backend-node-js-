const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("welcome home sir");
})

module.exports = router;
