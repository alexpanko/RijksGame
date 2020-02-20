//Start the game - generate questions and answers
class MyQuiz {
    constructor () {
        this.counter = "0";
        this.questionOrder = 1;
        this.randomNumbers = [];
        this.randomNumbersForQuestions = [];
        this.randomNumbersForAnswers = [];
        this.quizArray = [];
        this.quizArrayAnswers = []; 
        this.takeTheQuizButton = document.getElementById('myStartQuizButton');
        this.myQuestions = null;
        this.initialise();
    }
    initialise() {
        this.getRandomNumbers();
        this.createQuizArray();
        this.createQuizArrayAnswers();
        this.startQuiz();
    }
    //Get random numbers to create (shuffeled) quiestions and answers from data.js
    getRandomNumbers() {
        while(this.randomNumbers.length < 20){
            //Possible (if get more data) to replace 20 with the number of objects in data.js. Currently - 20 artists.
            let r = Math.floor(Math.random() * 20);
            if(this.randomNumbers.indexOf(r) === -1) this.randomNumbers.push(r);
        }
        this.randomNumbersForQuestions = this.randomNumbers.slice(0,10);
        this.randomNumbersForAnswers = this.randomNumbers.slice(10);
    }
    createQuizArray() {
        let item;
        for (let i = 0; i < this.randomNumbersForQuestions.length; i++) {
            item = myArtistsAndImages[this.randomNumbersForQuestions[i]];
            this.quizArray.push(item);
        }
    }
    createQuizArrayAnswers() {
        let item;
        for (let i = 0; i < this.randomNumbersForAnswers.length; i++) {
            item = myArtistsAndImages[this.randomNumbersForAnswers[i]];
            this.quizArrayAnswers.push(item);
        }
    }
    //Take the Quiz button - click to start
    startQuiz() {
        this.takeTheQuizButton.addEventListener('click', () => {
            document.getElementById('myQuizSection').classList.remove('d-none');
            document.getElementById('myHeroSection').classList.add('d-none');
            window.scrollTo(0, 0);
            this.myQuestions = new MyGame();
            this.myQuestions.getImagesOrder();
            this.myQuestions.createQuestion(0);
        });
    }
}

const myQuiz = new MyQuiz();


//Preload images
let quizImages = []
// https://peaceful-spence-c77560.netlify.com/
for (let i = 0; i < myQuiz.quizArray.length; i++) {
    quizImages.push(myQuiz.quizArray[i].image1);
    quizImages.push(myQuiz.quizArray[i].image2);
    quizImages.push(myQuiz.quizArray[i].image3);
}
let images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}
preload(quizImages);

