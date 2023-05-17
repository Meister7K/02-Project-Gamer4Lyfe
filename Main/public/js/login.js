const loginForm=document.querySelector('#loginForm');
const signupForm=document.querySelector('#signupForm');

const sendLogin = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#userEmail').value.trim();
    const password = document.querySelector('#userPass').value.trim();
    
    if (email && password) {
    
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
    else
        alert("Please enter both an email and a password...")
  };




  const sendSignup = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#pass').value.trim();
    const conPassword = document.querySelector('#conPass').value.trim();

    const match=(password && (password===conPassword));
  
    if (username && email && match) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
    else
        alert("Ensure you've entered a Username, an Email, and matching Passwords...")
  };




loginForm.addEventListener('submit',sendLogin);
signupForm.addEventListener('submit',sendSignup )
  