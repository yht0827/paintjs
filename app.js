const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width=500;
canvas.height=500;

ctx.strokeStyle="#2c2c2c"; 
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size; 

}

function handleModeClick() {
    if(filling === true){
        filling=false;
        mode.innerText="FILL";
    }else{
        filling=true;
        mode.innerText="PAINT";
    }
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}

if(range){
    range.addEventListener("input",handleRangeChange);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click",handleColorClick)
);// colors 배열 요소들 이벤트처리