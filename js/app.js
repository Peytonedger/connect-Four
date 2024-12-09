const result = document.querySelector('h1');
let tries = 0;

const generateWinningCombines = () => {
    const winningCombines = [];
    const rows = 6; 
    const cols = 7; 

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            winningCombines.push([r * cols + c, r * cols + c + 1, r * cols + c + 2, r * cols + c + 3]);
        }
    }
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < cols; c++) {
            winningCombines.push([r * cols + c, (r + 1) * cols + c, (r + 2) * cols + c, (r + 3) * cols + c]);
        }
    }
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < cols - 3; c++) {
            winningCombines.push([r * cols + c, (r + 1) * cols + c + 1, (r + 2) * cols + c + 2, (r + 3) * cols + c + 3]);
        }
    }
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 3; c < cols; c++) {
            winningCombines.push([r * cols + c, (r + 1) * cols + c - 1, (r + 2) * cols + c - 2, (r + 3) * cols + c - 3]);
        }
    }

    return winningCombines;
};


let startgame = () => {
    tries = 0;
    document.querySelector('.table').innerHTML = ""; 
    for (let i = 1; i <= 42; i++) {
        let slot = document.createElement('div');
        slot.id = i - 1;
        slot.classList.add('emptySlots');
        slot.classList.add('occupied');
        document.querySelector('.table').appendChild(slot);
    }

    let slots = document.querySelectorAll('.emptySlots');
    let flip = false;
    let count = 1;

    let freeSlots = () => {
        for (let i = 1; i <= 7; i++) {
            slots[slots.length - count].classList.remove('occupied');
            count++;
        }
    };
    freeSlots();


    slots.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if (!flip) {
                e.target.classList.add('yellowdisk');
                e.target.classList.add('occupied');
                if (index >= 7) slots[index - 7].classList.remove('occupied'); 
                check();
                flip = !flip;
            } else {
                e.target.classList.add('reddisk');
                e.target.classList.add('occupied');
                if (index >= 7) slots[index - 7].classList.remove('occupied'); 
                check();
                flip = !flip;
            }
        });
    });
};

let check = () => {
    let winningCombines = generateWinningCombines();
    let slots = document.querySelectorAll('.emptySlots');
    tries++;

    winningCombines.forEach(pair => {
        let yellowwin = pair.every(item => slots[item].classList.contains('yellowdisk'));
        let redwin = pair.every(item => slots[item].classList.contains('reddisk'));

        if (yellowwin) {
            result.style.visibility = 'visible';
            result.classList.add('yellowwins');
            result.textContent = 'Yellow Player Won';
            setTimeout(() => {
                result.classList.remove('yellowwins');
                result.style.visibility = 'hidden';
                startgame();
            }, 3000);
            return;
        }

        if (redwin) {
            result.style.visibility = 'visible';
            result.classList.add('redwins');
            result.textContent = 'Red Player Won';
            setTimeout(() => {
                result.classList.remove('redwins');
                result.style.visibility = 'hidden';
                startgame();
            }, 3000);
            return;
        }

        if (tries === 42) {
            result.style.visibility = 'visible';
            result.classList.add('equality');
            result.textContent = 'Tie!';
            setTimeout(() => {
                result.classList.remove('equality');
                result.style.visibility = 'hidden';
                startgame();
            }, 3000);
        }
    });
};

startgame();

