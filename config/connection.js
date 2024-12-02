const mongoose=require ('mongoose')
const connection_string=process.env.CONNECTIONSTRING
mongoose.connect(connection_string).then((res)=>{
    console.log("MongoDB Atlas Connected successfully with PFServer");
    
}).catch(err=>{
    console.log("MongoDB Atlas Connection Failed");
    console.log(err);
    
})