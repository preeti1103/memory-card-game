document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const movesDisplay = document.getElementById('moves');
    const matchesDisplay = document.getElementById('matches');
    const restartButton = document.getElementById('restart');

    // Card images (8 unique pairs)
    const cardImages = [
        'images/image1.jpeg',
        'images/image2.jpeg',
        'images/image3.jpeg',
        'images/image4.jpeg',
        'images/image5.jpeg',
        'images/image6.jpeg',
        'images/image7.jpeg',
        'images/image8.jpeg'
    ];

    // Card back image
    const cardBackImage = 'images/image9.jpeg';

    let cards = [...cardImages, ...cardImages];
    let flippedCards = [];
    let lockBoard = false;
    let moves = 0;
    let matches = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        shuffle(cards).forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = index;
            card.innerHTML = `
                <div class="front"><img src="${cardBackImage}" alt="Card Back"></div>
                <div class="back"><img src="${image}" alt="Card"></div>
            `;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });

        moves = 0;
        matches = 0;
        flippedCards = [];
        updateScore();
    }

    function flipCard() {
        if (lockBoard || this.classList.contains('flip') || flippedCards.length >= 2) return;

        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            updateScore();
            checkMatch();
        }
    }

    function checkMatch() {
        lockBoard = true;
        const [card1, card2] = flippedCards;
        const img1 = card1.querySelector('.back img').src;
        const img2 = card2.querySelector('.back img').src;

        if (img1 === img2) {
            // Add matched class after flip completes
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
            }, 600);

            matches++;
            updateScore();
            flippedCards = [];
            lockBoard = false;

            if (matches === cardImages.length) {
                setTimeout(() => {
                    alert(`Congratulations! You won in ${moves} moves!`);
                }, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }


    function updateScore() {
        movesDisplay.textContent = moves;
        matchesDisplay.textContent = matches;
    }

    restartButton.addEventListener('click', createBoard);

    // Initialize the game
    createBoard();
});