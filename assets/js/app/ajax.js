var is_home = true;
var hash = false;

// Determine Page and Load
$(function() { 
  $('.sidebar_pusher').on(eventtype, '.ajax_load', function(e) {
  
    // Kill Sidebar
    $('#content_pusher').removeClass();
    $('.sidebar_pusher').removeClass('pusher_active');
    $('.sidebar_trigger').removeClass('btn_active'); 
  
    // Vars
    var $trigger = $(this);
    var url;
    // If on Home Page and Anchor Links
    if(is_home && $trigger.hasClass('with_anchor')) {
      return true;
    }
    // Going Elsewhere
    e.preventDefault();
    if($trigger.hasClass('with_anchor')) {
      // returning to home page
      var url = 'home.html';
      is_home = true;
      hash    = $trigger.attr('href').substring($trigger.attr('href').indexOf("#")+1);
    } else {
      // going to ancillary page
      var url = $(this).attr('href');
      is_home = false;
      removeHash();
    }
    if(Modernizr.csstransitions) {       
      $('.ajax_page').one('webkitTransitionEnd transitionend', function() {
        load_ajax_page(url);
      });
    } else {
      setTimeout(function() {
        load_ajax_page(url);
      }, 300);
    }
    $('.ajax_page').addClass('remove');
  });   
});

// Ajax Script
var load_ajax_page = function(url) {
  // scroll to top
  if(!is_home) window.scrollTo(0,0);
  // Activate loader
  $('.ajax_loader').addClass('active');
  // Run ajax
  $.ajax({
    url:url,
    cache:false,
    success:function(r) {
      // load new html
      $('.ajax_page').html(r);
      
      /* initialize_waypoints(); */
      
      // if there's a hash, scroll to it
      if(hash) {
        location.hash = "#" + hash;
        hash = false;
      }
      // Initiate page animations
      if( Modernizr.csstransitions ) {
        $('.ajax_page').one('webkitTransitionEnd transitionend', function() {
          $('.ajax_loader').removeClass('active');
        });
      } else {
        setTimeout(function() {
          $('.ajax_loader').removeClass('active');
        }, 600);
      }
      // Kill loader
      $('.ajax_page').removeClass('remove');
    }
  });
}

// Remove Hash
function removeHash() { 
  if (typeof(window.history.pushState) == 'function') {
      history.pushState("", document.title, window.location.pathname  + window.location.search);
  }
}