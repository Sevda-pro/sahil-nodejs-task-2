const {check}=require('express-validator')

exports.signUpValidation=[
    check('name','Name is Required').not().isEmpty(),
    check('age','Age is Required').not().isEmpty(),
    check('email','Email is Required').isEmail(),
    check('password','Password is Required').isLength({min:8})
]