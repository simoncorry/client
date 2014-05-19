$(function() {
  // On click find related pushers
  $('#content_pusher').on('click','.sidebar_trigger', function() {
    // Vars
    var $this             = $(this);
    var $sidebar_trigger  = $('.sidebar_trigger');
    var sidebar_data      = $this.attr("data-trigger");
    var $content_pusher   = $('#content_pusher');
    var $sidebar_all      = $('.sidebar_pusher');
    var $sidebar_selected = $('#wrapper_site').find("[data-sidebar='" + sidebar_data + "']");    
    // Clear Pushers
    var clear_pushers = function() {
      $content_pusher.removeClass();
      $sidebar_all.removeClass('pusher_active');
      $this.removeClass('btn_active');
    }    
    // Activate pushers
    var activate_pushers = function() {
      $content_pusher.toggleClass(sidebar_data);
      $sidebar_selected.toggleClass('pusher_active');
      $sidebar_trigger.removeClass('btn_active');
      $this.addClass('btn_active');
    }
    // Check for active states
    if($(this).hasClass('btn_active')) {
      clear_pushers();
    } else {
      clear_pushers();
      activate_pushers();
    }
  });
  // Close sidebar via wrapper
  $('#wrapper_site').on('click','.content_shroud', function() {
    if($('.sidebar_trigger').hasClass('btn_active')) {
    console.log('true');
      $('#content_pusher').removeClass();
      $('.sidebar_pusher').removeClass('pusher_active');
      $('.sidebar_trigger').removeClass('btn_active'); 
    }
  });
});