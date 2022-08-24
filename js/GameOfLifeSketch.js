var canvasWidth = 800;
var canvasHeight = 800;
var gridWidth = 3;
var cellSize = canvasWidth/gridWidth;

var cells = [];
var simulate = false;

var simulateButton = document.getElementById("simulateButton");
simulateButton.addEventListener("click", function(){simulate = true;});

var stopSimulateButton = document.getElementById("stopSimulateButton");
stopSimulateButton.addEventListener("click", function(){simulate = false;});


class Cell
{
    constructor(posX, posY)
    {
        this.isActive = false;
        this.posX = posX;
        this.posY = posY;
        this.neighborCount = 0;

        // Any live cell with two or three live neighbours survives.
        // Any dead cell with three live neighbours becomes a live cell.
        // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        this.simulateCell =function(){
            if(this.isActive)
            {
                console.log("I have :" + countNeighbors(this.posX/cellSize,this.posY/cellSize) + " neighbors.");
            }
        }
    }  
}

function setup()
{
    noStroke();
    let canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent('canvasContainer');
    
    for(var i = 0; i < (canvasWidth/cellSize); i++ )
    {
        for(var j =0; j < canvasHeight/cellSize; j++)
        {
            cells.push(new Cell(j*cellSize, i*cellSize));
        } 
    }
}

function draw()
{
    console.log(simulate)
    if(simulate)
    {
        simulateLife();
    }
    activateClickedCells();
    background("#839496"); 
    drawCells();
}

function drawCells()
{
    for(var i = 0; i < cells.length; i++ )
    {
        if(cells[i].isActive)
            fill(255);
        else
            fill(50);
        
        if(mouseX > cells[i].posX && mouseX < cells[i].posX+cellSize)
        {
            if(mouseY > cells[i].posY && mouseY < cells[i].posY + cellSize){
                fill(255,255,0);
            }
        }
        rect(cells[i].posX, cells[i].posY , cellSize, cellSize);
        textSize(32);
        fill(255,0,0);
        text(i, cells[i].posX+40, cells[i].posY+40);
        
    }
}

function activateClickedCells()
{
    if(mouseIsPressed){
    for(var i = 0; i < cells.length; i++)
        {
            if(mouseX > cells[i].posX && mouseX < cells[i].posX+cellSize)
            {
                if(mouseY > cells[i].posY && mouseY < cells[i].posY + cellSize){
                    cells[i].isActive = true;
                }
            }
        }
    }
}

function simulateLife()
{
    for(var i = 0; i < cells.length; i++)
    {
        cells[i].simulateCell();
    }
}

function countNeighbors(posX, posY)
{
    var count = 0;

    // Right
    if(posX < gridWidth-1){
        var index = posY*gridWidth + posX+1
        if(cells[index].isActive)
        {
            count +=1;
        }
    }

    // Left
    if(posX > 0){
        var index = posY*gridWidth + posX-1
        if(cells[index].isActive)
        {
            count +=1;
        }
    }

    // Top
    if(posY > 0){
        var index = (posY-1)*gridWidth + posX
        if(cells[index].isActive)
        {
            count +=1;
        }
    }

    // Bottom
    if(posY < gridWidth-1){
        var index = (posY+1)*gridWidth + posX
        if(cells[index].isActive)
        {
            count +=1;
        }
    }

    // Top Left
    if(posY > 0 && posX > 0){
        var index = (posY-1)*gridWidth + (posX-1)
        if(cells[index].isActive)
        {
            count +=1;
        }
    }

    // Top Right
    if(posY > 0 && posX < gridWidth-1){
        var index = (posY-1)*gridWidth + (posX+1)
        if(cells[index].isActive)
        {
            count +=1;
        }
    }

    // Bottom Left
    if(posY < gridWidth-1 && posX > 0){
        var index = (posY+1)*gridWidth + (posX-1)
        if(cells[index].isActive)
        {
            count +=1;
        }
    }

    //Bottom Right 
    if(posY < gridWidth-1 && posX < gridWidth-1){
        var index = (posY+1)*gridWidth + (posX+1)
        if(cells[index].isActive)
        {
            count +=1;
        }
    }

    return count;
}

