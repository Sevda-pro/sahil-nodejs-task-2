module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define('users', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            isInt: {
              msg: 'Age must be a valid integer',
            },
            min: {
              args: [18],
              msg: 'Age must be greater than or equal to 18',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'Email address already exists',
          },
          validate: {
            isEmail: {
              msg: 'Invalid email address',
            },
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [8],
              msg: 'Password must be at least 8 characters long',
            },
            
            haveUnique(value) {
                if (!/[!@#]/.test(value)) {
                    throw new Error('Password must contain at least one special character');
                }
            },
            
          },
        },
      });
    return users
}