'use strict'

let userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, (response) => {
        console.log(response);
        
        let result = response;
        
        if (result.success === true) {
            location.reload();
        }
        
        if (result.success === false) {
            userForm.setLoginErrorMessage(result.error);
        }
    });
}   

userForm.loginErrorMessageBox;

userForm.registerFormCallback = data => {
    ApiConnector.register(data, (response) => {
        console.log(response);

        let result = response;
        
        if (result.success === true) {
            location.reload();
        }
        
        if (result.success === false) {
            userForm.setRegisterErrorMessage(result.error);
        }
    });
}
