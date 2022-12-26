const opitionOfColors = document.getElementsByClassName('color');
const randomColors = document.getElementsByClassName('random');
const colors = ['black', 'rgb(29, 183, 32)', 'rgb(224, 242, 213)', 'rgb(4, 68, 34)'];

const buttonRandom = document.getElementById('button-random-color');

let savedColors = ['black'];
const savedPixels = [];

const pixelBoard = document.getElementById('pixel-board');
const pixel = document.getElementsByClassName('pixel');

const initialColor = document.querySelector('.color');
const initialSelectedColor = document.getElementsByClassName('selected');

const clearBoard = document.getElementById('clear-board');

const boardSize = document.getElementById('board-size');
const btnVqv = document.getElementById('generate-board');

const inputArtName = document.getElementById('art-name');
const btnSaveArt = document.getElementById('save-art');
const ulSavedArts = document.getElementById('saved-arts');
const liSavedArts = document.getElementsByClassName('liArtName');
let savedFinishedArt = [];


const inputColor = document.getElementById('choose-color');
const chosenColors = document.getElementsByClassName('chosen');
const chosenArray = [];


// /\ global elements /\

const saveLocalStorageFinishedArt = (index) => {
  if (localStorage.getItem('finishedArts')) {
    savedFinishedArt = [];
    savedFinishedArt = JSON.parse(localStorage.getItem('finishedArts'));
  }
  const art = {
    title: liSavedArts[index].innerHTML,
    board: localStorage.getItem('pixelBoard'),
  }
  savedFinishedArt.push(art);
  localStorage.setItem('finishedArts', JSON.stringify(savedFinishedArt));
};

const liSaveFinishedArt = () => {
  btnSaveArt.addEventListener('click', () => {
    if (inputArtName.value === '') {
      window.alert('Adicione um Título para Conseguir Salvar!');
    } else {
      for (let index in liSavedArts) {
        if (liSavedArts[index].innerHTML === '') {
          liSavedArts[index].innerHTML = inputArtName.value;
          saveLocalStorageFinishedArt(index);
          inputArtName.value = '';
          break;
        }
      }
    };
  });
};

const restoreLiFinishedArt = () => {
  const titles = JSON.parse(localStorage.finishedArts);
  for (let index in titles) {
    liSavedArts[index].innerHTML = titles[index].title;
  }
};

const givePatternColorToPallete = (options) => {
  for (let index = 0; index < opitionOfColors.length; index += 1) {
    opitionOfColors[index].style.backgroundColor = options[index];
  }
};

const saveChosenColors = () => {
  localStorage.setItem('chosenColorPalette', JSON.stringify(chosenArray));
};

const chooseColors = () => {
  inputColor.addEventListener('change', () => {
    if (chosenArray.length < 4) {
      chosenArray.unshift(inputColor.value)
    } else {
      chosenArray.pop();
      chosenArray.unshift(inputColor.value);
    }
    for (let index = 0; index < chosenArray.length; index += 1) {
      chosenColors[index].style.backgroundColor = chosenArray[index];
    }
    saveChosenColors();
  });
};

const saveColors = () => {
  localStorage.setItem('colorPalette', JSON.stringify(savedColors));
};

const activeButtonRandom = () => {
  buttonRandom.addEventListener('click', () => {
    randomColors[0].style.backgroundColor = 'black';
    initialSelectedColor[0].classList.remove('selected');
    randomColors[0].classList.add('selected');
    for (let index = 1; index < randomColors.length; index += 1) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      savedColors.push(`rgb(${r}, ${g}, ${b})`);
      randomColors[index].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    saveColors();
    savedColors = ['black'];
  });
};

const restoreSavedColors = () => {
  const savedColor = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < savedColor.length; index += 1) {
    randomColors[index].style.backgroundColor = savedColor[index];
  }
  if (JSON.parse(localStorage.getItem('chosenColorPalette'))) {
    const chosenSavedColors = JSON.parse(localStorage.getItem('chosenColorPalette'));
    for (let index = 0; index < chosenSavedColors.length; index += 1) {
      chosenColors[index].style.backgroundColor = chosenSavedColors[index];
    }
  }
};

