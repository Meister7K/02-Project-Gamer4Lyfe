
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