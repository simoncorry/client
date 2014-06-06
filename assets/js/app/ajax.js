$(function() { 
  $('.sidebar_pusher').on('click', '.ajax_load', function(e) {
    e.preventDefault();
  
    // Vars
    var $trigger = $(this);
    var url = $(this).attr('href');
     
    // Kill Sidebar
    $('#content_pusher').removeClass();
    $('.sidebar_pusher').removeClass('pusher_active');
    $('.sidebar_trigger').removeClass('btn_active'); 
    // Load Ajax
    $('.ajax_page').one('webkitTransitionEnd transitionend', function() {
      load_ajax_page(url);
    });
    $('.ajax_page').addClass('remove'); 
    
  });   
});

// Ajax Script
var load_ajax_page = function(url) {
  // Activate loader
  $('.ajax_loader').addClass('active');
  // Run ajax
  $.ajax({
    url:url,
    cache:false,
    success:function(r) {
      // load new html
      $('.ajax_page').html(r);
      // Initiate page animations
      $('.ajax_page').one('webkitTransitionEnd transitionend', function() {
        $('.ajax_loader').removeClass('active');
      });
      // Kill loader
      $('.ajax_page').removeClass('remove');
    }
  });
}