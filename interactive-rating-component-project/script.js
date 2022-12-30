const rateContainer = document.getElementById('rate-container');
const rateNumbers = document.getElementsByClassName('rate-number');

const mouseoverItem = document.getElementsByClassName('mouseover');
const selectedNumber = document.getElementsByClassName('selected');

const submitButton = document.getElementById('submit-button');

const mainWindow = document.getElementById('main-window');
const thanksWindow = document.getElementById('thanks-window');
const thanksWindowHide = document.getElementsByClassName('hide-window');

const dinamicText = document.getElementById('change-text');

// /\ GLOBAL ELEMENTS /\ \\

const changeColorRatingNumbers = () => {
    for (let index = 0; index < rateNumbers.length; index += 1) {
        rateNumbers[index].addEventListener('mouseover', () => {
            rateNumbers[index].classList.add('mouseoverNumbers');
            rateNumbers[index].addEventListener('mouseout', () => {
                rateNumbers[index].classList.remove('mouseoverNumbers')
            });
        });
    }
};

const changeColorSubmitButton = () => {
    submitButton.addEventListener('mouseover', () => {
        submitButton.classList.remove('mouseoutSubmit');
        submitButton.classList.add('mouseoverSubmit');
        submitButton.addEventListener('mouseout', () => {
            submitButton.classList.remove('mouseoverSubmit');
            submitButton.classList.add('mouseoutSubmit');
        });
    });
};

const changeColorSelectedRatingNumber = () => {
    for (let index = 0; index < rateNumbers.length; index += 1) {
        rateNumbers[index].addEventListener('click', () => {
            if (selectedNumber.length > 0) {
                selectedNumber[0].classList.remove('selected');
                rateNumbers[index].classList.add('selected');
            } else {
                rateNumbers[index].classList.add('selected');
            }
        });
    }
};

const submitRate = () => {
    submitButton.addEventListener('click', () => {
        if (selectedNumber.length > 0) {
            thanksWindowHide[0].classList.remove('hide-window');
            mainWindow.classList.add('hide-window');
            dinamicText.innerHTML = `You selected ${selectedNumber[0].innerText} out of 5`
        }
    });
};

window.onload = () => {
    changeColorRatingNumbers();
    changeColorSubmitButton();
    changeColorSelectedRatingNumber();
    submitRate();
};
