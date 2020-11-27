(function () {
    'use strict';

    const categories = [];
    const school = ['RECESS', 'TEACHER', 'CLASSROOM', 'WHITEBOARD', 'DESK', 'PENCIL', 'PRINCIPAL'];
    const food = ['PIZZA', 'SOUP', 'CHOLENT', 'ICE CREAM', 'POTATO CHIPS', 'PICKLES'];
    const animal = ['LION', 'HIPPOPOTOMAS', 'DOG', 'SHEEP', 'EAGLE', 'LEAPORD', 'GIRAFFE', 'BOA CONSTRICTOR'];
    const toys = ['PLAYMOBIL', 'MAGNATILES', 'LEGO', 'PUZZLES', 'PLAY DOUGH', 'PLAYSTIX', 'MONOPOLY', 'MR POTATO HEAD'];
    const travel = ['AIRPLANE', 'AIRPORT', 'AUTOMOBILE', 'TRAFFIC', 'SUITCASE', 'VACATION', 'HOTEL', 'CRUISE SHIP', 'JOURNEY'];
    school.icon = 'media/school.png';
    food.icon = 'media/food.png';
    animal.icon = 'media/animal.png';
    toys.icon = 'media/toys.png';
    travel.icon = 'media/airplane.png';
    categories.push(food, school, animal, toys, travel);
    const fx = [drawCircle, drawEye1, drawEye2, drawMouth, drawBody, drawFoot1, drawFoot2, drawHand1, drawHand2];

    let startAngle = 0;
    let startMouthAngle = 6.2;
    let fxIndex = 0;
    // let wordlength = 0;



    function addABC() {
        $(document.body).append(` <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>I</li>
        <li>J</li>
        <li>K</li>
        <li>L</li>
        <li>M</li>
        <li>N</li>
        <li>O</li>
        <li>P</li>
        <li>Q</li>
        <li>R</li>
        <li>S</li>
        <li>T</li>
        <li>U</li>
        <li>V</li>
        <li>W</li>
        <li>X</li>
        <li>Y</li>
        <li>Z</li>
    </ul>
`);
    }

    function drawGallows() {
        $(document.body).append('<canvas id="theCanvas"></canvas>');
        const canvas = document.getElementById('theCanvas');
        const context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(200, 150);
        context.lineTo(250, 150);
        context.stroke();
        context.beginPath();
        context.moveTo(225, 150);
        context.lineTo(225, 25);
        context.stroke();
        context.lineTo(175, 25);
        context.stroke();
        context.lineTo(175, 35);
        context.stroke();
        return context;
    }


    function getRandomWord() {
        let randomCategory = Math.floor(Math.random() * categories.length);
        let randomWord = Math.floor(Math.random() * categories[randomCategory].length);
        // return categories[randomCategory][randomWord];
        return {
            categoryIndex: randomCategory,
            wordIndex: randomWord,
            word: categories[randomCategory][randomWord],
            category: categories[randomCategory]
        };
    }

    function drawCircle(context) {
        let interval = setInterval(() => {
            context.moveTo(189, 50);
            startAngle += 0.1;
            context.arc(175, 50, 15, 0, startAngle);

            context.stroke();
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
        }, 4000);
    }

    function drawEye1(context) {
        context.beginPath();
        context.arc(170, 50, 1, 0, 2 * Math.PI);
        context.stroke();
    }

    function drawEye2(context) {
        context.beginPath();
        context.arc(180, 50, 1, 0, 2 * Math.PI);
        context.stroke();
    }

    function drawMouth(context) {
        let interval = setInterval(() => {
            context.beginPath();
            startMouthAngle -= 0.1;
            context.arc(175, 60, 5, 0, startMouthAngle, true);
            context.stroke();
            if (startMouthAngle < 3.2) {
                clearInterval(interval);
            }
        }, 50);
    }

    function drawBody(context) {
        let y = 65;
        let interval = setInterval(() => {
            y++;
            context.moveTo(175, 65);
            context.lineTo(175, y);
            context.stroke();
            if (y > 110) {
                clearInterval(interval);
            }
        }, 50);
    }

    function drawFoot1(context) {
        let x = 175;
        let y = 110;
        let interval = setInterval(() => {
            context.lineTo(--x, ++y);
            context.stroke();
            if (y > 130) {
                clearInterval(interval);
            }
        }, 100);
    }

    function drawFoot2(context) {
        context.moveTo(175, 110);
        let x = 175;
        let y = 110;
        let interval = setInterval(() => {
            context.lineTo(++x, ++y);
            context.stroke();
            if (x > 195) {
                clearInterval(interval);
            }
        }, 100);
    }

    function drawHand1(context) {
        context.moveTo(175, 90);
        let x = 175;
        let y = 90;
        let interval = setInterval(() => {
            context.lineTo(--x, --y);
            context.stroke();
            if (x < 155) {
                clearInterval(interval);
            }
        }, 100);
    }

    function drawHand2(context) {
        context.moveTo(175, 90);
        let x = 175;
        let y = 90;
        let interval = setInterval(() => {
            context.lineTo(++x, --y);
            context.stroke();
            if (x > 195) {
                clearInterval(interval);
            }
        }, 100);
    }

    function playAgain() {
        $(document.body).append(
            `<div id="replay">GAME OVER
        <div>
            <button>Play Again</button>
            <button>Exit</button>
        </div>
            </div>`
        );

        $('button').click(evt => {
            $(evt.target).text() === 'Play Again' ? location.reload() : window.close(); //jshint ignore:line
        });
    }

    function playGame() {
        $(document.body).append('<header><img alt="an image"></header>');
        $(document.body).append('<audio></audio>');
        let theContext = drawGallows();
        addABC();

        const theWordObject = getRandomWord();
        const theWord = theWordObject.word;
        const theTrimmedWord = theWord.replace(/ /g, ""); console.log(theTrimmedWord);
        $('img').prop('src', theWordObject.category.icon);

        for (let char of theWord) {
            if (char !== ' ') {
                $(document.body).append(`<div class="input"><span>${char}</span></div>`);
                $('span').hide();
            } else {
                $(document.body).append(`<div class="input" id="space"></div>`);
            }

        }

        $('li').click(evt => {
            $(evt.target).css({ 'pointer-events': 'none', 'background-color': 'gray' });
            if (theWord.includes($(evt.target).text())) {
                $(`span:contains(${$(evt.target).text()})`).fadeIn(2500);
                $('audio').prop('src', 'media/zapsplat_correct.mp3')[0].play();

                if ($('span:visible').length === theTrimmedWord.length) {
                    categories[theWordObject.categoryIndex].splice(theWordObject.wordIndex, 1);
                    console.log(categories[theWordObject.categoryIndex]);
                    if (categories[theWordObject.categoryIndex].length === 0) {
                        categories.splice(theWordObject.categoryIndex, 1);
                    }

                    setTimeout(() => {
                        setTimeout(() => {
                            playGame();
                        }, 500);
                        $(document.body).empty();
                    }, 1500);

                }
            } else {
                $('audio').prop('src', 'media/zapsplat_incorrect.mp3')[0].play();
                fx[fxIndex++](theContext);

                if (fxIndex === fx.length) {
                    $('li').css({ 'pointer-events': 'none', 'background-color': 'gray' });
                    setTimeout(() => {
                        playAgain();
                    }, 2000);
                }
            }

        });
    }

    playGame();

}());