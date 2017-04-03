jQuery( document ).ready( function( $ ) {
  var wh = document.documentElement.clientHeight
  var ww = document.documentElement.clientWidth
  // Your JavaScript goes here
  $(document).foundation()

  $('[rel="fullscreen"]').css('height', wh)

  window.addEventListener('resize',  function(){
    wh = document.documentElement.clientHeight
    ww = document.documentElement.clientWidth
    if ( ww > 768 ) {
      $('[rel="fullscreen"]').css('height', wh)
    }
  })

  window.addEventListener('orientationchange', function(){
     wh = document.documentElement.clientHeight
     ww = document.documentElement.clientWidth
     $('[rel="fullscreen"]').css('height', wh)
  });

  if ( $('#wavyCanvas').length ){ wavyCanvas(); }

  $('.slider').slick({
    arrows: true,
    dots: true
  })

  $('.hero video').addClass('grow');

  // mute button
  var video = $('video')[0];
  var $muteButton = $('.mute');
  var $icon = $muteButton.find('i.fa');

  $muteButton.on('click', function(e){
    e.preventDefault()

    var isMuted = video.muted

    if ( isMuted === false ){
      video.muted = true
      $icon.removeClass('fa-volume-up').addClass('fa-volume-off')
    } else {
      video.muted = false
      $icon.removeClass('fa-volume-off').addClass('fa-volume-up')
    }
  })
});


var wavyCanvas = function(){
  let self = this
  let img = new Image();
  let imgsrc = document.getElementById('flagsrc')
  img.onload = waves;
  img.src = imgsrc.dataset.src;

  function waves() {

    let canvas = document.getElementById('wavyCanvas')

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext("2d"),
      w = canvas.width,
      h = canvas.height;

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this, 0, 0);

    let o1 = new Osc(0.05),
      o2 = new Osc(0.03),
      o3 = new Osc(0.06),
      x0 = 0,
      x1 = w * 0.25,
      x2 = w * 0.5,
      x3 = w * 0.75,
      x4 = w;

    let consoleDiv = document.getElementById('console');
    (function loop() {
      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < h; y++) {

        // segment positions
        let lx1 = x1 + o1.current(y * 0.8) * 1; // scaled to enhance demo effect
        let lx2 = x2 + o2.current(y * 0.8) * 1;
        let lx3 = x3 + o3.current(y * 0.8) * 1;

        // segment widths
        let w0 = w - (lx1);
        let w1 = w - (lx2 - lx1);
        let w2 = w - (lx3 - lx2);
        let w3 = w - (x4 - lx3);

        consoleDiv.innerHTML = Math.ceil(w1) + ' ' + Math.ceil(w2) + ' ' + Math.ceil(w3);
        let hscale = 1
        // let image = x,
        //     sx = x,
        //     sy = x,
        //     sWidth = x,
        //     sHeight = x,
        //     dx = x,
        //     dy = x,
        //     dWidth = x,
        //     dHeight = 1
        // drawimage lines  ---- source ----              --- destination ---
        // drawImage(image, sx,   sy, sWidth,   sHeight,  dx,           dy, dWidth, dHeight)
        // drawImage(image,       sx,   sy, sWidth,   sHeight,  dx,           dy, dWidth, dHeight)
        // ctx.drawImage(img,  x0,   y,  x1,       1,        0,            y,  w0,     hscale);
        // ctx.drawImage(img,  x1,   y,  x2 - x1,  1,        lx1 - 0.5,    y,  w1,     hscale);
        // ctx.drawImage(img,  x2,   y,  x3 - x2,  1,        lx2 - 1,      y,  w2,     hscale);
        // ctx.drawImage(img,  x3,   y,  x4 - x3,  1,        lx3 - 1.5,    y,  w3,     hscale);
      }
      // requestAnimationFrame(loop);
    })();

    // function pixelate(v) {
    //
    //     // if in play mode use that value, else use slider value
    //     var size = 0.1
    //
    //         // cache scaled width and height
    //         w = canvas.width * size,
    //         h = canvas.height * size;
    //
    //     // draw original image to the scaled size
    //     ctx.drawImage(img, 0, 0, w, h);
    //
    //     // then draw that scaled image thumb back to fill canvas
    //     // As smoothing is off the result will be pixelated
    //     ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    // }
  }

  function Osc(speed) {

    let frame = 0;

    this.current = function(x) {
      frame += 0.002 * speed;
      return Math.sin(frame + x * speed * 10);
    };
  }
}
