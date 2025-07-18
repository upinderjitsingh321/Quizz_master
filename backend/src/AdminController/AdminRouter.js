
const router=require('express').Router()
const AdminMiddleware = require('../Middleware/AdminMiddleware');
const upload = require("../Middleware/Multer"); // adjust path if needed
const { Get_Personal_details } = require('../StutentController/Stud_Controller');
const { Category_Level, Get_Category, Add_question, Options, Users_List, Questions_list, Admin_details, Update_Admin_details, Admin_LeaderBoard, Delete_User, Admin_Change_Password } = require('./AdminController');


router.post('/category_level',upload.single("file"),Category_Level)
router.get('/get_catagories',AdminMiddleware,Get_Category)
router.post('/add_questons',AdminMiddleware,Add_question)
router.post('/add_option',AdminMiddleware,Options)
router.get('/users_list',AdminMiddleware,Users_List)
router.get('/questions_list',AdminMiddleware,Questions_list)
router.get('/admin_details',AdminMiddleware,Admin_details)
router.post('/admin_update_details',AdminMiddleware,Update_Admin_details)
router.put('/admin_password_change',AdminMiddleware,Admin_Change_Password)
router.get('/admin_leader_board',AdminMiddleware,Admin_LeaderBoard)
router.delete('/delete_user',AdminMiddleware,Delete_User)


module.exports=router