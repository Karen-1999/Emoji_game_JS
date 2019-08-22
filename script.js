var cards = Array.from(document.querySelectorAll('.card')).filter(function (item) {
    return !(item.classList.contains('no_item'));
});
var timebox = document.querySelector('.timer_box');
var button = document.querySelector('.button');
var timer = document.querySelector('.timer')

regBack = new RegExp('back_background');
regSuccess = new RegExp('success_pair');
regError = new RegExp('error_pair');

var openedCards = [];
var succesPairs = 0;
var gameStart = false;
var intervalId = 0;

sequence = ['1','2','3','4','5','6','7','8','9','10','11','12'];
emoji = ['🦔','🐶','🦔','🐶','🐙','🐵','🐙','🐵','🐼','🐸','🐼','🐸'];
uniques = ['🦔','🐶','🐙','🐵','🐼','🐸'];


window.onload = function () {
    generateNewGame();
};

shuffleCards = function(cardsArr) {
    cardsArr.sort(function () {
        return 0.5 - Math.random();
    })
};

generateNewGame = function() {
    shuffleCards(emoji);
    backs = [];
    sequence.forEach((item) => {
        backs.push(document.getElementById(item));
    });
    i = 0;
    backs.forEach((back) => {
        back.innerHTML = emoji[i];
        ++i;
    });
};

enableCardsCursor = function()  {
    cards.forEach((item) => {
        item.classList.add('cursor');
    });
};

disableCardsCursor = function() {
    cards.forEach((item) => {
        item.classList.remove('cursor');
    });
};

gameEnd = function() {
    cards.forEach(function (card) {
        if (card.classList.contains('incas_front')) {
            openedCards.pop();
            card.classList.remove('success_pair');
            card.classList.remove('error_pair');
            card.classList.remove('incas_front');
            card.classList.add('incas_back');
            card.innerHTML = card.innerHTML.replace(regSuccess, 'back_background');
            card.style.pointerEvents = 'visiblePainted';
            succesPairs = 0;
        }
    });
    disableCardsCursor();
};

changeColor = function(items) {
    contains = [];
    items.forEach((card) => {
        card.style.pointerEvents = 'visiblePainted';
        for(elem in uniques)
        {
            if(card.innerHTML.search(uniques[elem]) !== -1) //!== -1)
                contains.push(uniques[elem]);
        }
    });
    if(contains[0] === contains[1])
    {
        items.forEach((card) => {
            card.innerHTML = card.innerHTML.replace(regBack, 'success_pair');
            card.style.pointerEvents = 'none';
        });

        ++succesPairs;
    }
    else {
        items.forEach((card) => {
            card.innerHTML = card.innerHTML.replace(regBack, 'error_pair');
            setTimeout(() => {
                card.innerHTML = card.innerHTML.replace(regError, 'back_background');
            }, 1000);
            setTimeout(() => {
                card.classList.remove('incas_front');
                card.classList.add('incas_back');
            }, 500);
        });
    }
    setTimeout(() => {
        openedCards = [];
        if(succesPairs === 6) {
            alert('Congratulations! You win!');
            resetTimerButton();
        }
    }, 800);
};

resetTimerButton = function() {
    gameStart = false;
    timebox.innerHTML = '&nbsp;01:00&nbsp;';
    timer.classList.remove('animate_timer');
    if(button.classList.contains("no_display"))
        button.classList.remove('no_display');
    clearInterval(intervalId);
    gameEnd();
};

launchTimer = function() {
    var count = 3;
    var timer = document.querySelector('.timer_box');
    setInterval(function () {
        if(count >= 0)
            --count;
        if(count >= 10)
            timer.innerHTML = '&nbsp;00:' + count + '&nbsp;';
        else if(count >= 0)
            timer.innerHTML = '&nbsp;00:0' + count  + '&nbsp;';
        if(count === -1) {
            launchResultHandler();
        }
    }, 1000)
};

launchResultHandler = function()
{
    if(succesPairs < 6)
    {
        alert("Sorry guys, try again!");
        resetTimerButton();
    }
};

/*-------events handling-------*/
button.addEventListener('click', (evt) => {
    generateNewGame();
    gameStart = true;
    enableCardsCursor();
    if(!button.classList.contains('no_display'))
        button.classList.add('no_display');
    timer.classList.add('animate_timer');
    var count = 60;
        intervalId = setInterval(function () {
        if(count >= 0)
            --count;
        if(count >= 10)
            timebox.innerHTML = '&nbsp;00:' + count + '&nbsp;';
        else if(count >= 0)
            timebox.innerHTML = '&nbsp;00:0' + count + '&nbsp;';
        if(count === -1) {
            launchResultHandler();
        }
    }, 1000)
});

cards.forEach((card) => {
    card.addEventListener( 'click', function(event) {
        if(gameStart === true)
        {
            if(openedCards.length < 2) {
                if (!card.classList.contains('incas_front')
                    && !card.classList.contains('incas_back')) {
                    card.classList.add('incas_front');
                    card.style.pointerEvents = 'none';
                    openedCards.push(card);
                } else if (card.classList.contains('incas_front')) {
                    openedCards.pop();
                    card.classList.remove('incas_front');
                    card.classList.add('incas_back');
                } else if (card.classList.contains('incas_back')) {
                    openedCards.push(card);
                    card.style.pointerEvents = 'none';
                    card.classList.remove('incas_back');
                    card.classList.add('incas_front');
                }
                if (openedCards.length === 2) {
                    setTimeout(() => {
                        changeColor(openedCards);
                    }, 1000);
                }

            }
        }
    });
});