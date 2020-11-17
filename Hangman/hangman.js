(function () {
    'use strict';

    const categories = [];
    const school = ['RECESS', 'TEACHER', 'CLASSROOM', 'WHITEBOARD', 'DESK', 'PENCIL'];
    const food = ['PIZZA', 'SOUP', 'CHOLENT', 'ICE CREAM', 'POTATO CHIPS', 'PICKLES'];
    const animal = ['LION', 'HIPPOPOTOMAS', 'DOG', 'SHEEP', 'EAGLE', 'LEAPORD'];
    school.icon = 'media/school.png';
    food.icon = 'media/food.png';
    animal.icon = 'media/animal.png';
    categories.push(food, school, animal);
    const fx = [drawCircle, drawEye1, drawEye2, drawMouth, drawBody, drawFoot1, drawFoot2, drawHand1, drawHand2];
    const playAgain = $('#replay');
    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');
    let startAngle = 0;
    let startMouthAngle = 6.2;
    let fxIndex = 0;

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

    function getRandomWord() {
        let randomCategory = Math.floor(Math.random() * categories.length);
        let randomWord = Math.floor(Math.random() * categories[randomCategory].length);
        // return categories[randomCategory][randomWord];
        return {
            word: categories[randomCategory][randomWord],
            category: categories[randomCategory]
        };
    }

    function drawCircle() {
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

    function drawEye1() {
        context.beginPath();
        context.arc(170, 50, 1, 0, 2 * Math.PI);
        context.stroke();
    }

    function drawEye2() {
        context.beginPath();
        context.arc(180, 50, 1, 0, 2 * Math.PI);
        context.stroke();
    }

    function drawMouth() {
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

    function drawBody() {
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

    function drawFoot1() {
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

    function drawFoot2() {
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

    function drawHand1() {
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

    function drawHand2() {
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

    function play() {

        playAgain.hide();

        const theWordObject = getRandomWord();
        const theWord = theWordObject.word;
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
            } else {
                $('audio').prop('src', 'media/zapsplat_incorrect.mp3')[0].play();
                fx[fxIndex++]();
                if (fxIndex === fx.length) {
                    setTimeout(() => {
                        playAgain.show();
                    }, 2000);
                }
            }

        });

        $('button').click(evt => {
            $(evt.target).text() === 'Play Again' ? location.reload() : window.close(); //jshint ignore:line
        });
    }

    play();

}());