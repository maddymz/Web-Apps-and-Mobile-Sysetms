/**
 * @method convertWeight()
 * @param {*} input 
 * @param {*} inunit 
 * @param {*} outunit 
 * This function converts input weight to target metric system (in this case only miligram)
 */
function convertWeight(input, inunit, outunit){
    expression = inunit + "to" + outunit
    console.log(expression)
    switch(expression){
        case "metricTonetomiligrm":
            output = input * (1e+9)
            console.log(output)
            break;
        case "kgtomiligrm":
            output = input * (1e+6)
            console.log(output)
            break;
        case "grmtomiligrm":
            output = input * (1e+3)
            console.log(output)
            break;
        case "miligrmtomiligrm":
            output = input
            console.log(output)
            break;
        case "micorgrmtomiligrm":
            output = input * (1e-3)
            console.log(output)
            break;
        case "impTontomiligrm":
            output = input * (1.016e+9)
            console.log(output)
            break;
        case "usTontomiligrm":
            output = input * (9.072e+8)
            console.log(output)
            break;
        case "stonetomiligrm":
            output = input * (6.35e+6)
            console.log(output)
        case "poundtomiligrm":
            output = input * (453592.37)
            console.log(output)
            break;
        case "ouncetomiligrm":  
            output = input * (28349.523)
            console.log(output)
            break;
    }

    return output;
}


/**
 * This function is invoked on click of the convert button
 * calls @method convertWeight()
 */
function convert(){
    var inputWeight = document.getElementById("inputWeight");
    var inUnit = document.getElementById("inputOpMenu");
    var inputUnitVal = inUnit.options[inUnit.selectedIndex].value;
    var outUnit = document.getElementById("outputOpMenu");
    var outputUnitVal = outUnit.options[outUnit.selectedIndex].value;
    var outputWeight = convertWeight(inputWeight.value, inputUnitVal, outputUnitVal);
    var output =document.getElementById("output");
    output.innerHTML = outputWeight
}