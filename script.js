// 01 START THE QUIZ
const myStartQuiz = document.getElementById('myStartQuizButton');
myStartQuiz.addEventListener('click', function () {
    document.getElementById('myQuizSection').classList.remove('d-none');
    document.getElementById('myHeroSection').classList.add('d-none');
    window.scrollTo(0, 0);
});

class MyQuiz {
    constructor () {
        this.randomNumbers = [];
        // this.randomNumbersForQuestions = //take first 10 from randomNumbers
        // this.randomNumbersForAnswers = //take 2nd 10 from randomNumbers
        this.quizArray = [];
        // this.quizArrayAnswers = []; //Array with answers

    }
    getTenRandomNumbers() {
        while(this.randomNumbers.length < 10){
        let r = Math.floor(Math.random() * 19);
        if(this.randomNumbers.indexOf(r) === -1) this.randomNumbers.push(r);
        }
    }
    createQuizArray() {
        let item;
        for (let i = 0; i < this.randomNumbers.length; i++) {
            item = myArtistsAndImages[this.randomNumbers[i]];
            this.quizArray.push(item);
        }
    }
}

// const myQuiz = new MyQuiz()
// myQuiz.getTenRandomNumbers()
// console.log(myQuiz.randomNumbers)

class MyGame {
    createQuestion() {
        document.getElementById('myName').innerHTML = myQuiz.quizArray[0].name
    }
}

const myQuiz = new MyQuiz();
myQuiz.getTenRandomNumbers();
myQuiz.createQuizArray();
const myGame = new MyGame();
myGame.createQuestion();

// class NewQuestion {
//     constructor(artistTrue, imageTrue1, imageTrue2, imageTrue3, imageFalse, imageFalseName, artistFalse) {
//         this.artistTrue = artistTrue;
//         this.imageTrue1 = imageTrue1;
//         this.imageTrue2 = imageTrue2;
//         this.imageTrue3 = imageTrue3;
//         this.imageFalse = imageFalse;
//         this.imageFalseName = imageFalseName;
//         this.artistFalse = artistFalse;
//     }
//     initiateTheQuestion() {

//     }
// }




// 03 QUIZ GAME - CHOSE THE IMAGE
// function myStartGame() {
//     const myImageChoice = document.querySelectorAll(".myQuizImage");
//     for (const myImage of myImageChoice) {
//         myImage.addEventListener("click", function (e) {
//             e.currentTarget.classList.add('myOpacity');
//         });
//     };
// };








    
