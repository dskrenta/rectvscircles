(() => {
  'use strict';

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const canvasBoundingRect = canvas.getBoundingClientRect();
  const frameLength = 2;
  let mouseX = 0;
  let mouseY = 0;

  const dots = [
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

    // draw dots
    for (let i = 0; i < dots.length; i++) {
      drawDot(dots[i]);
    };

    // set animation timeout
    setTimeout(() => {
      window.requestAnimationFrame(moveDot);
    }, 2500);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function moveDot() {
    clearCanvas();

    // Iterate over all the dots.
    for(let i = 0; i < dots.length; i++) {

      if( dots[i].xMove == '+' ) {
        dots[i].x += frameLength;
      } else {
        dots[i].x -= frameLength;
      }
      if( dots[i].yMove == '+' ) {
        dots[i].y += frameLength;
      } else {
        dots[i].y -= frameLength;
      }

      drawDot(dots[i])

      if( (dots[i].x + dots[i].radius) >= canvas.width ) {
        dots[i].xMove = '-';
      }
      if( (dots[i].x - dots[i].radius) <= 0 ) {
        dots[i].xMove = '+';
      }
      if( (dots[i].y + dots[i].radius) >= canvas.height ) {
        dots[i].yMove = '-';
      }
      if( (dots[i].y - dots[i].radius) <= 0 ) {
        dots[i].yMove = '+';
      }
    }

    // Render it again
    window.requestAnimationFrame(moveDot);
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

  function drawDot({
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
