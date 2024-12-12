const express= require('express')
const userController=require('../controllers/userController')
const router=new express.Router()
const projectController=require('../controllers/projectController')
const jwtMiddleWare=require('../middlewares/jwtMiddlewares')
const multerMiddleWare = require('../middlewares/multerMiddleWare')

//register-post
router.post('/register',userController.registerController)
//login-post
router.post('/login',userController.loginController)
//add-project-post
router.post('/add-project',jwtMiddleWare,multerMiddleWare.single('projectimage'),projectController.addprojectController)
//home-project
router.get('/home-projects',projectController.getHomeProjectsController)
//user-project
router.get('/user-projects',jwtMiddleWare,projectController.getUserProjectsController)
//all-project
router.get('/all-projects',jwtMiddleWare,projectController.getAllProjectsController)
//edit-project
router.put('/projects/:id/edit',jwtMiddleWare,multerMiddleWare.single("projectimage"),projectController.editProjectController)
//remove the project
router.delete('/projects/:id/remove',jwtMiddleWare,projectController.removeProjectController)
//edit user-put
router.put('/user/edit',jwtMiddleWare,multerMiddleWare.single("profilePic"),userController.editUserController)

module.exports=router

