const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const prizes = [
"10 نقاط",
"حظ سعيد",
"50 نقطة",
"جائزة ذهبية",
"5 نقاط",
"حاول مرة أخرى",
"100 نقطة",
"مفاجأة"
];


let angle = 0;
let spinning = false;
let points = 0;


function drawWheel(){

let center = 175;
let radius = 170;

let slice = Math.PI*2 / prizes.length;


for(let i=0;i<prizes.length;i++){

ctx.beginPath();

ctx.moveTo(center,center);

ctx.arc(
center,
center,
radius,
angle+i*slice,
angle+(i+1)*slice
);

ctx.fillStyle =
i%2==0 ? "#00cfff":"#ffcc00";

ctx.fill();


ctx.save();

ctx.translate(center,center);

ctx.rotate(
angle+i*slice+slice/2
);

ctx.fillStyle="black";
ctx.font="15px Arial";

ctx.fillText(
prizes[i],
60,
5
);

ctx.restore();

}

}


drawWheel();


document.getElementById("spin").onclick=function(){


if(spinning)return;

spinning=true;


let spins = Math.random()*3000+3000;

let start=Date.now();


function animate(){

let now=Date.now();

let progress=(now-start)/2000;


angle += 0.3;


ctx.clearRect(0,0,350,350);

drawWheel();


if(progress<1){

requestAnimationFrame(animate);

}else{

spinning=false;


let index=Math.floor(
((angle%(Math.PI*2))/(Math.PI*2))*prizes.length
);


let reward=prizes[index];


document.getElementById("result").innerHTML=
"🎉 حصلت على: "+reward;


if(reward.includes("نقاط")){

let num=parseInt(reward);

points+=num;

document.getElementById("points").innerHTML=points;

}


}

}


animate();


}


console.log("Game loaded");
