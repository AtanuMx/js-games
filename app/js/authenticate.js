let validateInput = (event) => {
    let inputElement = event.target;
    let errorElement = inputElement.nextElementSibling;

    if (inputElement.value.length !== 0 && inputElement.value.length < 6) {
        inputElement.style.backgroundColor = 'red';
        errorElement.innerText = "password too week"
    } else {
        errorElement.innerText = ""
        inputElement.style.backgroundColor = 'transparent';
    }
}