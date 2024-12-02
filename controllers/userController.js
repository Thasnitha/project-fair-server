// always function 

//register
exports.registerController=(req,res)=>{
    console.log("inside register controller");
    const {username,email,password}=req.body // object destructuring 
    console.log(username,email,password);
    
    res.status(200).json("Request recieved !!!")
    

}
//user
//profile updation 