let money = 10; //la tune du dépare pas encore fini se systéme il est trop brocken
let squareCost = 2;
let squares = [];
let squareID = 0;

document.getElementById('buy-square').addEventListener('click', buySquare);

function buySquare() {
    if (money >= squareCost) {
        money -= squareCost;
        squareID++;
        const newSquare = createSquare(squareID);
        document.getElementById('squares').appendChild(newSquare.element);
        squares.push(newSquare);
        updateStats();
    }
}

function createSquare(id) {
    const element = document.createElement('div');
    element.classList.add('square', 'level-1');
    element.textContent = '1';
    
    const square = {
        id: id,
        level: 1,
        element: element,
        timer: setInterval(() => produceMoney(square), 1000),
        startTime: Date.now()
    };
    
    element.addEventListener('click', () => upgradeSquare(square));
    return square;
}

function produceMoney(square) {
    money += square.level;
    updateStats();
}

function upgradeSquare(square) {
    if (square.level < 4) { 
        let upgradeCost = squareCost * Math.pow(2, square.level);
        if (money >= upgradeCost) {
            money -= upgradeCost;
            square.level++;
            square.element.classList.replace(`level-${square.level - 1}`, `level-${square.level}`);
            square.element.textContent = `${square.level}`;
            square.element.style.transition = 'background-color 0.3s ease';
            updateStats();
        }
    }
}

function updateStats() {
    document.getElementById('money').textContent = money.toFixed(2);
    document.getElementById('cost').textContent = squareCost;
}
setInterval(() => {
    squares.forEach((square, index) => {
        if (Date.now() - square.startTime > (Math.random() * 20000 + 30000)) {
            clearInterval(square.timer);
            document.getElementById('squares').removeChild(square.element);
            squares.splice(index, 1);
        }
    });
}, 1000);

setInterval(() => {
    money += 2; //les dolors fréreee
    updateStats();
}, 30000);


updateStats();
