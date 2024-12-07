const result = document.querySelector('h1');
let tries = 0;

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
    let flip = false
    let count = 1;
    let freeSlots = () => {
        for (let i = 1; i <= 7; i++) {
            slots[slots.length - count].classList.remove('occupied');
            count++;
        }
    };
    freeSlots()

    slots.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if (!flip) {
                e.target.classList.add('yellowdisk');
                e.target.classList.add('occupied');
                slots[index-7].classList.remove('occupied');
                check()
                flip = !flip;
            }
            else {
                e.target.classList.add('reddisk');
                e.target.classList.add('occupied');
                slots[index-7].classList.remove('occupied');
                check()
                flip = !flip;
            }
        });
    });
};

let check = () => {
    let winningCombines = [
        [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
    ];

    let slots = document.querySelectorAll('.emptySlots');
    tries++ ;
    winningCombines.forEach(pair => {
        let yellowwin = pair.every(item => slots[item],classList.contains('yellowdisk'));
        let redwin = pair.every(item => slots[item],classList.contains('reddisk'));
        if (yellowwin) {
            result.classList.add('yellowwins');
            result.textContent = 'Yellow Player Won';
            setTimeout(() => {
            result.classList.remove('yellowwins');
            startgame();
            },3000);
            return;
        }
        if (redwin) {
            result.classList.add('redwins');
            result.textContent = 'Red Player Won';
            setTimeout(() => {
            result.classList.remove('redwins');
            startgame();
            },3000)
            return;
        }
        if (tries === 42) {
            result.classList.add('equality');
            result.textContent = 'Tie!';
            setTimeout(() => {
            result.classList.remove('equality');
            startgame();
            }, 3000);
        }
    });
};

startgame();