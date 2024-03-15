const jwt=require('jsonwebtoken')
const authentication = async (req, res, next) => {
    try {

        const token = req.cookies.jwt
        const { userId } = jwt.verify(token, process.env.secret_key);
        req.id=userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: error });
    }
};
module.exports={authentication}