var $70af9284e599e604$exports = {};
// import axios from 'axios';
////////////////////////////////////// main code without importing anything - working
const $70af9284e599e604$var$login = async (email, password)=>{
    try {
        const url = "/api/v1/users/login";
        const res = await axios.post(url, {
            email: email,
            password: password
        });
        console.log(res);
        // Log the response to the console
        if (res.data.status === "success") {
            alert("Logged in successfully!", "Logged in successfully!");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        alert('Wrong Password or email', err.response?.data?.message || err.message);
    }
};
document.querySelector('.form--login').addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password);
    $70af9284e599e604$var$login(email, password);
}); /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // /// logout button 
 // const logout = async () => {
 //   try {
 //     const url = "http://127.0.0.1:3000/api/v1/users/logout";
 //     const res = await fetch(url, {
 //       method: 'GET',
 //       credentials: 'same-origin'
 //     });
 //     const data = await res.json();
 //     console.log(data);
 //     if (data.status === "success") location.reload(true);
 //   } catch (err) {
 //     alert("Error logging out! Try again.");
 //   }
 // };
 // // Wait for the DOM to fully load before adding the event listener
 // document.addEventListener('DOMContentLoaded', () => {
 //   const logoutButton = document.querySelector('a.nav__el.nav__el--logout');
 //   if (logoutButton) {
 //     console.log('Logout button found');
 //     logoutButton.addEventListener('click', logout);
 //   } else {
 //     console.log('Logout button not found');
 //   }
 // });


const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector('.form--login');
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // console.log('From the loginForm: ', email, password);
    (0, $70af9284e599e604$exports.login)(email, password);
});


//# sourceMappingURL=index.js.map