const savePaintedBoard = () => {
  for (let index = 0; index < pixel.length; index += 1) {
    savedPixels.push(pixel[index].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(savedPixels));
};

const paintPixel = () => {
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].addEventListener('click', () => {
      pixel[index].style.backgroundColor = initialSelectedColor[0].style.backgroundColor;
      savedPixels.length = 0;
      savePaintedBoard();
    });
  }
};

const createPixelsInBoard = (size) => {
  for (let line = 0; line < size; line += 1) {
    const divLine = document.createElement('div');
    divLine.classList.add('pixelFather');
    for (let column = 0; column < size; column += 1) {
      const divColumn = document.createElement('div');
      divColumn.classList.add('pixel');
      divColumn.classList.add('pixelChild');
      divColumn.style.width = `${(292 / size)}px`;
      divColumn.style.height = `${(292 / size)}px`;
      divColumn.style.backgroundColor = 'white';
      divLine.appendChild(divColumn);
    }
    pixelBoard.appendChild(divLine);
    paintPixel();
  }
};

const clearPixels = () => {
  clearBoard.addEventListener('click', () => {
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = 'white';
    }
    savedPixels.length = 0;
  });
};

const restoreSavedPaintedBoard = () => {
  createPixelsInBoard(Math.sqrt(JSON.parse(localStorage.getItem('pixelBoard')).length));
  for (let index = 0; index < pixel.length; index += 1) {
    const restoredBoard = JSON.parse(localStorage.getItem('pixelBoard'))[index];
    pixel[index].style.backgroundColor = restoredBoard;
    boardSize.placeholder = Math.sqrt(JSON.parse(localStorage.getItem('pixelBoard')).length);
  }
};

const clearPixelBoard = () => {
  for (let index = pixelBoard.children.length - 1; index >= 0; index -= 1) {
    pixelBoard.removeChild(pixelBoard.children[index]);
  }
};

const selectColor = () => {
  initialColor.classList.add('selected');
  for (let index = 0; index < opitionOfColors.length; index += 1) {
    opitionOfColors[index].addEventListener('click', () => {
      initialSelectedColor[0].classList.remove('selected');
      opitionOfColors[index].classList.add('selected');
    });
  }
};

const saveBoardLength = () => {
  localStorage.setItem('boardSize', pixelBoard.children.length);
};

const patternAction = () => {
  clearPixelBoard();
  localStorage.removeItem('pixelBoard');
  boardSize.placeholder = boardSize.value;
};

const createCustomPixelBoard = () => {
  btnVqv.addEventListener('click', () => {
    if (boardSize.value === '') {
      alert('Board inválido!');
    } else if (boardSize.value > 5 && boardSize.value <= 50) {
      patternAction();
      createPixelsInBoard(Number(boardSize.value));
      saveBoardLength();
    } else if (boardSize.value <= 5) {
      patternAction();
      createPixelsInBoard(5);
      saveBoardLength();
    } else {
      patternAction();
      createPixelsInBoard(50);
      saveBoardLength();
    }
  });
};

const createRulesToPixelsInBoard = () => {
  if (!localStorage.getItem('pixelBoard')) {
    createPixelsInBoard(5);
    boardSize.placeholder = 5;
  }
};

const restoreSavedBoardLength = () => {
  createPixelsInBoard(localStorage.getItem('boardSize'));
};

window.onload = () => {
  if (localStorage.getItem('colorPalette')) {
    restoreSavedColors();
  } else {
    givePatternColorToPallete(colors); // deixar em branco mesmo? decidir isso.
  }
  chooseColors();
  activeButtonRandom();
  if (localStorage.getItem('pixelBoard')) {
    restoreSavedPaintedBoard();
  } else if (localStorage.getItem('boardSize')) {
    clearPixelBoard();
    restoreSavedBoardLength();
  } else {
    createRulesToPixelsInBoard();
  }
  if (localStorage.getItem('finishedArts')) {
    restoreLiFinishedArt();
    liSaveFinishedArt();
  } else {
    liSaveFinishedArt();
  }
  createCustomPixelBoard();
  selectColor();
  paintPixel();
  clearPixels();
};
