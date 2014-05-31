$(function() {
  // Set running state to false
  var sidebar_running = false;
  // Find pushers
  $('#content_pusher').on(eventtype,'.sidebar_trigger', function() {
    // Check for running state
    if (sidebar_running) {return;}
    sidebar_running = true;
    // Vars
    var $this             = $(this);
    var sidebar_data      = $this.attr("data-trigger");
    var $sidebar_trigger  = $('.sidebar_trigger');
    var $content_pusher   = $('#content_pusher');
    var $sidebar_pusher   = $('.sidebar_pusher');
    var $sidebar_selected = $('#wrapper_site').find("[data-sidebar='" + sidebar_data + "']");  
    // Clear Pushers
    var clear_pushers = function() {
      $content_pusher.removeClass();
      $sidebar_pusher.removeClass('pusher_active');
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
    // Close sidebar via wrapper
    $('#wrapper_site').on(eventtype,'.content_shroud', function() {
      if (sidebar_running) {return;}
      if($sidebar_trigger.hasClass('btn_active')) {
        $content_pusher.removeClass();
        $sidebar_pusher.removeClass('pusher_active');
        $sidebar_trigger.removeClass('btn_active'); 
      }
    });
    // Remove running true
    $content_pusher.one('webkittransitionEnd transitionend', function(e) {
      sidebar_running = false;
    });
  });
});