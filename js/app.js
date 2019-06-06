let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
let keep_running = true;
let clock_func;

const showTime = async (date = new Date()) => {

    let hour = date.getHours(); // 0 - 23
    let minute = date.getMinutes(); // 0 - 59
    let second = date.getSeconds(); // 0 - 59
    let session = "AM";

    if (hour == 0) {
        hour = 12;
    }

    if (hour > 12) {
        hour = hour - 12;
        session = "PM";
    }

    hour = (hour < 10) ? "0" + hour : hour;
    minute = (minute < 10) ? "0" + minute : minute;
    second = (second < 10) ? "0" + second : second;

    let time = `${hour}:${minute}:${second}${session}`;
    if (keep_running) {
        document.getElementById("MyClockDisplay").innerText = time;
        setTimeout(() => {
            d.setSeconds(d.getSeconds() + 1)
            showTime(d)
        }, 1000);
    }
}


const bindResetBtnEvent = () => {
    document.getElementById(`reset`).onclick = () => {
        keep_running = false;
        let time = `00:00:00`;
        document.querySelector("#MyClockDisplay").innerText = time;
        let d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setMinutes(0, 0, 0);
        d.setSeconds(0, 0);
        clearInterval(clock_func);
        drawFace(ctx, radius);
        drawNumbers(ctx, radius);
        drawTime(ctx, radius, d);
        clock_func = setInterval(() => {
            d.setSeconds(d.getSeconds() + 1)
            showTime(d)
            keep_running = true;
            drawClockAgain(d);
        }, 1000);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

const bindCurTimeEvent = () => {
    document.getElementById(`curtime`).onclick = () => {
        keep_running = true;
        showTime();
        clearInterval(clock_func)
        clock_func = setInterval(drawClock, 1000);
    }
}


const MyClock = () => {
    ctx.translate(radius, radius);
    radius = radius * 0.90
    clock_func = setInterval(drawClock, 1000);

}
const drawClockAgain = (d) => {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius, d);
}
const drawClock = () => {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

const drawFace = (ctx, radius) => {
    let grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

const drawNumbers = (ctx, radius) => {
    let ang;
    let num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

const drawTime = (ctx, radius, now = new Date()) => {

    //let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

const drawHand = (ctx, pos, length, width) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

const init = () => {
    MyClock();
    bindResetBtnEvent();
    bindCurTimeEvent();
    showTime();
}