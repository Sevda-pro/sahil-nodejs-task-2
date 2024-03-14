module.exports = (sequelize, Sequelize) => {
    const salary = sequelize.define('salary', {
        email: {
            type: Sequelize.STRING,
            unique:true,
          },
          salary:{
            type: Sequelize.INTEGER,
            allowNull:false
          }
    });
    return salary
}

