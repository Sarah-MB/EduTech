const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');
//const auth = require('../modules/auth');

//create subject
router.post('/subject', adminControllers.createSubject )

//create category
router.post('/category', adminControllers.createCategory )

//update subject by id
router.update('/subject', adminControllers.updateSubjectById);

//delete subject by id
router.delete('/subject', adminControllers.deleteSubjectById)


//delete category
router.delete('/category', adminControllers.deleteCategory);


module.exports = router;