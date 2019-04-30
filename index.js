(() => {
  'use strict';

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const canvasBoundingRect = canvas.getBoundingClientRect();
  const frameLength = 2;
  let mouseX = 0;
  let mouseY = 0;

  const circles = [
    { x: 100, y: 100, radius: 25, xMove: '+', yMove: '+' },
    { x: 40, y: 200, radius: 25, xMove: '-', yMove: '+' },
    { x: 250, y: 300, radius: 25, xMove: '+', yMove: '-' },
    { x: 150, y: 35, radius: 25, xMove: '-', yMove: '-' }
  ];

  const rect = {
    x: 100,
    y: 100,
    width: 25,
    height: 25
  };

  canvasInit();

  function canvasInit() {
    // set width and height of the canvas to the window dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // draw circles
    for (let i = 0; i < circles.length; i++) {
      drawCircle(circles[i]);
    };

    // set animation timeout
    setTimeout(() => {
      window.requestAnimationFrame(moveCircle);
    }, 2500);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function moveCircle() {
    clearCanvas();

    // Iterate over all the circles.
    for(let i = 0; i < circles.length; i++) {

      if( circles[i].xMove == '+' ) {
        circles[i].x += frameLength;
      } else {
        circles[i].x -= frameLength;
      }
      if( circles[i].yMove == '+' ) {
        circles[i].y += frameLength;
      } else {
        circles[i].y -= frameLength;
      }

      drawCircle(circles[i])

      if( (circles[i].x + circles[i].radius) >= canvas.width ) {
        circles[i].xMove = '-';
      }
      if( (circles[i].x - circles[i].radius) <= 0 ) {
        circles[i].xMove = '+';
      }
      if( (circles[i].y + circles[i].radius) >= canvas.height ) {
        circles[i].yMove = '-';
      }
      if( (circles[i].y - circles[i].radius) <= 0 ) {
        circles[i].yMove = '+';
      }
    }

    // Render it again
    window.requestAnimationFrame(moveCircle);
  }

  function drawRect({
    x,
    y,
    width,
    height
  }) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, width, height);
  }

  function drawCircle({
    x,
    y,
    radius
  }) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#F03C69';
    ctx.fill();
  }

  /*
  canvas.addEventListener('mousemove', e => {
    mouseX = e.clientX - canvasBoundingRect.left;
    mouseY = e.clientY - canvasBoundingRect.top;
    console.log(mouseX, mouseY);
    clearCanvas();
    drawRect({
      x: mouseX,
      y: mouseY,
      width: 25,
      height: 25
    });
  });
  */

  /*
  webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
      return;
    }

    var xprediction = data.x; //these x coordinates are relative to the viewport
    var yprediction = data.y; //these y coordinates are relative to the viewport
    console.log(xprediction, yprediction, elapsedTime); //elapsed time is based on time since begin was called
  }).begin();
  */
})();
