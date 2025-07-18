const BASE_URL = import.meta.env.VITE_API_URL


export const USERS ={
    SIGNUP :`${BASE_URL}/api/student/create_user`,
    LOGIN :`${BASE_URL}/api/student/login`,
    CATEGORY_LEVEL :`${BASE_URL}/api/admin/category_level`,
    GET_CATEGORY :`${BASE_URL}/api/admin/get_catagories`,
    ADD_QUESTION :`${BASE_URL}/api/admin/add_questons`,
    ADD_OPTIONS :`${BASE_URL}/api/admin/add_option`,
    USERS_LIST :`${BASE_URL}/api/admin/users_list`,
    QUESTIONS_LIST :`${BASE_URL}/api/admin/questions_list`,
    GET_CATEGORIES :`${BASE_URL}/api/student/get_categories`,
    GET_LEVELS :`${BASE_URL}/api/student/get_levels`,
    GET_ALL_QUESTION :`${BASE_URL}/api/student/get_all_question`,
    GET_OPTIONS :`${BASE_URL}/api/student/get_all_options`,
    ATTEMPT_QUIZZ :`${BASE_URL}/api/student/attempt_quizz`,
    CHECK_STATUS :`${BASE_URL}/api/student/check_status`,
    SELECT_OPTION_ADD_IN_ANSWERTABLE :`${BASE_URL}/api/student/select_option`,
    LIST_REST_QUESTION :`${BASE_URL}/api/student/rest_question`,
    CONTINUE_QUESTION :`${BASE_URL}/api/student/Continue_question`,
    ATTEMPT_QUIZZ_ID :`${BASE_URL}/api/student/attempt_quizz_id`,
    COMPLETE_QUIZZ :`${BASE_URL}/api/student/complete_quizz`,
    CLEAR_ALL_QUIZZ :`${BASE_URL}/api/student/clear_all_quizz`,
    QUIZZ_RESULT :`${BASE_URL}/api/student/quizz_result`,
    RESULT :`${BASE_URL}/api/student/result`,
    UPDATE_USER_DETAILS :`${BASE_URL}/api/student/personal_details`,
    UPDATE_ADMIN_DETAILS :`${BASE_URL}/api/admin/admin_update_details`,
    GET_USER_DETAILS :`${BASE_URL}/api/student/get_personal_details`,
    ADMIN_USER_DETAILS :`${BASE_URL}/api/admin/Admin_details`,
    PASSWORD_CHANGE :`${BASE_URL}/api/student/password_change`,
    ADMIN_PASSWORD_CHANGE :`${BASE_URL}/api/admin/admin_password_change`,
    LEADERBOARD :`${BASE_URL}/api/student/leader_board`,
    ADMIN_LEADERBOARD :`${BASE_URL}/api/admin/admin_leader_board`,
    DELETE_USER :`${BASE_URL}/api/admin/delete_user`,
    FORGOT_PASSWORD :`${BASE_URL}/api/student/forgot_password`,
    RESET_PASSWORD :`${BASE_URL}/api/student/reset_password`,
}