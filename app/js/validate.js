
let isLogin = Boolean(localStorage.getItem('is_login'))

if (isLogin === false) {
    window.location.href = './auth/login.html'
}


