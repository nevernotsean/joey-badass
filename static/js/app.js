jQuery( document ).ready( function( $ ) {
  var wh = document.documentElement.clientHeight
  // Your JavaScript goes here
  $(document).foundation()

  $('[rel="fullscreen"]').css('height', wh)

  window.addEventListener('orientationchange', function(){
     $('[rel="fullscreen"]').css('height', wh)
  });

});
