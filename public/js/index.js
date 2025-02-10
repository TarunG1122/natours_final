import { login } from './login';

const loginForm = document.querySelector('.form--login');


if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // console.log('From the loginForm: ', email, password);
    login(email, password);
  });
}