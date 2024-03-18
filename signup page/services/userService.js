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
const createFruits=async(data,table)=>{

    const insertQuery = `INSERT INTO fruits_table (fruits_name) VALUES ('${data}')`;
    const [rows,fiels]= await table.query(insertQuery)
    return rows;
               
}
const getFruitservice=async(data,table)=>{

    const insertQuery =`SELECT fruits_name FROM fruits_table WHERE id=('${data}') `;
    const [rows,fiels]= await table.query(insertQuery)
    console.log(rows)
    return rows;   
}
module.exports = { checkEmailExistence, createUser,createFruits,getFruitservice};
