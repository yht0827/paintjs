const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const reset = document.getElementById("jsReset");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle=INITIAL_COLOR; 
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let Cpainting = "#2c2c2c";

function stopPainting(event) {
    painting=false;
}

function startPainting(event) {
    painting = true;
}

function onMouseMove(event) {

    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle= color;
    ctx.fillStyle=color;
    Cpainting=color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size; 
}

function handleModeClick(){
    if(filling === true){
        filling=false;
        mode.innerText="FILL";
    }else{
        filling=true;
        mode.innerText="PAINT";
    }
}

function handleCanvasClick(event) {
    if(filling === true){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }

}
function handleCM(event) {
    event.preventDefault();
}
function handleSaveClick(event) {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href= image;
    link.download = "PaintJS[🎨]";
    link.click();
}

function handleReset(event) {
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    ctx.strokeStyle= Cpainting;
    ctx.fillStyle= Cpainting;
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

if(reset){
    reset.addEventListener("click",handleReset);
}

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click",handleColorClick)
);// colors 배열 요소들 이벤트처리