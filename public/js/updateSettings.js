// const updateSettings = async (data, type) => {
//     try {
//       const url =
//         type === 'password'
//           ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
//           : 'http://127.0.0.1:3000/api/v1/users/updateMe';
  
//       const response = await fetch(url, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });
  
//       const resData = await response.json();
  
//       if (response.ok) {
//         alert(`${type.toUpperCase()} updated successfully!`);
//       } else {
//         alert(resData.message || 'Something went wrong!');
//       }
//     } catch (err) {
//       alert('An error occurred. Please try again.');
//     }
//   };
  

// const userDataForm = document.querySelector('.form-user-data');
// const userPasswordForm = document.querySelector('.form-user-password');

// if (userDataForm)
//   userDataForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('name', document.getElementById('name').value);
//     form.append('email', document.getElementById('email').value);
//     form.append('photo', document.getElementById('photo').files[0]);
//     console.log(form);

//     updateSettings(form, 'data');
//   });





// if (userPasswordForm)
//     userPasswordForm.addEventListener('submit', async e => {
//       e.preventDefault();
//       document.querySelector('.btn--save-password').textContent = 'Updating...';
  
//       const passwordCurrent = document.getElementById('password-current').value;
//       const password = document.getElementById('password').value;
//       const passwordConfirm = document.getElementById('password-confirm').value;
//       await updateSettings(
//         { passwordCurrent, password, passwordConfirm },
//         'password'
//       );
  
//       document.querySelector('.btn--save-password').textContent = 'Save password';
//       document.getElementById('password-current').value = '';
//       document.getElementById('password').value = '';
//       document.getElementById('password-confirm').value = '';
//     });




/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


const updateSettings = async (data, type) => {
  try {
      const url = type === 'password'
          ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
          : 'http://127.0.0.1:3000/api/v1/users/updateMe';

      const options = {
          method: 'PATCH',
          body: data
      };

      // Only set headers manually if sending JSON
      if (!(data instanceof FormData)) {
          options.headers = { 'Content-Type': 'application/json' };
          options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      const resData = await response.json();

      if (response.ok) {
          alert(`${type.toUpperCase()} updated successfully!`);
      } else {
          alert(resData.message || 'Something went wrong!');
      }
  } catch (err) {
      alert('An error occurred. Please try again.');
  }
};

// Handling User Data Update (Name, Email, Photo)
const userDataForm = document.querySelector('.form-user-data');
if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
      e.preventDefault();

      const form = new FormData();
      form.append('name', document.getElementById('name').value);
      form.append('email', document.getElementById('email').value);

      const photo = document.getElementById('photo').files[0];
      if (photo) form.append('photo', photo);

      updateSettings(form, 'data');
  });
}

// Handling Password Update
const userPasswordForm = document.querySelector('.form-user-password');
if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
      e.preventDefault();
      document.querySelector('.btn--save-password').textContent = 'Updating...';

      const passwordCurrent = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;

      await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

      document.querySelector('.btn--save-password').textContent = 'Save password';
      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';
  });
}
