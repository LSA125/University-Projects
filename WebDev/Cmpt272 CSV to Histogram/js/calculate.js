//these comments are mainly for me because i forget what everything does after an hour

//lowerBounds assignment modified from: https://stackoverflow.com/questions/34349403/convert-table-to-array-in-javascript-without-using-jquery
var lowerBounds = Array.prototype.map.call(document.querySelectorAll('#lowerBounds tr'),function(tr){
    return parseFloat(tr.querySelector("input").value);
})
var percentages = [];
var inputs = document.querySelectorAll("#lowerBounds input");
var updateHistogram = function(){
    //validate inputs:
    for(let i = 0; i < inputs.length-1;++i){
        for (let i = 0; i < inputs.length - 1; ++i) {
            const currentValue = parseFloat(inputs[i].value);
            const nextValue = parseFloat(inputs[i + 1].value);
            
            if (currentValue <= nextValue) {
                // If invalid adjust to be slightly under
                inputs[i + 1].value = (currentValue - 0.01).toFixed(2);
            }
        }
    }
    //set all elements to 2 decimal places
    for(let i = 0; i < inputs.length-1;++i){
        inputs[i].value = parseFloat(inputs[i].value).toFixed(2);
    }
    if(percentages.length > 0){
        //fill histogram with 0's
        let histogram = new Array(lowerBounds.length).fill('');
        //Turn inputs into array
        lowerBounds = Array.prototype.map.call(document.querySelectorAll('#lowerBounds tr'),function(tr){
            return parseFloat(tr.querySelector("input").value);
        })
        //make histogram
        for(let i = 0; i < percentages.length; ++i){
            for(let j = 0; j < lowerBounds.length; ++j){
                if(percentages[i] >= lowerBounds[j]){
                    histogram[j] += 'O';
                    break;
                }
            }
        }
        //load histogram
        const histogramElements = document.querySelectorAll('.histogramData');
        for(let i = 1; i < histogram.length;++i){ //starts at 1 to skip anyone over the max
            histogramElements[i-1].innerHTML = histogram[i];
        }
    }
}
//make all inputs respond to a change
for(let i = 0; i < inputs.length;++i){
    inputs[i].addEventListener('change',updateHistogram);
}


//superSecretID belongs to the input file button, whenever it is changed this function is called
document.getElementById('superSecretID').addEventListener('change',(event) => { 
    let lowest = {Name: "", Percentage: lowerBounds[0] + 1};
    let highest = {Name: "", Percentage: lowerBounds[lowerBounds.length - 1] - 1};
    percentages = []

    //idk what this does but the TA said to put it in
    console.log(event);
    document.getElementById('superSecretID').textContent = event.target.result;
    var validFile = true;
    //grab the csv file from the event
    const fIn = event.target.files[0];
    //if the file is valid
    if(fIn){
        const reader = new FileReader();
        //when the reader finishes loading, run this function
        //the function loads all percentages as floats, with the name of the highest & lowest percentage
        reader.onload = (event) => {
            //grab the string from the csv file
            const fString = event.target.result;
            //split the file into all the separate lines
            const lines = fString.split('\n');
            for(let i = 1; i < lines.length; ++i){ // for every line except the header line

                //parse through data
                const columns = lines[i].split(','); 
                const name = columns[0].trim();
                const percentage = parseFloat(columns[1].trim());
                if(percentage){ // add percentage and check if its the highest or lowest
                    percentages.push(percentage);
                    if(percentage > highest.Percentage){
                        highest.Percentage = percentage;
                        highest.Name = name;
                    }
                    if(percentage < lowest.Percentage){
                        lowest.Percentage = percentage;
                        lowest.Name = name;
                    }
                }
            }
            updateHistogram();
            document.getElementById("highest").innerHTML = highest.Name + " (" + Number(Math.round(highest.Percentage+'e2')+'e-2') + "%)";
            document.getElementById("lowest").innerHTML = lowest.Name + " (" + Number(Math.round(lowest.Percentage+'e2')+'e-2') + "%)";
            //from https://www.logilax.com/javascript-calculate-average/
            document.getElementById("mean").innerHTML = Number(Math.round(percentages.reduce((prev,cur) => prev + cur,0)/percentages.length + 'e2')+'e-2') + "%";
            //from https://stackoverflow.com/questions/45309447/calculating-median-javascript
            percentages = [...percentages].sort((a, b) => a - b)
            const half = Math.floor(percentages.length/2);
            document.getElementById("median").innerHTML 
                = Number(Math.round((percentages.length % 2 ? percentages[half] : (percentages[half-1] + percentages[half])/2) + 'e2')+'e-2'); + "%";
        }
        reader.readAsText(fIn);
    }
});
