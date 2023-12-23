System.register([], function (exports_1, context_1) {
    "use strict";
    var Categories, PigHandler, Grey, Chestnut, White, Black;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (Categories) {
                Categories[Categories["GREY"] = 0] = "GREY";
                Categories[Categories["CHESTNUT"] = 1] = "CHESTNUT";
                Categories[Categories["WHITE"] = 2] = "WHITE";
                Categories[Categories["BLACK"] = 3] = "BLACK";
            })(Categories || (Categories = {}));
            PigHandler = class PigHandler {
                constructor() {
                    this.pigs = [[], [], [], []];
                    this.curInfoTablePig = null;
                    const storedPigs = localStorage.getItem("pigs");
                    if (storedPigs) {
                        this.pigs = JSON.parse(storedPigs);
                    }
                    this.pigListTable = document.querySelector("#piglist table");
                    this.infoSection = document.querySelector("#display");
                    this.updateList();
                }
                createInfoTable(pig) {
                    // Create a table to display pig details
                    this.curInfoTablePig = pig;
                    const infoTable = document.createElement("table");
                    infoTable.id = "infoTable";
                    // Iterate through the properties of the pig object
                    for (const key in pig) {
                        if (pig.hasOwnProperty(key)) {
                            const value = pig[key];
                            // Create a row for each property and its value
                            const row = document.createElement("tr");
                            row.innerHTML = `
          <td class="infoTableKey">${key}</td>
          <td class="infoTableVal">${value}</td>
        `;
                            infoTable.appendChild(row);
                        }
                    }
                    // Clear the infoSection before adding the new infoTable
                    this.infoSection.innerHTML = '';
                    this.infoSection.appendChild(infoTable);
                }
                updateList() {
                    //delete all the rows
                    for (let i = this.pigListTable.rows.length - 1; i > 0; --i) {
                        this.pigListTable.deleteRow(i);
                    }
                    //grab all the indexes
                    const categoryKeys = Object.keys(Categories).filter(key => !isNaN(Number(Categories[key])));
                    categoryKeys.forEach(key => {
                        var _a, _b;
                        //grab enum value
                        const categoryValue = Categories[key];
                        //display all pigs from each category
                        for (let i = 0; this.pigs[categoryValue] && i < this.pigs[categoryValue].length; ++i) {
                            let pig = this.pigs[categoryValue][i];
                            const row = document.createElement("tr");
                            //add the html stuffs
                            row.innerHTML = '<td>' + pig.Name + '</td><td>' + key + '</td><td><button class="infoButton">More Info</button><td><button class="deleteButton">Delete</button></td>';
                            //add event listener for info button
                            (_a = row.querySelector(".infoButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                                this.createInfoTable(pig);
                            });
                            // Add event listener for the "Delete" button
                            (_b = row.querySelector(".deleteButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
                                if (confirm("Are you sure you want to delete this pig?")) {
                                    //if the pig is currently displaying more info, delete the more info
                                    if (this.curInfoTablePig == pig) {
                                        this.infoSection.innerHTML = '';
                                    }
                                    //get the index of the pig
                                    let temp = this.pigs[categoryValue].indexOf(pig);
                                    if (temp !== -1) {
                                        //send pig to the afterlife
                                        this.pigs[categoryValue].splice(temp, 1);
                                        //re-store the pig list
                                        localStorage.setItem("pigs", JSON.stringify(this.pigs));
                                        row.remove();
                                    }
                                }
                            });
                            this.pigListTable.appendChild(row);
                        }
                    });
                }
                static getInstance() {
                    //standard singleton stuff
                    if (!PigHandler.instance) {
                        PigHandler.instance = new PigHandler();
                    }
                    return PigHandler.instance;
                }
                getCategory(pig) {
                    //i only actually use this once now that i think of it, probably should delete
                    if (pig instanceof Grey) {
                        return Categories.GREY;
                    }
                    else if (pig instanceof Chestnut) {
                        return Categories.CHESTNUT;
                    }
                    else if (pig instanceof White) {
                        return Categories.WHITE;
                    }
                    else if (pig instanceof Black) {
                        return Categories.BLACK;
                    }
                    else {
                        console.log("uh oh");
                        return Categories.BLACK;
                    }
                }
                sortPigsByName(index) {
                    //sort alphabetically
                    this.pigs[index].sort((a, b) => a.Name.localeCompare(b.Name));
                }
                addPig(pig) {
                    //get the pig category
                    const pigType = this.getCategory(pig);
                    //add it to its section in the pig array
                    this.pigs[pigType].push(pig);
                    //sort all the piggies
                    this.sortPigsByName(pigType);
                    //refresh the new list
                    this.updateList();
                    //create an info table for the pig
                    this.createInfoTable(pig);
                    //store pig
                    localStorage.setItem("pigs", JSON.stringify(this.pigs));
                }
            };
            exports_1("PigHandler", PigHandler);
            ;
            Grey = class Grey {
                constructor(Name = "", Breed = "", Height = 0, Weight = 0, Personality = "", Swimming_Ability = 0) {
                    this.Name = Name;
                    this.Breed = Breed;
                    this.Height = Height;
                    this.Weight = Weight;
                    this.Personality = Personality;
                    this.Swimming_Ability = Swimming_Ability;
                }
                //couldnt figure out how to make this static but its fine
                getHtml() {
                    return `<table>
                <tr><td class="widerCol">Name</td><td class="widerCol"><input type="text" class="data" id="NameInput"></td></tr>
                <tr><td class="widerCol">Breed</td><td class="widerCol"><input type="text" class="data" id="BreedInput"></td></tr>
                <tr><td class="widerCol">Height</td><td class="widerCol"><input type="number" class="data" min="0" id="HeightInput"></td></tr>
                <tr><td class="widerCol">Weight</td><td class="widerCol"><input type="number" class="data" min="0" id="WeightInput"></td></tr>
                <tr><td class="widerCol">Personality</td><td class="widerCol"><input type="text" class="data" id="PersonalityInput"></td></tr>
                <tr><td class="widerCol">Swimming Ability</td><td class="widerCol"><input type="number" class="data" min="0" max="100" id="Swimming_AbilityInput"></td></tr>
            </table>
            <button id="submitButton">Submit</button>
    `;
                }
                loadPig() {
                    // Get the input elements
                    const NameInput = document.getElementById("NameInput");
                    const BreedInput = document.getElementById("BreedInput");
                    const HeightInput = document.getElementById("HeightInput");
                    const WeightInput = document.getElementById("WeightInput");
                    const PersonalityInput = document.getElementById("PersonalityInput");
                    const Swimming_AbilityInput = document.getElementById("Swimming_AbilityInput");
                    // Update the class properties with the input values
                    this.Name = NameInput.value;
                    this.Breed = BreedInput.value;
                    this.Height = parseFloat(HeightInput.value);
                    this.Weight = parseFloat(WeightInput.value);
                    this.Personality = PersonalityInput.value;
                    this.Swimming_Ability = parseFloat(Swimming_AbilityInput.value);
                    //validation
                    let error = "";
                    let flag = false;
                    if (this.Height < 0 || Number.isNaN(this.Height)) {
                        this.Height = 0;
                        HeightInput.value = "0";
                        error += "Height must be a value greater than 0!\n";
                        flag = true;
                    }
                    if (this.Weight < 0 || Number.isNaN(this.Weight)) {
                        this.Weight = 0;
                        WeightInput.value = "0";
                        error += "Weight must be a value greater than 0!\n";
                        flag = true;
                    }
                    if (this.Swimming_Ability < 0 || Number.isNaN(this.Swimming_Ability)) {
                        Swimming_AbilityInput.value = "0";
                        this.Swimming_Ability = 0;
                        error += "Swimming Ability must be a value between 0-100!\n";
                        flag = true;
                    }
                    else if (this.Swimming_Ability > 100) {
                        Swimming_AbilityInput.value = "100";
                        this.Swimming_Ability = 100;
                        error += "Swimming Ability must be a value between 0-100!\n";
                        flag = true;
                    }
                    if (flag) {
                        alert(error);
                        return false;
                    }
                    return true;
                }
            };
            exports_1("Grey", Grey);
            Chestnut = class Chestnut {
                constructor(Name = "", Breed = "", Height = 0, Weight = 0, Personality = "", Language = "") {
                    this.Name = Name;
                    this.Breed = Breed;
                    this.Height = Height;
                    this.Weight = Weight;
                    this.Personality = Personality;
                    this.Language = Language;
                }
                getHtml() {
                    return `<table>
                <tr><td class="widerCol">Name</td><td class="widerCol"><input type="text" class="data" id="NameInput"></td></tr>
                <tr><td class="widerCol">Breed</td><td class="widerCol"><input type="text" class="data" id="BreedInput"></td></tr>
                <tr><td class="widerCol">Height</td><td class="widerCol"><input type="number" class="data" min="0" id="HeightInput"></td></tr>
                <tr><td class="widerCol">Weight</td><td class="widerCol"><input type="number" class="data" min="0" id="WeightInput"></td></tr>
                <tr><td class="widerCol">Personality</td><td class="widerCol"><input type="text" class="data" id="PersonalityInput"></td></tr>
                <tr><td class="widerCol">Language</td><td class="widerCol"><input type="text" class="data" id="LanguageInput"></td></tr>
            </table>
            <button id="submitButton">Submit</button>
    `;
                }
                loadPig() {
                    // Get the input elements
                    const NameInput = document.getElementById("NameInput");
                    const BreedInput = document.getElementById("BreedInput");
                    const HeightInput = document.getElementById("HeightInput");
                    const WeightInput = document.getElementById("WeightInput");
                    const PersonalityInput = document.getElementById("PersonalityInput");
                    const LanguageInput = document.getElementById("LanguageInput");
                    // Update the class properties with the input values
                    this.Name = NameInput.value;
                    this.Breed = BreedInput.value;
                    this.Height = parseFloat(HeightInput.value);
                    this.Weight = parseFloat(WeightInput.value);
                    this.Personality = PersonalityInput.value;
                    this.Language = LanguageInput.value;
                    let error = "";
                    let flag = false;
                    if (this.Height < 0 || Number.isNaN(this.Height)) {
                        this.Height = 0;
                        HeightInput.value = "0";
                        error += "Height must be a value greater than 0!\n";
                        flag = true;
                    }
                    if (this.Weight < 0 || Number.isNaN(this.Height)) {
                        WeightInput.value = "0";
                        this.Weight = 0;
                        error += "Height must be a value greater than 0!\n";
                        flag = true;
                    }
                    if (flag) {
                        alert(error);
                        return false;
                    }
                    return true;
                }
            };
            exports_1("Chestnut", Chestnut);
            White = class White {
                constructor(Name = "", Breed = "", Height = 0, Weight = 0, Personality = "", Running_Ability = 0) {
                    this.Name = Name;
                    this.Breed = Breed;
                    this.Height = Height;
                    this.Weight = Weight;
                    this.Personality = Personality;
                    this.Running_Ability = Running_Ability;
                }
                getHtml() {
                    return `<table>
                <tr><td class="widerCol">Name</td><td class="widerCol"><input type="text" class="data" id="NameInput"></td></tr>
                <tr><td class="widerCol">Breed</td><td class="widerCol"><input type="text" class="data" id="BreedInput"></td></tr>
                <tr><td class="widerCol">Height</td><td class="widerCol"><input type="number" class="data" min="0" id="HeightInput"></td></tr>
                <tr><td class="widerCol">Weight</td><td class="widerCol"><input type="number" class="data" min="0" id="WeightInput"></td></tr>
                <tr><td class="widerCol">Personality</td><td class="widerCol"><input type="text" class="data" id="PersonalityInput"></td></tr>
                <tr><td class="widerCol">Running_Ability</td><td class="widerCol"><input type="number" class="data" min="0" max="100" id="Running_AbilityInput"></td></tr>
            </table>
            <button id="submitButton">Submit</button>
    `;
                }
                loadPig() {
                    // Get the input elements
                    const NameInput = document.getElementById("NameInput");
                    const BreedInput = document.getElementById("BreedInput");
                    const HeightInput = document.getElementById("HeightInput");
                    const WeightInput = document.getElementById("WeightInput");
                    const PersonalityInput = document.getElementById("PersonalityInput");
                    const Running_AbilityInput = document.getElementById("Running_AbilityInput");
                    // Update the class properties with the input values
                    this.Name = NameInput.value;
                    this.Breed = BreedInput.value;
                    this.Height = parseFloat(HeightInput.value);
                    this.Weight = parseFloat(WeightInput.value);
                    this.Personality = PersonalityInput.value;
                    this.Running_Ability = parseFloat(Running_AbilityInput.value);
                    let error = "";
                    let flag = false;
                    if (this.Height < 0 || Number.isNaN(this.Height)) {
                        HeightInput.value = "0";
                        this.Height = 0;
                        error += "Height must be a value greater than 0!\n";
                        flag = true;
                    }
                    if (this.Weight < 0 || Number.isNaN(this.Weight)) {
                        WeightInput.value = "0";
                        this.Weight = 0;
                        error += "Weight must be a value greater than 0!\n";
                        flag = true;
                    }
                    if (this.Running_Ability < 0 || Number.isNaN(this.Running_Ability)) {
                        Running_AbilityInput.value = "0";
                        this.Running_Ability = 0;
                        error += "Running_Ability must be a value between 0-100!\n";
                        flag = true;
                    }
                    else if (this.Running_Ability > 100) {
                        Running_AbilityInput.value = "100";
                        this.Running_Ability = 100;
                        error += "Running_Ability must be a value between 0-100!\n";
                        flag = true;
                    }
                    if (flag) {
                        alert(error);
                        return false;
                    }
                    return true;
                }
            };
            exports_1("White", White);
            Black = class Black {
                constructor(Name = "", Breed = "", Height = 0, Weight = 0, Personality = "", Strength = 0) {
                    this.Name = Name;
                    this.Breed = Breed;
                    this.Height = Height;
                    this.Weight = Weight;
                    this.Personality = Personality;
                    this.Strength = Strength;
                }
                getHtml() {
                    return `<table>
                <tr><td class="widerCol">Name</td><td class="widerCol"><input type="text" class="data" id="NameInput"></td></tr>
                <tr><td class="widerCol">Breed</td><td class="widerCol"><input type="text" class="data" id="BreedInput"></td></tr>
                <tr><td class="widerCol">Height</td><td class="widerCol"><input type="number" class="data" min="0" id="HeightInput"></td></tr>
                <tr><td class="widerCol">Weight</td><td class="widerCol"><input type="number" class="data" min="0" id="WeightInput"></td></tr>
                <tr><td class="widerCol">Personality</td><td class "widerCol"><input type="text" class="data" id="PersonalityInput"></td></tr>
                <tr><td class="widerCol">Strength</td><td class="widerCol"><input type="number" class="data" min="0" max="10" id="StrengthInput"></td></tr>
            </table>
            <button id="submitButton">Submit</button>
    `;
                }
                loadPig() {
                    // Get the input elements
                    const NameInput = document.getElementById("NameInput");
                    const BreedInput = document.getElementById("BreedInput");
                    const HeightInput = document.getElementById("HeightInput");
                    const WeightInput = document.getElementById("WeightInput");
                    const PersonalityInput = document.getElementById("PersonalityInput");
                    const StrengthInput = document.getElementById("StrengthInput");
                    // Update the class properties with the input values
                    this.Name = NameInput.value;
                    this.Breed = BreedInput.value;
                    this.Height = parseFloat(HeightInput.value);
                    this.Weight = parseFloat(WeightInput.value);
                    this.Personality = PersonalityInput.value;
                    this.Strength = parseFloat(StrengthInput.value);
                    let error = "";
                    let flag = false;
                    if (this.Height < 0 || Number.isNaN(this.Height)) {
                        HeightInput.value = "0";
                        this.Height = 0;
                        error += "Height must be a value greater than 0!\n";
                        flag = true;
                    }
                    if (this.Weight < 0 || Number.isNaN(this.Weight)) {
                        WeightInput.value = "0";
                        this.Weight = 0;
                        error += "Weight must be a value greater than 0!\n";
                        flag = true;
                    }
                    if (this.Strength < 1 || Number.isNaN(this.Strength)) {
                        StrengthInput.value = "1";
                        this.Strength = 1;
                        error += "Strength must be a value between 0-100!\n";
                        flag = true;
                    }
                    else if (this.Strength > 10) {
                        StrengthInput.value = "10";
                        this.Strength = 10;
                        error += "Strength must be a value between 1-10!\n";
                        flag = true;
                    }
                    if (flag) {
                        alert(error);
                        return false;
                    }
                    return true;
                }
            };
            exports_1("Black", Black);
        }
    };
});
