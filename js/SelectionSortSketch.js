var numArray = [];
var resetArray = [];

var rectY;
var widthOfRect;
var index = 0;
var sortReady = false;
var canvasWidth = 1024;
var canvasHeight = 480;
var arraySize = 100;

var bubbleSwapped = false;
var bubbleIterationNeeded = false;
var bubbleSortIterations = 1;


var stepSortButton = document.getElementById("stepSortButton");
stepSortButton.addEventListener("click", stepSort);

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

sortType = "SELECTION";

function setup() {
    frameRate(fps);
    let canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent('canvasContainer');
    widthOfRect = (canvas.width/numArray.length);
    rectY = canvas.height;
    arraySizeSliderChange()
}

async function draw() { 
    // Bubble Sort Controller
    if(sortType == "BUBBLE" && sortReady == true)
        {
            visualizeArray(numArray);
            bubbleSwapped = BubbleSort(index);
            if(bubbleSwapped)
            {
                bubbleIterationNeeded = true;
            }
            index+=1;

            if(index > numArray.length-bubbleSortIterations)
            {
                if(bubbleIterationNeeded)
                {
                    index = 0;
                    bubbleSortIterations += 1;
                    bubbleSortIterations = false;
                }else
                {
                    console.log("solved");
                    index = 0;
                    bubbleSortIterations = 1;
                    sortReady = false;
                }
            }
        }
        // Selection Sort Controller
    else if(sortType == "SELECTION" && index < numArray.length && sortReady == true)
        {
            visualizeArray(numArray);
            SelectionSort(index);
            index+=1;
        }else
        { 
            sortReady = false; 
        }
}

function generateArraySetup()
{
    index = 0;
    generateArray();
    widthOfRect = (canvas.width/numArray.length);
    visualizeArray(numArray);
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
    if(index >= numArray.length)
    {
        resetSort();
    }
    sortReady = true;
}

function stepSort()
{
    visualizeArray(numArray);
    if(index < numArray.length-1)
    {
        SelectionSort(numArray,index);
        index+=1;
    }
}

function resetSort()
{
    numArray = resetArray.slice();
    index = 0;
    bubbleSortIterations = 1;
    visualizeArray(numArray);
}

function visualizeArray(array){
    background("#839496"); 
    for(var i =0; i< array.length; i++)
    {
        fill("#268bd2");
        rect(i*widthOfRect,rectY,widthOfRect,-array[i]);     
    }
}

function SelectionSort(startIndex)
{   
    // Highlight the rectangle at the startIndex
    fill("#cb4b16");
    rect(startIndex*widthOfRect,rectY,widthOfRect,-numArray[startIndex]); 
    var lowestNum = numArray[startIndex];
    var indexOfLowest = startIndex;
    for(var i = startIndex; i< numArray.length; i++)
    {
        if(numArray[i] < lowestNum)
        {
            lowestNum = numArray[i];
            indexOfLowest = i;
        }
    }

    // Highlight the rectangle that is the smallest
    fill("#b58900");
    rect(indexOfLowest*widthOfRect,rectY,widthOfRect,-numArray[indexOfLowest]); 
    numArray[indexOfLowest] = numArray[startIndex];
    numArray[startIndex] = lowestNum;
}

function BubbleSort(startIndex)
{
    var lowest;
    // Highlight the rectangle at the startIndex
    fill("#cb4b16");
    rect(startIndex*widthOfRect,rectY,widthOfRect,-numArray[startIndex]);
    if(numArray[startIndex] > numArray[startIndex+1])
    {
        // Highlight the rectangle that is compared
        fill("#b58900");
        rect((startIndex+1)*widthOfRect,rectY,widthOfRect,-numArray[startIndex+1]);
        lowest = numArray[startIndex+1];
        numArray[startIndex+1] = numArray[startIndex];
        numArray[startIndex] = lowest;
        return true;
    }else
    {
        return false;
    }
    
}

