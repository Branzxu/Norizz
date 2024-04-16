module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define('question', {
      id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        level: {
          type: Sequelize.STRING
        },
        soal: {
          type: Sequelize.STRING
        },
        pilihan1: {
          type: Sequelize.STRING
        },
        pilihan2: {
          type: Sequelize.STRING
        },
        pilihan3: {
          type: Sequelize.STRING
        },
        pilihan4: {
          type: Sequelize.STRING
        },
        jawaban: {
          type: Sequelize.STRING
        },
        nama:{
          type: Sequelize.STRING
        },
        desc:{
          type: Sequelize.STRING
        },
  });
  return Question;
}