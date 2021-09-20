function auther(req,res,next){
    console.log("Authentication");
    next();
}

module.exports = auther;