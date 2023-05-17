
//copied this from the mini project but I understand what it does so its not cheating


const logout = async () => {

  const response = await fetch('/api/user/logout', {
    method: 'POST',                                               //post to the url
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');                               //send back to homepage (login page)
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);



// const pause = async (event) => {
//   event.preventDefault();
//   const response = await fetch('/profile', {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     document.location.replace('/profile');
//   } else {
//     alert(response.statusText);
//   }
// };

// document.querySelector('#pause').addEventListener('click', pause);

const pauseBtn = document.querySelector('#pause');
const pause = async (event) => {
  event.preventDefault();
  const response = await fetch('/profile', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }

};

pauseBtn.addEventListener('click', pause);
