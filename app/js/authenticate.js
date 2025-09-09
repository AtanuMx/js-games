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