var numArray = [];
var resetArray = [];

var rectY;
var widthOfRect;
var index = 0;
var sortReady = false;
var canvasWidth = 1024;
var canvasHeight = 480;
var arraySize = 100;

var bubbleIterations = 1;
var bubbleIterationSwap = false;

var fullSortButton = document.getElementById("fullSortButton");
fullSortButton.addEventListener("click", fullSort);

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetSort);
    
var generateArrayButton = document.getElementById("generateArrayButton");
generateArrayButton.addEventListener("click",generateArraySetup);

var arraySizeSlider = document.getElementById("arraySizeSlider");
arraySizeSlider.addEventListener("change",arraySizeSliderChange);

var frameSlider = document.getElementById("frameSlider");
frameSlider.addEventListener("change",frameSliderChange);
var fps = Number(frameSlider.value);

function setup() {
    frameRate(fps);
    let canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent('canvasContainer');
    widthOfRect = (canvas.width/numArray.length);
    rectY = canvas.height;
    arraySizeSliderChange()
}

async function draw() { 
    if(sortReady == true)
        {
            visualizeArray();
            BubbleSort();
            index+=1;
        }else
        { 
            index = 0;
            bubbleIterations = 1;
            sortReady = false; 
        }
}

function BubbleSort()
{   
    fill("#b58900");
    rect(index*widthOfRect,rectY,widthOfRect,-numArray[index]);   
    if(index > numArray.length - bubbleIterations)
    {
        if(!bubbleIterationSwap)
        {
            bubbleIterations += numArray.length;
            visualizeArray();
            sortReady = false;
        }
        bubbleIterationSwap = false;
        bubbleIterations += 1;
        index = -1;
    }
    if(numArray[index] > numArray[index+1])
    {
        let temp = numArray[index];
        numArray[index] = numArray[index+1];
        numArray[index+1] = temp;
        bubbleIterationSwap = true;
    }
    
}

function generateArraySetup()
{
    sortReady = false;
    resetSort();
    generateArray();
    widthOfRect = (canvas.width/numArray.length);
    visualizeArray();
}

function generateArray()
{
    var newArray = [];
    for(var i = 0; i < arraySize; i++)
    {
        randHeight = Math.floor(Math.random() * canvasHeight); 
        newArray[i] = randHeight;
    }
    numArray = newArray.slice();
    resetArray = newArray.slice();
}

function arraySizeSliderChange()
{
    arraySize = Number(arraySizeSlider.value);
    generateArraySetup();
}

function frameSliderChange()
{
    fps = frameSlider.value;
    frameRate(Number(fps));
}

function fullSort()
{
    resetSort();
    sortReady = true;
}

function resetSort()
{
    sortReady = false;
    bubbleIterationSwap = false;
    bubbleIterations = 1;
    numArray = resetArray.slice();
    index = 0;
    visualizeArray();
}

function visualizeArray(){
    background("#839496"); 
    for(var i =0; i< numArray.length; i++)
    {
        fill("#268bd2");
        rect(i*widthOfRect,rectY,widthOfRect,-numArray[i]);
        
        if(i > numArray.length - bubbleIterations)
        {
            fill("#2aa198");
            rect(i*widthOfRect,rectY,widthOfRect,-numArray[i]);
        }
    }
}


