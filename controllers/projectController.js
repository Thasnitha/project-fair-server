const projects=require('../models/projectModel')
//add project
exports.addprojectController=async (req,res)=>{
    console.log('inside addprojectController ');
    //middleware logic

    const userId=req.userId
    // console.log(userId);
    // console.log(req.body);
    // console.log(req.file);
    const{title,languages,overView,github,website,}=req.body  //destructure data from req body
    const projectImage=req.file.filename
    try{
        const existingProject=await projects.findOne({github})
        if(existingProject){
            res.status(400).json("project already exists...please upload another!!!")

            
        }else{
            //create a new object
            const newProject=new projects({
                title,languages,overView,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }
}
    
    
//get home projects-guest user
exports.getHomeProjectsController=async(req,res)=>{
    console.log("Inside getHomeProjectController");
    try{
        const allHomeProject=await projects.find().limit(3)
        res.status(200).json(allHomeProject)

    }catch(err){
        res.status(401).json(err)

    }
    
}

    
//get user projects-authorised user
exports.getUserProjectsController=async(req,res)=>{
    console.log("Inside getUserProjectController");
    const userId=req.userId
    try{
        const alluserProject=await projects.find({userId})
        res.status(200).json(alluserProject)

    }catch(err){
        res.status(401).json(err)

    }
    
}

//get all projects-authorized user
exports.getAllProjectsController=async(req,res)=>{
    console.log("Inside getAllProjectController");
    //to get query parameter from url use req.query
    const searchKey=req.query.search
    const query={
        languages:{
            //case insensitive
            $regex:searchKey,$options:"i"
        }
    }
    try{
        const allProject=await projects.find(query)
        res.status(200).json(allProject)

    }catch(err){
        res.status(401).json(err)

    }
    
}
//edit project use findByIdAndUpdate
exports.editProjectController=async(req,res)=>{
    console.log('Inside EditController');
    //get project id from request params
    const{id}=req.params
    //req body contains only text type data
    const{title,languages,overView,github,website,projectImage}=req.body
    //to get file data-req.file
    const reUploadImageFileName=req.file?req.file.filename:projectImage
    //to get userId-use jwtmiddleware
    const userId=req.userId
    console.log(id,title,languages,overView,github,website,reUploadImageFileName,userId);
    try{
        const updatedProject=await projects.findByIdAndUpdate({_id:id},{
            title,languages,overView,github,website,projectImage:reUploadImageFileName,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)

    }catch(err){
        res.status(401).json(err)
    }
    

    
}


//remove project
exports.removeProjectController=async(req,res)=>{
    console.log('Inside removeProjectController ');
    //1.get id of the project to be deleted
    const {id}=req.params
    //delete project with given id from model
    try{
        const removeProject=await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)


    }catch(err){
        res.status(401).json(err)

    }
    
    
}
