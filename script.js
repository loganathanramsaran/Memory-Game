const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'];

let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function createCard(symbol, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-symbol', symbol);
    card.setAttribute('data-index', index);
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard(event) {
    const card = event.target;

    // If the card is already flipped or it's part of a matched pair, ignore it
    if (card.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    card.classList.add('flipped');
    card.textContent = card.getAttribute('data-symbol');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-symbol') === card2.getAttribute('data-symbol')) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === symbols.length) {
            setTimeout(() => alert('Congrats! You Won the Game!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function setupGame() {
    board.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    shuffle(symbols);
    symbols.forEach((symbol, index) => {
        const card = createCard(symbol, index);
        board.appendChild(card);
    });
}

resetButton.addEventListener('click', setupGame);

// Initialize game
setupGame();
