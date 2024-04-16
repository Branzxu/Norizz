module.exports = (sequelize, Sequelize) => {
    const Progres = sequelize.define('progres', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
          },
          user_id: {
            type: Sequelize.STRING,
          },
          nama_level: {
            type: Sequelize.STRING,
          },
          question: {
            type: Sequelize.BIGINT,
          },
    });
    return Progres;
}