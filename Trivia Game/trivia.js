(function () {
    'use strict';

    const theLevelChoices = $('#level');
    const theQuestion = $('#question');
    const theAnswerChoices = $('#answerChoices');
    const theMessage = $('#message');
    const theTitle = $('h1');
    let theLevel = '';
    let theAnswer = '';
    let usedTrivia = [];
    const points = $('#points');
    points.text(0);
    $('body').css('color', 'white');
    theMessage.hide(); 



    function endGame() {
        $('body').empty();
        $('<h2 id="gameOver">GAME OVER </h2>').appendTo('body');
        $(`<h2 id="finalScore">Your score is ${score}</h2>`).appendTo('body');
        $('<button id="newGame">New Game</button>').appendTo('body');
        const theNewGameButton = $('#newGame');
        theNewGameButton.click(() => {
            location.reload();
        });
    }

    function getRandomNum(rsLength) {
        let randomNum = Math.floor((Math.random() * rsLength));
        return randomNum;
    }

    function floatPoints(add) {
        theAnswerChoices.append('<div id="floatingPoints"></div>');
        const floatingPoints = $('#floatingPoints');
        floatingPoints.css('left', '645px');
        floatingPoints.css('top', '100px');
        let theFloatingPosition = 100; /*parseFloat(getComputedStyle($('#floatingPoints')[0]).top); console.log(theFloatingPosition);*/
        let theFloatingOpac = 1;
        let theInterval = setInterval(() => {
            if (add) {
                floatingPoints.text(`+10`);
                floatingPoints.css('color', 'blue');
            } else {
                floatingPoints.text(`-5`);
                floatingPoints.css('color', 'red');
            }
            theFloatingPosition -= 10; console.log(theFloatingPosition);
            floatingPoints.css('top', theFloatingPosition);
            floatingPoints.css('opacity', (theFloatingOpac -= 0.05));
        }, 100);
        setTimeout(() => {
            clearInterval(theInterval);
        }, 2000);
    }

    const theEndGameButton = $('#endGame');
    theEndGameButton.click(() => {
        endGame();
    });

    let uiScore = 0;
    let score = 0;

    let r = 0;
    let g = 0;
    let b = -1;

    const INCREMENT = 50;


    theAnswerChoices.hide();
    theQuestion.hide();
    theLevelChoices.click(e => {
        theTitle.hide();
        theLevel = (e.target.value - 1);
        $('#currLevel').text(`Level ${e.target.value}`);
        if (theLevel === 1) {
            $('#currLevel').css('color', 'orange');
        }
        if (theLevel === 2) {
            $('#currLevel').css('color', 'indigo');
        }
        theLevelChoices.hide();

        fetch('trivia.json')
            .then(r => {
                if (!r.ok) {
                    throw new Error(`${r.status} ${r.statusText}`);
                }
                return r.json();
            })
            .then(rs => {
                displayTrivia();

                function displayTrivia() {
                    let triviaNum;
                    let notUsed;
                    while (!notUsed) {
                        triviaNum = getRandomNum(rs[theLevel].length);
                        if (!usedTrivia.includes(triviaNum)) {
                            notUsed = true;
                        }
                    }
                    usedTrivia.push(triviaNum);
                    theQuestion.text(rs[theLevel][triviaNum].question);
                    theAnswer = rs[theLevel][triviaNum].answer;
                    rs[theLevel][triviaNum].choices.forEach((element, index) => {
                        $(`<li class="theAnswers"><div class="choices" id="${index}" name="answer" value="${element}"> ${element}</div></li>`)
                            .appendTo(theAnswerChoices);
                        $(`#${index}`).click(function () {
                            $(`#${index}`).css('opacity', '0.5');
                            let addPoints;
                            if (element === theAnswer) {
                                addPoints = true;
                            }

                            floatPoints(addPoints);

                            if (addPoints) {
                                $('#changeScore').prop('src', 'media/zapsplat_correct_tone.mp3')[0].play();
                                score += 10;
                                theMessage.css('color', 'green');
                                theMessage.text('GREAT JOB!');
                                console.log(usedTrivia, rs[theLevel].length);
                                if (usedTrivia.length !== rs[theLevel].length) {
                                    setTimeout(() => {
                                        theQuestion.empty();
                                        theAnswerChoices.empty();
                                        displayTrivia();
                                    }, 5000);
                                } else {
                                    setTimeout(() => {
                                        endGame();
                                    }, 5500);
                                }

                            } else {
                                $('#changeScore').prop('src', 'media/zapsplat_error_tone.mp3')[0].play();
                                score -= 5;
                                theMessage.css('color', 'red');
                                theMessage.text('SORRY, TRY AGAIN');
                            }
                            theMessage.show();
                            setTimeout(() => {
                                theMessage.hide();
                            }, 3000);

                            setTimeout(() => {
                                let intervalId = setInterval(() => {
                                    $('#pointsTally')[0].play();
                                    if (addPoints) {
                                        $('#points').text(++uiScore);
                                    } else {
                                        $('#points').text(--uiScore);
                                    }

                                    b += INCREMENT;
                                    if (b >= 256) {
                                        b = 0;

                                        g += INCREMENT;
                                        if (g >= 256) {
                                            g = 0;

                                            r += INCREMENT;
                                            if (r >= 256) {
                                                r = 0;
                                            }
                                        }
                                    }
                                    $('#points').css('color', `rgb(${r},${g},${b})`);
                                    if (uiScore === score) {
                                        clearInterval(intervalId);
                                    }
                                }, 100);
                            }, 3000);

                        });
                    });
                }
            });
        theQuestion.show();
        theAnswerChoices.show();
    });
}());
