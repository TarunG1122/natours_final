
//   };


// import axios from 'axios';

// const logout = async () => {
//     try {
//         const url = "http://127.0.0.1:3000/api/v1/users/logout";
//         const res = await axios.get(url);

//         if (res.data.status === "success") {
//             location.reload(true);
//         }
//     } catch (err) {
//         console.log(err);
//         alert("Error logging out! Try again.");
//     }
// };


// document.querySelector('.nav__el--logout').addEventListener('click', (e) => {
//     e.preventDefault();
//     logout();
// });
  
///////////////////////////////////////////////////////////////////////////////////////


const logout = async () => {
    try {
        const url = "/api/v1/users/logout";
        const res = await fetch(url, {
            method: 'GET', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Adjust headers as needed
            },
        });

        const data = await res.json();

        if (res.ok && data.status === "success") {
            location.reload(true);
        } else {
            throw new Error("Failed to log out.");
        }
    } catch (err) {
        console.log(err);
        alert("Error logging out! Try again.");
    }
};

document.querySelector('.nav__el--logout').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});
