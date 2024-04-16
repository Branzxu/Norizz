const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.User;
const Progres = db.Progres;

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username dan password harus diisi!" });
        }

        const existingUsername = await User.findOne({ where: { username: username } });
        if (existingUsername) {
            return res.status(400).json({ message: "Username sudah digunakan!" });
        }

        const passwordHashed = await bcrypt.hash(password, 10);
        const newProgres = await Progres.create({
            user_id: username,
            nama_level: 'INDONESIA',
            question: 0
        });
        const newProgresS = await Progres.create({
            user_id: username,
            nama_level: 'OTHERS',
            question: 0
        });
        const newUser = await User.create({
            username: username,
            password: passwordHashed,
        });

        const responseData = {
            username: newUser.username,
        };

        res.json({
            message: "Register berhasil!",
            data: responseData
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

exports.login = async (req, res) =>{
    try{
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username dan password harus diisi!" });
        }

        const existingUsername = await User.findOne({ where: { username: username } });
        if (!existingUsername) {
            return res.status(400).json({ message: "Username tidak ditemukan!" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUsername.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Password salah!" });
        }

        const responseData = {
            username: existingUsername.username,
        };

        res.json({
            message: "Login berhasil!",
            data: responseData
        });
    }catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
}