const db = require("../models");
const Question = db.Question;
const Progres = db.Progres;
const path = require('path');

exports.createQuestion = async (req, res) => {
    try {
        const { level, soal, jawaban, nama } = req.body;
        const { pilihan1, pilihan2, pilihan3, pilihan4, desc } = req.files;

        if ( !level || !soal || !jawaban || !nama || !pilihan1 || !pilihan2 || !pilihan3 || !pilihan4 || !desc) {
            return res.status(400).json({ message: "Semuanya harus diisi!" });
        }

        const pilihanPath1 = pilihan1[0].path;
        const pilihanPath2 = pilihan2[0].path;
        const pilihanPath3 = pilihan3[0].path;
        const pilihanPath4 = pilihan4[0].path;
        const descPath = desc[0].path;

        const newQuestion = await Question.create({
            
            level:level,
            soal: soal,
            pilihan1: pilihanPath1,
            pilihan2: pilihanPath2,
            pilihan3: pilihanPath3,
            pilihan4: pilihanPath4,
            jawaban: jawaban,
            nama:nama,
            desc:descPath
        });

        res.json({
            message: "Pertanyaan berhasil dibuat!",
            data: newQuestion
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

exports.answerQuestion = async (req, res) =>{
    try{
        const { username, nama_level, question_id, answer} = req.body;

    if ( !username || !nama_level || !question_id ||!answer  ) {
        return res.status(400).json({ message: "Semuanya harus diisi!" });
    }

    const question = await Question.findOne({ where: { id: question_id } });

    if(req.body.answer == question.jawaban){
        const existingProgres = await Progres.findOne({
            where: {
                user_id: username,
                nama_level: nama_level,
                question: question_id
            }
        });
        if (existingProgres) {
            // Lakukan tindakan yang sesuai, misalnya memberikan pesan kepada pengguna
            res.status(200).json({
                message: "Kamu sudah pernah menjawab"
            });
        } else {
            // Jika entri belum ada, buat entri baru
            const newProgres = await Progres.create({
                user_id: username,
                nama_level: nama_level,
                question: question_id
            });

            const data = await Question.findOne({
                where: {
                    id: question_id,
                }
            });
        
            // Kirim respons dengan pesan yang sesuai
            res.status(200).json({
                message: "Correct!",
                data: data
            });
        }
    } else {
        res.status(200).json({
            "message": "Wrong!"
        })
    }
    }catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

exports.getQuestion = async (req, res) =>{
    try{
        let data = [];
        const { user_id, nama_level } = req.params; 
        const allProgres = await Progres.findAll({ 
            where: { 
                user_id: user_id,
                nama_level: nama_level
            } 
        });
        
        if (allProgres.length > 0) {
            for (let i = 1; i <= 9; i++) {
                if (i <= allProgres.length) {
                    data.push({ id: i.toString() });
                } else {
                    data.push({ id: '0' });
                }
            }
            res.json({
                message: "OKE",
                data: data
            });
        } else {
            data = Array(9).fill({ id: '0' });
            res.status(404).json({
                message: "EROR",
                data: data
            });
        }
        
    }catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

exports.getQuestion2 = async (req, res) =>{
    try{
        const { id, level } = req.params; 
        const allQuestion = await Question.findAll({ 
            where: { 
                id: id,
                level: level
            } 
        });
        
        res.status(404).json({
            message: "OK",
            data: allQuestion})
        
    }catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

exports.createeQuestion = async (req, res) => {
    try {
        const { level, soal, pilihan1, pilihan2, pilihan3, pilihan4, jawaban, nama, desc } = req.body;
       
        const newQuestion = await Question.create({
            level: level,
            soal:soal,
            pilihan1:pilihan1,
            pilihan2:pilihan2,
            pilihan3:pilihan3,
            pilihan4:pilihan4,
            jawaban:jawaban,
            nama:nama,
            desc:desc
        });

        res.json({
            message: "ok",
            data: newQuestion,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
};