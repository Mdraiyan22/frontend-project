const display=document.getElementById("display");

function Display(input){
    display.value +=input;
}
function appendToClear(){
    display.value="";
}
function calculate(){
    display.value=eval(display.value);
}
function deleteItem(){
    display.value=display.value.slice(0,-1);
}

