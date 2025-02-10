var $70af9284e599e604$exports = {};
// import axios from 'axios';
////////////////////////////////////// main code without importing anything - working
// const login = async (email, password) => {
//   try {
//     const url = "http://127.0.0.1:3000/api/v1/users/login";
//     const res = await axios.post(url, { email, password });
//     console.log(res);
//     // Log the response to the console
//     if (res.data.status === "success") {
//       alert("Logged in successfully!");
//       window.setTimeout(() => {
//         location.assign("/");
//       }, 1500);
//     }
//   } catch (err) {
//     alert(err.response?.data?.message || err.message);
//   }
// };
// document.querySelector('.form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   console.log(email, password);
//   login(email, password);
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export const login = async (email, password) => {
//   try {
//     const url = 'http://127.0.0.1:3000/api/v1/users/login'
//     const res = await axios.post(url, { email, password });
//     // const res = await axios({
//     //   method: 'POST',
//     //   url: 'http://127.0.0.1:3000/api/v1/users/login',
//     //   data: {
//     //     email,
//     //     password,
//     //   },
//     // });
//     if (res.data.status === 'success') {
//       showAlert('success', 'Logged in successfully');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };


const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector('.form--login');
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // console.log('From the loginForm: ', email, password);
    (0, $70af9284e599e604$exports.login)(email, password);
});


//# sourceMappingURL=index.js.map
