let validateInput = (event) => {
    let inputElement = event.target;
    // let errorElement = inputElement.nextElementSibling;

    // console.log(errorElement.tagName);


    if (inputElement.value.length !== 0 && inputElement.value.length < 6) {
        inputElement.style.backgroundColor = '#ffebd9';
        // errorElement.innerText = "password too week"
    } else {
        // errorElement.innerText = ""
        inputElement.style.backgroundColor = 'transparent';
    }
}

let toggleInput = (elementId) => {
    let inputElement = document.getElementById(elementId, event);
    let button = event.target.tagName == 'BUTTON' ? event.target : event.target.parentElement;

    if (inputElement.getAttribute('type') === 'password') {
        inputElement.setAttribute('type', 'text');
        button.innerHTML = '<i class="far fa-eye-slash"></i>';
    } else {
        inputElement.setAttribute('type', 'password');
        button.innerHTML = '<i class="far fa-eye"></i>';
    }
}

/**
 * REGISTRATION SCRIPTS HANDLING DATA STORAGE
 */

let myForm = document.forms['registerForm'];
myForm && myForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = myForm['name'].value;
    let email = myForm['email'].value;
    let password = myForm['password'].value;
    let confirm_password = myForm['password-confirmation'].value;

    if (password !== confirm_password) {
        alert('passwords do not match');
        return; // return to prevent further execution
    }

    // Split the name into first name and last name
    let names = name.split(' ');
    let firstName = names[0];
    let lastName = names[1] || '';

    let user = {
        firstname: firstName, // I can do it like this or just call the variable itself, provided I intend to maintain the same name
        lastname: lastName,
        email,
        password : password.trim() //: atob(password)
    }

    if (userExists(user.email)) {
        alert('user already exists');
        return;
    }

    saveUser(user);

    alert('user registered successfully! Proceed to login');
    window.location.href = './login.html';
    // myForm.reset();
})


/** 
 * 
 * LOGIN SCRIPTS
*/
let myLoginForm = document.forms['loginForm'];
myLoginForm && myLoginForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    let email = myLoginForm['email'].value;
    let password = myLoginForm['password'].value;    

    if (validateLogin(email, password.trim())) {
        let user = getUserByEmail(email);
        saveActiveUser(user);
        localStorage.setItem('is_login', 'true');
        window.location.href = '../index.html';
    } else {
        alert('Invalid username and password.');
    }
})



/**
 *  
 * USER MANAGEMENT METHODS
 * JSON : JavaScript Object Notation (JavaScript Objects/Arrays Converted and Stored in a String Format)
 * 
 */

let saveUser = (userData) => {
    // First Step: Get all the users from local storage
    let users = localStorage.getItem('users');

    // Second Step: Convert the string into an array
    let usersArray = JSON.parse(users) || [];

    // OPTIONAL: Add A Unique ID To New User
    userData.id = usersArray.length + 1;

    // Third Step: Add the new user to the array
    usersArray.push(userData);

    // Fourth Step: Convert the array back to a string and store it in local storage
    localStorage.setItem('users', JSON.stringify(usersArray));
}

let userExists = (email) => {
    let isExist = false;

    let users = localStorage.getItem('users');
    let usersArray = JSON.parse(users) || [];

    // Loop through all users. For each user, check if the email matches
    usersArray.forEach((user, i) => { // for each user in the usersArray. i is the index
        if (user.email === email) {
            isExist = true;
        }
    })

    // for (let i = 0; i < usersArray.length; i++) {
    //     if (usersArray[i].email === email) {
    //         isExist = true;
    //         break;
    //     }
    // }

    return isExist;
}

let validateLogin = (email, password) => {
    let users = localStorage.getItem('users');
    let usersArray = JSON.parse(users) || [];

    if (usersArray.length === 0) {
        return false;
    }

    let requestedUser = null
    
    // Loop through all users. For each user, check if the email matches
    usersArray.forEach((user, i) => { // for each user in the usersArray. i is the index
        if (user.email === email) {
            if (user.password == password) {
                requestedUser = user;
                return true;
            }
        }
    })

    if (requestedUser) {
        return true;
    }

    return false;
}

let getUserByEmail = (email) => {
    let users = localStorage.getItem('users');
    let usersArray = JSON.parse(users) || [];

    let requestedUser = null

    if (usersArray.length === 0) {
        return null;
    }
    // Loop through all users. For each user, check if the email matches
    usersArray.forEach((user, i) => { // for each user in the usersArray. i is the index
        if (user.email === email) {
            requestedUser = user;
        }
    })

    if (requestedUser) {
        return requestedUser;
    }

    return null;
}

let getUserById = (id) => {
    let users = localStorage.getItem('users');
    let usersArray = JSON.parse(users) || [];

    if (usersArray.length === 0) {
        return null;
    }

    let requestedUser = null
    // Loop through all users. For each user, check if the email matches
    usersArray.forEach((user, i) => { // for each user in the usersArray. i is the index
        if (user.id === id) {
            requestedUser = user;
        }
    })

    if (requestedUser) {
        return requestedUser;
    }

    return null;
}

let getUsersList = () => {
    let users = localStorage.getItem('users');
    let usersArray = JSON.parse(users) || [];

    return usersArray;
}

/**
 * SESSION MANAGEMENT SCRIPTS
 */

let saveActiveUser = (user) => {
    if (user) {
        localStorage.setItem('activeUser', JSON.stringify(user));
    }
}

let getActiveUser = () => {
    let user = localStorage.getItem('activeUser');
    return JSON.parse(user);
}

let logoutUser = () => {
    localStorage.removeItem('activeUser');
    localStorage.removeItem('is_login')
}
