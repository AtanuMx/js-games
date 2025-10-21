let getActiveUser = () => {
    let user = localStorage.getItem('activeUser');
    return JSON.parse(user);
}

// Logout
let logoutUser = () => {
    localStorage.removeItem('activeUser');
    localStorage.removeItem('is_login');
    location.reload();
    // window.location.href = './auth/login.html';
}

// Validate if user is logged in
let isLogin = Boolean(localStorage.getItem('is_login'))

if (isLogin === false) {
    window.location.href = './auth/login.html';
}

let activeUser = getActiveUser();
console.log("Active user", activeUser);


