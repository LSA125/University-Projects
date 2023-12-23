System.register(["./class"], function (exports_1, context_1) {
    "use strict";
    var Model, PigHandler, Grey, Chestnut, Black, White, pigHandler, addMenu, addButton, selectedClass, submitButton;
    var __moduleName = context_1 && context_1.id;
    function loadAddMenu() {
        //find any checked radio buttons
        const selectedCategoryInput = document.querySelector('input[name="category"]:checked');
        //if there arent any send alert
        if (selectedCategoryInput == null) {
            alert("You must select a category before adding a pig!");
            return;
        }
        //assign pig category
        const selectedCategory = selectedCategoryInput.value;
        switch (selectedCategory) {
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
        submitButton = document.querySelector("#submitButton");
        submitButton.addEventListener("click", submitPig);
    }
    function submitPig() {
        //load the pig, if it is valid - add pig
        if (selectedClass.loadPig()) {
            pigHandler.addPig(selectedClass);
        }
    }
    return {
        setters: [
            function (Model_1) {
                Model = Model_1;
            }
        ],
        execute: function () {
            PigHandler = Model.PigHandler;
            Grey = Model.Grey;
            Chestnut = Model.Chestnut;
            Black = Model.Black;
            White = Model.White;
            pigHandler = PigHandler.getInstance();
            addMenu = document.querySelector("#display");
            addButton = document.querySelector("#add button");
            addButton.addEventListener("click", loadAddMenu);
        }
    };
});
