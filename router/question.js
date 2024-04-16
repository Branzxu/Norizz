const questionController = require('../controllers/question');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        let prefix = '';
        if (file.fieldname === 'pilihan1') {
            prefix = 'pilihan1_';
        } else if (file.fieldname === 'pilihan2') {
            prefix = 'pilihan2_';
        } else if (file.fieldname === 'pilihan3') {
            prefix = 'pilihan3_';
        }else if (file.fieldname === 'pilihan4') {
            prefix = 'pilihan4_';
        }
        else if (file.fieldname === 'desc') {
            prefix = 'desc_';
        }
        const fileName = `${prefix}${timestamp}${path.extname(file.originalname)}`;
        cb(null, fileName); 
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'pilihan1', maxCount: 1 }, 
    { name: 'pilihan2', maxCount: 1 }, 
    { name: 'pilihan3', maxCount: 1 },
    { name: 'pilihan4', maxCount: 1 },
    { name: 'desc', maxCount: 1 },
]);

router.post('/add', upload, questionController.createQuestion);
router.post('/addd', upload, questionController.createeQuestion);
router.post('/answer', questionController.answerQuestion);
router.get('/get/:user_id/:nama_level', questionController.getQuestion);
router.get('/get2/:id/:level', questionController.getQuestion2);

module.exports = router;
