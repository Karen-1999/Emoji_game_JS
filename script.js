var cards = Array.from(document.querySelectorAll('.card')).filter(function (item) {
    return !(item.classList.contains('no_item'));
});
var timebox = document.querySelector('.timer_box');

var button = document.querySelector('.button');
var timer = document.querySelector('.timer')
openedCards = [];
regBack = new RegExp('back_background');
regSuccess = new RegExp('success_pair');
regError = new RegExp('error_pair');
succesPairs = 0;
var gameStart = false;

sequence = ['1','2','3','4','5','6','7','8','9','10','11','12'];
emoji = ['🎅','🏇','🎅','🏇','🐙','🐵','🐙','🐵','🐞','🐸','🐞','🐸'];
uniques = ['🎅','🏇','🐙','🐵','🐞','🐸'];
var intervalId = 0;

button.addEventListener('click', (evt) => {
    //button.classList.remove('animate_button');
    gameStart = true;
    cards.forEach((item) => {
       item.classList.add('cursor');
    });
    if(!button.classList.contains('no_display'))
        button.classList.add('no_display');
    timer.classList.add('animate_timer');
    var count = 60;
        intervalId = setInterval(function () {
        if(count >= 0)
            --count;
        if(count >= 10)
            timebox.innerHTML = '00:' + count;
        else if(count >= 0)
            timebox.innerHTML = '00:0' + count;
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
                    openedCards.push(card);
                } else if (card.classList.contains('incas_front')) {
                    openedCards.pop();
                    card.classList.remove('incas_front');
                    card.classList.add('incas_back');
                } else if (card.classList.contains('incas_back')) {
                    openedCards.push(card);
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

changeColor = function(items) {
    contains = [];
    items.forEach((card) => {
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
            gameStart = false;
            clearInterval(intervalId);
        }
    }, 800);
};

shuffleCards = function(cardsArr) {
    cardsArr.sort(function () {
        return 0.5 - Math.random();
    })
};

launchTimer = function() {
    var count = 3;
    var timer = document.querySelector('.timer_box');
    setInterval(function () {
        if(count >= 0)
            --count;
        if(count >= 10)
            timer.innerHTML = '00:' + count;
        else if(count >= 0)
            timer.innerHTML = '00:0' + count;
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
        clearInterval(intervalId);
        gameStart = false;
        if(button.classList.contains("no_display"))
            button.classList.remove('no_display');
        // button.classList.add('animate_button');
    }
};

window.onload = function () {
    shuffleCards(emoji);
    backs = [];
    sequence.forEach((item) => {
        backs.push(document.getElementById(item));
    });
    i = 0;
    backs.forEach((back) => {
        back.innerHTML = emoji[i];
        ++i;
    })
};