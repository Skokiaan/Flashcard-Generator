var inquirer = require("inquirer");
var fs = require("fs");

exports.basic = function BasicCard (front, back){
    this.front = front;
    this.back = back;
    // this.printBasicCard = function(){
    //     console.log("Question: " + this.front + "\nAnswer: " + this.back);
    //     fs.appendFile("log.txt", "\nQuestion: " + this.front + "\nAnswer: " + this.back);
    // }
}

//==============================================================

exports.clozeCd = function ClozeCard (text, cloze){
    this.text = text;
    this.cloze = cloze;
    this.fullText = cloze + " " + text;    
}
   
