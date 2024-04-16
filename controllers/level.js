const db = require("../models");
const Level = db.Level;

exports.addLevel = async (req, res) => {
    try {
        const { nama_level } = req.body;
        if (!nama_level) {
            return res.status(400).json({ message: "Nama level harus diisi!" });
        }

        const existingLevel = await Level.findOne({ where: { nama_level: nama_level } });
        if (existingLevel) {
            return res.status(400).json({ message: "Nama level sudah ada!" });
        }

        const newLevel = await Level.create({
            nama_level: nama_level,
        });


        res.json({
            message: "Level added!",
            data: newLevel
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
};


