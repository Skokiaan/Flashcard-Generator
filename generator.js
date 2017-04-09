var inquirer = require("inquirer");
var fs = require("fs");
var flashcard = require("./flashcard.js");

// Basic Card constructor:

var BasicCard = function (front, back) {
    this.front = front;
    this.back = back;
    this.printBasicCard = function () {
        console.log("\nQuestion: " + this.front + "\nAnswer: " + this.back);
        fs.appendFile("basicLog.txt", "\nQuestion: " + this.front + "\nAnswer: " + this.back);
    }
}

// Cloze-deletion Card constructor:

var ClozeCard = function (text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.partialText = text.replace(cloze, "________");
    this.printText = function () {
        console.log(this.text);
        fs.appendFile(this.text);
    };
}

// ClozeCard prototype functions: 


ClozeCard.prototype.printPartialText = function () {
    console.log("Partial text: " + this.partialText)
    fs.appendFile("clozeLog.txt", "\nPartial text: " + this.partialText)
}
ClozeCard.prototype.printNewClozeCard = function () {
    console.log("\nNew Cloze Card: " + this.text + ", " + this.cloze)
    fs.appendFile("clozeLog.txt", "\nNew Cloze Card: " + this.text + ", " + this.cloze)
}

ClozeCard.prototype.printCloze = function () {
    console.log("Cloze-deletion: " + this.cloze)
    fs.appendFile("clozeLog.txt", "\nCloze-deletion: " + this.cloze)
}

//Ask the user for input:

inquirer.prompt([{
    type: "list",
    message: "Type of flashcard:",
    choices: ["Basic Card", "Cloze-Deleted"],
    name: "cardType"
}]).then(function (user) {
    if (user.cardType == "Basic Card") {
        inquirer.prompt([{
            type: "input",
            message: "Enter a question: ",
            name: "front"
        }, {
            type: "input",
            message: "Enter the answer: ",
            name: "back"
        }]).then(function (answers) {
            var newBasicCard = new BasicCard(answers.front, answers.back);
            newBasicCard.printBasicCard();
        });
    }
    else {
        inquirer.prompt([{
            type: "input",
            message: "Enter the full text: ",
            name: "text"
        }, {
            type: "input",
            message: "Enter the cloze-deletion: ",
            name: "cloze"
        }]).then(function (responses) {

            var newClozeCard = new ClozeCard(responses.text, responses.cloze);
            var clozeDeletion = responses.cloze;
            var string = responses.text;
            var clozeIncluded = string.includes(responses.cloze);
            if (clozeIncluded == true) {
                newClozeCard.printNewClozeCard();
                newClozeCard.printPartialText();
                newClozeCard.printCloze();
            }
            else {
                console.log("\nIncorrect cloze. Try again!");
            }

        })
    }

});
