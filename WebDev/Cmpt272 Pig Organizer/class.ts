export interface Pig{
    Name: string;
    Breed: string;
    Height: number;
    Weight: number;
    Personality: string;
    getHtml():string
    loadPig():boolean
}
enum Categories{
  GREY,
  CHESTNUT,
  WHITE,
  BLACK
}
export class PigHandler {
  private pigs:Pig[][] = [[],[],[],[]];
  private static instance:PigHandler;
  private pigListTable:HTMLTableElement;
  private infoSection:HTMLDivElement;
  private curInfoTablePig:any = null;
  private constructor() {
    const storedPigs = localStorage.getItem("pigs");
    if (storedPigs) {
        this.pigs = JSON.parse(storedPigs);
    }
    this.pigListTable = document.querySelector("#piglist table")!;
    this.infoSection = document.querySelector("#display")!;
    this.updateList()
}
  private createInfoTable(pig: Pig): void {
    // Create a table to display pig details
    this.curInfoTablePig = pig;
    const infoTable = document.createElement("table");
    infoTable.id = "infoTable"
    // Iterate through the properties of the pig object
    for (const key in pig) {
      if (pig.hasOwnProperty(key)) {
        const value:any = pig[key as keyof Pig];
  
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
  private updateList():void{
    //delete all the rows
    for (let i: number = this.pigListTable.rows.length - 1; i > 0; --i) {
      this.pigListTable.deleteRow(i);
    }
    //grab all the indexes
    const categoryKeys = Object.keys(Categories).filter(key => !isNaN(Number(Categories[key as keyof typeof Categories])));

    categoryKeys.forEach(key => {
      //grab enum value
      const categoryValue = Categories[key as keyof typeof Categories];
      //display all pigs from each category
      for (let i: number = 0; this.pigs[categoryValue] && i < this.pigs[categoryValue].length; ++i) {
        let pig:Pig = this.pigs[categoryValue][i];
        const row: HTMLTableRowElement = document.createElement("tr");

        //add the html stuffs
        row.innerHTML = '<td>' + pig.Name + '</td><td>' + key + '</td><td><button class="infoButton">More Info</button><td><button class="deleteButton">Delete</button></td>';
        
        //add event listener for info button
        row.querySelector(".infoButton")?.addEventListener("click", () => {
          this.createInfoTable(pig);
        });
  
        // Add event listener for the "Delete" button
        row.querySelector(".deleteButton")?.addEventListener("click", () => {
          if(confirm("Are you sure you want to delete this pig?")){
            //if the pig is currently displaying more info, delete the more info
            if(this.curInfoTablePig == pig){
              this.infoSection.innerHTML = '';
            }
            //get the index of the pig
            let temp = this.pigs[categoryValue].indexOf(pig)
            if (temp !== -1) {
              //send pig to the afterlife
              this.pigs[categoryValue].splice(temp,1);
              //re-store the pig list
              localStorage.setItem("pigs",JSON.stringify(this.pigs));
              row.remove();
            }
          }
        });
        this.pigListTable.appendChild(row);
      }
    });
  }
  public static getInstance(): PigHandler{
    //standard singleton stuff
    if(!PigHandler.instance){
      PigHandler.instance = new PigHandler();
    }
    return PigHandler.instance
  }
  private getCategory(pig:Pig): Categories {
    //i only actually use this once now that i think of it, probably should delete
    if(pig instanceof Grey){
      return Categories.GREY
    }else
    if(pig instanceof Chestnut){
      return Categories.CHESTNUT
    }else
    if(pig instanceof White){
      return Categories.WHITE
    }else
    if(pig instanceof Black){
      return Categories.BLACK
    }else{
      console.log("uh oh");
      return Categories.BLACK;
    }
  }
  private sortPigsByName(index:Categories):void {
    //sort alphabetically
    this.pigs[index].sort((a, b) => a.Name.localeCompare(b.Name));
  }
  public addPig(pig:Pig):void{
    //get the pig category
    const pigType:Categories = this.getCategory(pig);
    //add it to its section in the pig array
    this.pigs[pigType].push(pig);
    //sort all the piggies
    this.sortPigsByName(pigType);
    //refresh the new list
    this.updateList()
    //create an info table for the pig
    this.createInfoTable(pig)
    //store pig
    localStorage.setItem("pigs",JSON.stringify(this.pigs));
  }
};
export class Grey implements Pig {
  Name: string;
  Breed: string;
  Height: number;
  Weight: number;
  Personality: string;
  Swimming_Ability: number;

  constructor(
      Name: string = "",
      Breed: string = "",
      Height: number = 0,
      Weight: number = 0,
      Personality: string = "",
      Swimming_Ability: number = 0
  ){
      this.Name = Name;
      this.Breed = Breed;
      this.Height = Height;
      this.Weight = Weight;
      this.Personality = Personality;
      this.Swimming_Ability = Swimming_Ability;
  }
  //couldnt figure out how to make this static but its fine
  public getHtml(): string {
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

  loadPig(): boolean {
      // Get the input elements
      const NameInput = document.getElementById("NameInput") as HTMLInputElement;
      const BreedInput = document.getElementById("BreedInput") as HTMLInputElement;
      const HeightInput = document.getElementById("HeightInput") as HTMLInputElement;
      const WeightInput = document.getElementById("WeightInput") as HTMLInputElement;
      const PersonalityInput = document.getElementById("PersonalityInput") as HTMLInputElement;
      const Swimming_AbilityInput = document.getElementById("Swimming_AbilityInput") as HTMLInputElement;

      // Update the class properties with the input values
      this.Name = NameInput.value;
      this.Breed = BreedInput.value;
      this.Height = parseFloat(HeightInput.value);
      this.Weight = parseFloat(WeightInput.value);
      this.Personality = PersonalityInput.value;
      this.Swimming_Ability = parseFloat(Swimming_AbilityInput.value);

      //validation
      let error:string = ""
      let flag:boolean = false
      if(this.Height < 0 || Number.isNaN(this.Height)){
        this.Height = 0;
        HeightInput.value = "0"
        error += "Height must be a value greater than 0!\n"
        flag = true;
      }
      if(this.Weight < 0 || Number.isNaN(this.Weight)){
        this.Weight = 0;
        WeightInput.value = "0"
        error += "Weight must be a value greater than 0!\n"
        flag = true;
      }
      if(this.Swimming_Ability < 0 || Number.isNaN(this.Swimming_Ability)){
        Swimming_AbilityInput.value = "0"
        this.Swimming_Ability = 0
        error += "Swimming Ability must be a value between 0-100!\n"
        flag = true;
      }else
      if(this.Swimming_Ability > 100){
        Swimming_AbilityInput.value = "100"
        this.Swimming_Ability = 100
        error += "Swimming Ability must be a value between 0-100!\n"
        flag = true;
      }
      if(flag){
        alert(error);
        return false;
      }
      return true;
  }
}

export class Chestnut implements Pig {
  Name: string;
  Breed: string;
  Height: number;
  Weight: number;
  Personality: string;
  Language: string;

  constructor(
      Name: string = "",
      Breed: string = "",
      Height: number = 0,
      Weight: number = 0,
      Personality: string = "",
      Language: string = ""
  ) {
      this.Name = Name;
      this.Breed = Breed;
      this.Height = Height;
      this.Weight = Weight;
      this.Personality = Personality;
      this.Language = Language;
  }

  public getHtml(): string {
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

  loadPig(): boolean {
      // Get the input elements
      const NameInput = document.getElementById("NameInput") as HTMLInputElement;
      const BreedInput = document.getElementById("BreedInput") as HTMLInputElement;
      const HeightInput = document.getElementById("HeightInput") as HTMLInputElement;
      const WeightInput = document.getElementById("WeightInput") as HTMLInputElement;
      const PersonalityInput = document.getElementById("PersonalityInput") as HTMLInputElement;
      const LanguageInput = document.getElementById("LanguageInput") as HTMLInputElement;

      // Update the class properties with the input values
      this.Name = NameInput.value;
      this.Breed = BreedInput.value;
      this.Height = parseFloat(HeightInput.value);
      this.Weight = parseFloat(WeightInput.value);
      this.Personality = PersonalityInput.value;
      this.Language = LanguageInput.value;

      let error:string = ""
      let flag:boolean = false
      if(this.Height < 0 || Number.isNaN(this.Height)){
        this.Height = 0;
        HeightInput.value = "0"
        error += "Height must be a value greater than 0!\n"
        flag = true;
      }
      if(this.Weight < 0 || Number.isNaN(this.Height)){
        WeightInput.value = "0"
        this.Weight = 0;
        error += "Height must be a value greater than 0!\n"
        flag = true;
      }
      if(flag){
        alert(error);
        return false;
      }
      return true;
  }
}
export class White implements Pig {
  Name: string;
  Breed: string;
  Height: number;
  Weight: number;
  Personality: string;
  Running_Ability: number;

  constructor(
      Name: string = "",
      Breed: string = "",
      Height: number = 0,
      Weight: number = 0,
      Personality: string = "",
      Running_Ability: number = 0
  ) {
      this.Name = Name;
      this.Breed = Breed;
      this.Height = Height;
      this.Weight = Weight;
      this.Personality = Personality;
      this.Running_Ability = Running_Ability;
  }

  public getHtml(): string {
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

  loadPig():boolean {
      // Get the input elements
      const NameInput = document.getElementById("NameInput") as HTMLInputElement;
      const BreedInput = document.getElementById("BreedInput") as HTMLInputElement;
      const HeightInput = document.getElementById("HeightInput") as HTMLInputElement;
      const WeightInput = document.getElementById("WeightInput") as HTMLInputElement;
      const PersonalityInput = document.getElementById("PersonalityInput") as HTMLInputElement;
      const Running_AbilityInput = document.getElementById("Running_AbilityInput") as HTMLInputElement;

      // Update the class properties with the input values
      this.Name = NameInput.value;
      this.Breed = BreedInput.value;
      this.Height = parseFloat(HeightInput.value);
      this.Weight = parseFloat(WeightInput.value);
      this.Personality = PersonalityInput.value;
      this.Running_Ability = parseFloat(Running_AbilityInput.value);

      let error:string = ""
      let flag:boolean = false
      if(this.Height < 0 || Number.isNaN(this.Height)){
        HeightInput.value = "0"
        this.Height = 0;
        error += "Height must be a value greater than 0!\n"
        flag = true;
      }
      if(this.Weight < 0 || Number.isNaN(this.Weight)){
        WeightInput.value = "0"
        this.Weight = 0;
        error += "Weight must be a value greater than 0!\n"
        flag = true;
      }
      if(this.Running_Ability < 0 || Number.isNaN(this.Running_Ability)){
        Running_AbilityInput.value = "0"
        this.Running_Ability = 0
        error += "Running_Ability must be a value between 0-100!\n"
        flag = true;
      }else
      if(this.Running_Ability > 100){
        Running_AbilityInput.value = "100"
        this.Running_Ability = 100
        error += "Running_Ability must be a value between 0-100!\n"
        flag = true;
      }
      if(flag){
        alert(error);
        return false;
      }
      return true;
  }
}
export class Black implements Pig {
  Name: string;
  Breed: string;
  Height: number;
  Weight: number;
  Personality: string;
  Strength: number;

  constructor(
      Name: string = "",
      Breed: string = "",
      Height: number = 0,
      Weight: number = 0,
      Personality: string = "",
      Strength: number = 0
  ) {
      this.Name = Name;
      this.Breed = Breed;
      this.Height = Height;
      this.Weight = Weight;
      this.Personality = Personality;
      this.Strength = Strength;
  }

  public getHtml(): string {
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

  loadPig():boolean {
      // Get the input elements
      const NameInput = document.getElementById("NameInput") as HTMLInputElement;
      const BreedInput = document.getElementById("BreedInput") as HTMLInputElement;
      const HeightInput = document.getElementById("HeightInput") as HTMLInputElement;
      const WeightInput = document.getElementById("WeightInput") as HTMLInputElement;
      const PersonalityInput = document.getElementById("PersonalityInput") as HTMLInputElement;
      const StrengthInput = document.getElementById("StrengthInput") as HTMLInputElement;

      // Update the class properties with the input values
      this.Name = NameInput.value;
      this.Breed = BreedInput.value;
      this.Height = parseFloat(HeightInput.value);
      this.Weight = parseFloat(WeightInput.value);
      this.Personality = PersonalityInput.value;
      this.Strength = parseFloat(StrengthInput.value);

      let error:string = ""
      let flag:boolean = false
      if(this.Height < 0 || Number.isNaN(this.Height)){
        HeightInput.value = "0"
        this.Height = 0;
        error += "Height must be a value greater than 0!\n"
        flag = true;
      }
      if(this.Weight < 0 || Number.isNaN(this.Weight)){
        WeightInput.value = "0"
        this.Weight = 0;
        error += "Weight must be a value greater than 0!\n"
        flag = true;
      }
      if(this.Strength < 1 || Number.isNaN(this.Strength)){
        StrengthInput.value = "1"
        this.Strength = 1
        error += "Strength must be a value between 0-100!\n"
        flag = true;
      }else
      if(this.Strength > 10){
        StrengthInput.value = "10"
        this.Strength = 10
        error += "Strength must be a value between 1-10!\n"
        flag = true;
      }
      if(flag){
        alert(error);
        return false;
      }
      return true;
  }
}

