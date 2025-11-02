document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formStatus = document.getElementById('formStatus');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    resetErrorMessages();
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    let isValid = true;
    let firstErrorElement = null;

    if (name === '') {
        displayError('nameError', 'Họ tên không được rỗng.');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('name');
    } else if (name.split(/\s+/).length < 2) {
        displayError('nameError', 'Họ tên phải có ít nhất 2 từ.');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('name');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        displayError('emailError', 'Email không được rỗng.');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('email');
    } else if (!emailRegex.test(email)) {
        displayError('emailError', 'Email không đúng định dạng.');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('email');
    }

    if (message === '') {
        displayError('messageError', 'Nội dung không được rỗng.');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('message');
    } else if (message.length < 10) {
        displayError('messageError', 'Nội dung phải có ít nhất 10 ký tự.');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('message');
    }

    if (isValid) {
        formStatus.textContent = 'Cảm ơn bạn đã liên hệ!';
        formStatus.classList.add('success');

        setTimeout(() => {
            document.getElementById('contactForm').reset();
            formStatus.textContent = '';
            formStatus.classList.remove('success');
        }, 1000);

    } else {
        if (firstErrorElement) {
            formStatus.textContent = 'Vui lòng kiểm tra lại các trường lỗi màu đỏ.';
            formStatus.classList.add('error');
            firstErrorElement.focus();
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function resetErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');
}