const playBtn = document.querySelector('#play');
const playGame = (event) => {
    event.preventDefault();
    return document.location.replace('/play');
}

playBtn.addEventListener('click', playGame);

// save function
const saveBtn = document.querySelector('#save');
const saveGame = (event) => {
    event.preventDefault();
    // not sure what else goes here just yet
}

saveBtn.addEventListener('click', saveGame);
