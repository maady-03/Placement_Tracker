const validator  =require('validator');

function validate(data){
    const mandatoryFields = ['username', 'email', 'password'];

    const isAllFieldsPresent = mandatoryFields.every((k)=>Object.keys(data).includes(k));
    if(!isAllFieldsPresent){
        throw new Error("Missing mandatory fields");
    } 
    if(!validator.isEmail(data.email)){
        throw new Error("Invalid Email");
    }

    if(!validator.isStrongPassword(data.password)){
        throw new Error("Weak Password");
    }

    if(!validator.isAlphanumeric(data.username)){
        throw new Error("Invalid Username");
    }
    
}

module.exports = validate;