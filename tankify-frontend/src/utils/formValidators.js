// Form Validators Utilities


// Dependencies 


// Components and Necessary Files 


// Form Validators Functionality


// Create User Form Validators 
export const validateCreateUserForm = ( form ) => { 
    
    const errors = [];

    if( !form.username.trim() ){ 
        errors.push( 'Please enter a username' );
    }
    if( form.password.length < 8 || !/\d/.test( form.password ) ){ 
        errors.push( 'Password must be at least 8 characters and include a number' );
    }
    if( form.password !== form.confirmPassword ){ 
        errors.push( 'Passwords do not match' );
    }
    if( !form.email.trim() ){ 
        errors.push( 'Please enter an email address' );
    }
    else if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ){ 
        errors.push( 'Please enter a valid email address' );
    }

    return errors; 
}