//Update content
class MyGame {
    constructor () {
        this.imagesOrder = [];
        this.answer = "";
    }
    getImagesOrder() {
        while(this.imagesOrder.length < 4){
        let r = Math.floor(Math.random() * 4);
        if(this.imagesOrder.indexOf(r) === -1) this.imagesOrder.push(r);
        }
    }
    createQuestion(questionOrder) {
        //Add artist
        document.getElementById('myName').innerHTML = myQuiz.quizArray[questionOrder].name;
        document.getElementById('myDescriptionLess').innerHTML = myQuiz.quizArray[questionOrder].descriptionLess;
        document.getElementById('myDescriptionMore').innerHTML = myQuiz.quizArray[questionOrder].descriptionMore;
        document.getElementById('myQuestionName').innerHTML = myQuiz.quizArray[questionOrder].name;
        //Add images
        document.querySelectorAll('.myQuizImageBox img')[0].src = myQuiz.quizArray[questionOrder].image1;
        document.querySelectorAll('.myQuizImageBox img')[0].alt = myQuiz.quizArray[questionOrder].image1Name;
        document.querySelectorAll('.myQuizImageBox img')[1].src = myQuiz.quizArray[questionOrder].image2;
        document.querySelectorAll('.myQuizImageBox img')[1].alt = myQuiz.quizArray[questionOrder].image2Name;
        document.querySelectorAll('.myQuizImageBox img')[2].src = myQuiz.quizArray[questionOrder].image3;
        document.querySelectorAll('.myQuizImageBox img')[2].alt = myQuiz.quizArray[questionOrder].image3Name;
        // Randomise answers/ images 
        document.querySelectorAll('.myQuizImageBox')[0].style.order = this.imagesOrder[0];
        document.querySelectorAll('.myQuizImageBox')[1].style.order = this.imagesOrder[1];
        document.querySelectorAll('.myQuizImageBox')[2].style.order = this.imagesOrder[2];
        document.querySelectorAll('.myQuizImageBox')[3].style.order = this.imagesOrder[3];
        //Add answer
        document.getElementById('myNameAnswer').innerHTML = myQuiz.quizArrayAnswers[questionOrder].name;
        document.getElementById('myImageNameAnswer').innerHTML = myQuiz.quizArrayAnswers[questionOrder].name;
        document.getElementById('myDescriptionLessAnswer').innerHTML = myQuiz.quizArrayAnswers[questionOrder].descriptionLess;
        document.getElementById('myDescriptionMoreAnswer').innerHTML = myQuiz.quizArrayAnswers[questionOrder].descriptionMore;
        let r = Math.floor(Math.random() * 3) + 1;
        document.querySelectorAll('.myQuizImageBox img')[3].src = myQuiz.quizArrayAnswers[questionOrder][`image${r}`];
        document.querySelectorAll('.myQuizImageBox img')[3].alt = myQuiz.quizArrayAnswers[questionOrder][`image${r}Name`];
        document.getElementById('myImageAltAnswer').innerHTML = myQuiz.quizArrayAnswers[questionOrder][`image${r}Name`];
        this.answer = myQuiz.quizArrayAnswers[questionOrder][`image${r}Name`];
        document.getElementById('myImageAnswer').src = myQuiz.quizArrayAnswers[questionOrder][`image${r}`];
    }
}

// QUIZ GAME - CHOSE THE IMAGE
class SelectImage {
    constructor () {
        this.myImageChoice = document.querySelectorAll(".myQuizImage");
    }
    selectRightAnswer () {
        let onlyOneChoice = false;
        for (const myImage of this.myImageChoice) {
            myImage.addEventListener("click", chooseAnswer)
            function chooseAnswer(e) {
                if (onlyOneChoice == false) {
                    e.currentTarget.classList.add('myChoice');
                if (e.currentTarget.alt === myQuiz.myQuestions.answer) {
                    document.getElementById('wellDone').innerHTML = "Well done!";
                    myQuiz.counter++; 
                    document.getElementById('myCounter').innerHTML = myQuiz.counter;
                } else {
                    document.getElementById('wellDone').innerHTML = "Oops!";
                }
                onlyOneChoice = true;
                document.getElementById('myQuizAnswerSection').classList.remove('d-none');
                myImage.removeEventListener("click", chooseAnswer);
                window.location.href = '#wellDone'
                }    
            }
        }
    }
}

let selectImage = new SelectImage();
selectImage.selectRightAnswer();


// Next Question
class NextQuestion {
    constructor () {
        this.nextQuestionButton = document.getElementById('myNextQuestion');
    }
    showNextQuestion () {
        this.nextQuestionButton.addEventListener('click', function () {
            if (myQuiz.questionOrder < 10) {
                myQuiz.myQuestions = new MyGame();
                myQuiz.myQuestions.getImagesOrder();
                myQuiz.myQuestions.createQuestion(myQuiz.questionOrder);
                selectImage = new SelectImage;
                selectImage.selectRightAnswer();
                document.getElementById('myQuizAnswerSection').classList.add('d-none');
                document.getElementsByClassName('myChoice')[0].classList.remove('myChoice');
                document.getElementById('collapse').classList.remove('show');
                document.getElementById('collapseAnswer').classList.remove('show');
                myQuiz.questionOrder++;
            } else {
            document.getElementById('myQuizSection').classList.add('d-none');
            document.getElementById('myQuizAnswerSection').classList.add('d-none');
            document.getElementById('myGameOwer').classList.remove('d-none');
            document.getElementById('myCounter2').innerHTML = myQuiz.counter;
            document.getElementById('myCounter3').innerHTML = myQuiz.counter;
            }
            window.scrollTo(0, 0);
        });
    }
}

const nextQuestion = new NextQuestion();
nextQuestion.showNextQuestion();