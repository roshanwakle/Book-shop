
 const validate = (values) => {
    let errors ={}
    if(!values.fullName){
        errors.fullName ="Invalid full name"
    }
    if(!values.phone){
        errors.phone ="Invalid phone no"
    }
    else if(values.password.length<10){
        errors.password ="password must be 10 charecters"
    }
    if(!values.email){
        errors.email ="Invalid email"
    }else if(/^[^\s@]+@com[^\s@]+\.[^\s@]{2,}$/i.test(values.email)){
        errors.email ="Invalid email"

    }
    if(!values.password){
        errors.password ="Invalid password"
    }else if(values.password.length<5){
        errors.password ="password must be 5 charecters"

    }
    return errors
    
}

export default validate