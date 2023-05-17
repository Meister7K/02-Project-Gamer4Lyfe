const playBtn = document.querySelector('#play');
const playGame = (event) => {
    event.preventDefault();
    return document.location.replace('/play');
}

playBtn.addEventListener('click', playGame);

// save function
