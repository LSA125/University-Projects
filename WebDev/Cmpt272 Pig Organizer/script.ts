import * as Model from "./class";
import PigHandler = Model.PigHandler
import Grey = Model.Grey
import Chestnut = Model.Chestnut
import Black = Model.Black
import White = Model.White
import Pig = Model.Pig

var pigHandler:PigHandler = PigHandler.getInstance();
var addMenu:HTMLDivElement = document.querySelector("#display")!;
var addButton:HTMLButtonElement = document.querySelector("#add button")!;
var selectedClass:Pig 
var submitButton:HTMLButtonElement;
addButton.addEventListener("click",loadAddMenu);
function loadAddMenu(){
    //find any checked radio buttons
    const selectedCategoryInput:any = document.querySelector('input[name="category"]:checked');
    //if there arent any send alert
    if(selectedCategoryInput == null){
      alert("You must select a category before adding a pig!");
      return
    }
    //assign pig category
    const selectedCategory = selectedCategoryInput.value;
    switch(selectedCategory){
      case "Grey":
        selectedClass = new Grey;
        break;
      case "Chestnut":
        selectedClass = new Chestnut;
        break;
      case "Black":
        selectedClass = new Black;
        break;
      case "White":
        selectedClass = new White;
        break;
      default:
        selectedClass = new White;
        console.log("Invalid category selected");
        return;
    }
    //grab the add menu from pig
    addMenu.innerHTML = selectedClass.getHtml();
    //add event listener to the submit button
    submitButton = document.querySelector("#submitButton")!
    submitButton.addEventListener("click",submitPig)
}

function submitPig(){
  //load the pig, if it is valid - add pig
  if(selectedClass.loadPig()){
    pigHandler.addPig(selectedClass);
  }
}

