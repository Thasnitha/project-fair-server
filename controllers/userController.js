const jwtMiddleware = require('../middlewares/jwtMiddlewares');
const users=require('../models/userModel')
const jwt=require('jsonwebtoken')
// always function 

//register
exports.registerController=async(req,res)=>{
    console.log("inside register controller");
    const {username,email,password}=req.body // object destructuring 
    console.log(username,email,password);
    
    //modal
 try{
    const existingUser=await users.findOne({email})
    if(existingUser){
        res.status(406).json("user already exist..please Login")//same like return

    }else{
        const newUser=new users({
            username,email,password,github:"",linkedin:"",profilePic:""

        })
      await newUser.save()
      res.status(200).json(newUser)
    }
 }catch(err){
    res.status(401).json(err)
 }
}
//login

exports.loginController=async(req,res)=>{
    console.log("inside loginController");
    const {email,password}=req.body // object destructuring 
    console.log(email,password);
    
    //modal
 try{
    const existingUser=await users.findOne({email,password})
    if(existingUser){
        //token generate
        const token=jwt.sign({userId:existingUser._id},process.env.JWTPSWD)
        res.status(200).json({
            user:existingUser,
            token

        })

    }else{
        res.status(404).json("Invalid E0mail/password")

        }
 }catch(err){
    res.status(401).json(err)
 }
}
//profile updation 
exports.editUserController=async(req,res)=>{
    console.log("Inside editUserController");
    //get id of user from jwtMiddleware req.userId
    const userId=req.userId
    //multer will active in this route
    //2.get text data from req.Body file data from req.file
    const{username,email,password,github,linkedin,profilePic}=req.body
    const updateProfileImgFile=req.file?req.file.filename:profilePic
    //updateuser -findById
    try{
        const updateUser=await users.findByIdAndUpdate({_id:userId},{

           username,email,password,github,linkedin,profilePic:updateProfileImgFile 

        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)

    }catch(err){
        res.status(401).json(err)

    }
    
}