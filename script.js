var cards = Array.from(document.querySelectorAll('.card'));
cards.forEach((card) => {

    card.addEventListener( 'click', function(event) {

        // card.classList.remove('front');
        if (!card.classList.contains('incas_front')
            && !card.classList.contains('incas_back')) {
            card.classList.add('incas_front');
        } else if (card.classList.contains('incas_front')) {

            card.classList.remove('incas_front');
            card.classList.add('incas_back');
        } else if (card.classList.contains('incas_back')) {

            card.classList.remove('incas_back');
            card.classList.add('incas_front');
        }
    })});