const bcrypt = require('bcrypt');
const checkEmailExistence = async (email, con) => {
    const checkEmailQuery = `SELECT * FROM signup WHERE email = '${email}'`;
    const [rows, fields] = await con.query(checkEmailQuery);
    return rows.length > 0;
};

const createUser = async (data, con) => {
    const { email, name, age, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = `INSERT INTO signup (name, age, email, password) VALUES ('${name}', ${age}, '${email}', '${hashedPassword}')`;
    const insertResult = await con.query(insertQuery);
    return insertResult;
};

module.exports = { checkEmailExistence, createUser };
