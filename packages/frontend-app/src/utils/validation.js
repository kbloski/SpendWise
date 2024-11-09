export function validUsername(username) {
    let  error = null

    if (username < 3) {
        error = "Min username length is 3 characters.";
    }
    return error
}

export function validPassword(password) {
    let  error = null

    if (password < 3) {
      error = "Min password length is 3 characters.";
    }

    return error;
}

export function validEmail( email ){
    let error = null;

    if (email.length < 3) {
        error = "Min email length is 3 characters.";
    }
    else if (!email.includes('@')){
        error = "Email must include @."
    }
    return error;
}