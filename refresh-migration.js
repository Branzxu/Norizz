const db = require('./models');

async function refreshMigration() {
    try {
        await db.sequelize.sync({ force: true });
        console.log('Migration refreshed successfully');
    } catch (error) {
        console.error('Error refreshing migration:', error);
    } finally {
        await db.sequelize.close();
    }
}

refreshMigration();
