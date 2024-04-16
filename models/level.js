module.exports = (sequelize, Sequelize) => {
    const Level = sequelize.define('level', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
          },
          nama_level: {
            type: Sequelize.STRING,
          },
    });
    return Level;
}