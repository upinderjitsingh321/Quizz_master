const UserMiddleware = require('../Middleware/UserMiddleware')
const { Create_User, Login, Getcategories, Levels, Questions_list, Attempt_Quizz, Check_Status, Add_Select_Option, Answered_question, Resume_quizz, quizz_attempt, Complete_quizz, Result_per_quizz, Result_table, Personal_details, Get_Personal_details, LeaderBoard, Clear_All_quizz, Change_Password, Reset_password, Forgot_password } = require('./Stud_Controller')
const upload = require("../Middleware/Multer"); // adjust path if needed

const router=require('express').Router()


router.post('/create_user',Create_User)
router.post('/login',Login)
router.get('/get_categories',UserMiddleware,Getcategories)
router.get('/get_levels',UserMiddleware,Levels)
router.get('/get_all_question/:categoryid/:levelId',UserMiddleware,Questions_list)
router.post('/attempt_quizz',UserMiddleware,Attempt_Quizz)
router.get('/check_status',UserMiddleware,Check_Status)
router.post('/select_option',UserMiddleware,Add_Select_Option)
router.get('/rest_question',UserMiddleware,Answered_question)
router.get('/Continue_question',UserMiddleware,Resume_quizz)
router.get('/attempt_quizz_id',UserMiddleware,quizz_attempt)
router.put('/complete_quizz',UserMiddleware,Complete_quizz)
router.get('/quizz_result',UserMiddleware,Result_per_quizz)
router.post('/result',UserMiddleware,Result_table)
router.post('/personal_details',UserMiddleware,upload.single("file"),Personal_details)
router.get('/get_personal_details',UserMiddleware,Get_Personal_details)
router.put('/password_change',UserMiddleware,Change_Password)
router.get('/leader_board',UserMiddleware,LeaderBoard)
router.put('/clear_all_quizz',UserMiddleware,Clear_All_quizz)
router.post('/reset_password/:token',Reset_password)
router.post('/forgot_password',Forgot_password)
// router.get('/correct_answer',UserMiddleware,Correct_answer)


module.exports=router