// offcanvas menu 
$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});

var SidebarMenuEffects = (function() {

    function hasParentClass( e, classname ) {
      if(e === document) return false;
      if( classie.has( e, classname ) ) {
          return true;
      }
      return e.parentNode && hasParentClass( e.parentNode, classname );
    }
    
    function mobilecheck() {
      var check = false;
      (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }

    function init() {        
        $(document).ready( function(){
            var $mcontent = $('#pav-mainnav .navbar .navbar-nav');          
            var effect = 3;      
            var $offcmenu = $('<nav id="menu-offcanvas" class="offcanvas-menu offcanvas-effect-'+effect+' hidden-lg hidden-md"><div class="menu-offcanvas-inner"></div></nav>');
            $(".menu-offcanvas-inner", $offcmenu ).append( $mcontent.clone() );
            $("body").append( $offcmenu ); 
            $(".navbar-nav", $offcmenu  ).removeClass("navbar-nav").removeClass("nav").addClass("menu-offcanvas-content");
      $(".menu-offcanvas-inner").append("<div class='button-close-menu'><i class='fa fa-times-circle-o'></i></div>");
      
      var $btn = $("#pav-mainnav .navbar-toggle, .menu-offcanvas-inner .button-close-menu");
     
             var eventtype = mobilecheck() ? 'touchstart' : 'click';  
                $($btn).bind( eventtype, function(e){  
                $("#offcanvas-container").toggleClass(  "offcanvas-menu-open" ).addClass( "offcanvas-effect-"+effect );
                                
                $("#page").bind( eventtype , function (){
                    $("#offcanvas-container").toggleClass(  "offcanvas-menu-open" );
                    $("#page").unbind( eventtype );
                } ); 
                e.stopPropagation();       
               return false;
            } );
        } );    
    }
    init();
})();

/* Offcanvas Sidebars */
$(document).ready( function (){  
    if( $("#columns").hasClass("offcanvas-siderbars") ) { 
        $('.offcanvas-sidebars-buttons button').hide();
        $( ".sidebar" ).parent().parent().find("section").addClass("main-column");
        $( ".sidebar" ).each( function(){ 
            $('[data-for="'+$(this).attr("id")+'"]').show();
            $(this).parent().attr("id","oc-"+$(this).attr("id") ).addClass("offcanvas-sidebar");
        } );
        $(".offcanvas-sidebars-buttons button").bind( "click", function(){
            if( $(this).data("for") == "column-right" ){
                 $(".offcanvas-siderbars").removeClass("column-left-active");
            }else {
                 $(".offcanvas-siderbars").removeClass("column-right-active");
            }
            $(".offcanvas-siderbars").toggleClass( $(this).data("for")+"-active" );
            $("#oc-"+$(this).data("for") ).toggleClass("canvas-show");
        } );
     }   
} );

$(document).ready(function() {
	// $('.product-zoom').magnificPopup({
	// 	  type: 'image',
 //          closeOnContentClick: true,
 
 //          image: {
 //            verticalFit: true
 //          }
	// });

	// $('.iframe-link').magnificPopup({type:'iframe'});
});


$(document).ready(function(){
    // Currency
    $('.currency .currency-select').on('click', function(e) {
      e.preventDefault();

      $('.currency input[name=\'code\']').attr('value', $(this).attr('data-name'));

      $('.currency').submit();
    });

    // Language
    $('.language a').on('click', function(e) {
      e.preventDefault();

      $('.language input[name=\'code\']').attr('value', $(this).attr('href'));

      $('.language').submit();
    });

    $('.dropdown-menu input').click(function(e) {
        e.stopPropagation();
    });

    // grid list switcher
    $("button.btn-switch").bind("click", function(e){
        e.preventDefault();
        var theid = $(this).attr("id");
        var row = $("#products");

        if($(this).hasClass("active")) {
            return false;
        } else {
            if(theid == "list-view"){
                $('#list-view').addClass("active");
                $('#grid-view').removeClass("active");

                // remove class list
                row.removeClass('product-grid');
                // add class gird
                row.addClass('product-list');
                
            }else if(theid =="grid-view"){
                $('#grid-view').addClass("active");
                $('#list-view').removeClass("active");
                // remove class list
                row.removeClass('product-list');
                // add class gird
                row.addClass('product-grid');
            }
        }
    });

    // +/- quantity product detail
    $(".quantity-adder .add-action").click( function(){
        if( $(this).hasClass('add-up') ) {  
            $("[name=quantity]",'.quantity-adder').val( parseInt($("[name=quantity]",'.quantity-adder').val()) + 1 );
        }else {
        if( parseInt($("[name=quantity]",'.quantity-adder').val())  > 1 ) {
            $("input",'.quantity-adder').val( parseInt($("[name=quantity]",'.quantity-adder').val()) - 1 );
        }
        }
    });

    // scroll-to-top button show and hide
    jQuery(document).ready(function(){
        jQuery(window).scroll(function(){
            if (jQuery(this).scrollTop() > 100) {
                jQuery('.scrollup').fadeIn();
            } else {
                jQuery('.scrollup').fadeOut();
        }
    });
    // scroll-to-top animate
    jQuery('.scrollup').click(function(){
        jQuery("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
    });

    // $('.popup-with-form').magnificPopup({
    //       type: 'inline',
    //       preloader: false,
    //       focus: '#input-name',

    //       // When elemened is focused, some mobile browsers in some cases zoom in
    //       // It looks not nice, so we disable it:
    //       callbacks: {
    //         beforeOpen: function() {
    //           if($(window).width() < 700) {
    //             this.st.focus = false;
    //           } else {
    //             this.st.focus = '#input-name';
    //           }
    //         }
    //       }
    // });
    
});

// Cart add remove functions
var cart = {
  'addcart': function(product_id, quantity) {
    $.ajax({
      url: 'index.php?route=checkout/cart/add',
      type: 'post',
      data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
      dataType: 'json',
      success: function(json) {
        $('.alert, .text-danger').remove();

        if (json['redirect']) {
          location = json['redirect'];
        }

        if (json['success']) {
          $('#notification').html('<div class="alert alert-success">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

          $('#cart-total').html(json['total']);

          $('html, body').animate({ scrollTop: 0 }, 'slow');

          $('#cart > ul').load('index.php?route=common/cart/info ul li');
        }
      }
    });
  },
  'update': function(key, quantity) {
    $.ajax({
      url: 'index.php?route=checkout/cart/edit',
      type: 'post',
      data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
      dataType: 'json',
      beforeSend: function() {
        $('#cart > button').button('loading');
      },
      success: function(json) {
        $('#cart > button').button('reset');

        $('#cart-total').html(json['total']);

        if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
          location = 'index.php?route=checkout/cart';
        } else {
          $('#cart > ul').load('index.php?route=common/cart/info ul li');
        }
      }
    });
  },
  'remove': function(key) {
    $.ajax({
      url: 'index.php?route=checkout/cart/remove',
      type: 'post',
      data: 'key=' + key,
      dataType: 'json',
      beforeSend: function() {
        $('#cart > button').button('loading');
      },
      success: function(json) {
        $('#cart > button').button('reset');

        $('#cart-total').html(json['total']);

        if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
          location = 'index.php?route=checkout/cart';
        } else {
          $('#cart > ul').load('index.php?route=common/cart/info ul li');
        }
      }
    });
  }
}

var wishlist = {
  'addwishlist': function(product_id) {
    $.ajax({
      url: 'index.php?route=account/wishlist/add',
      type: 'post',
      data: 'product_id=' + product_id,
      dataType: 'json',
      success: function(json) {
        $('.alert').remove();

        if (json['success']) {
          $('#notification').html('<div class="alert alert-success">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
        }

        if (json['info']) {
          $('#notification').html('<div class="alert alert-info"><i class="fa fa-info-circle"></i> ' + json['info'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
        }

        $('#wishlist-total').html(json['total']);

        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }
    });
  },
  'remove': function() {

  }
}

var compare = {
  'addcompare': function(product_id) {
    $.ajax({
      url: 'index.php?route=product/compare/add',
      type: 'post',
      data: 'product_id=' + product_id,
      dataType: 'json',
      success: function(json) {
        $('.alert').remove();

        if (json['success']) {
          $('#notification').html('<div class="alert alert-success"></i> ' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

          $('#compare-total').html(json['total']);

          $('html, body').animate({ scrollTop: 0 }, 'slow');
        }
      }
    });
  },
  'remove': function() {

  }
}


$(window).ready( function(){

  /* Search */
  $('#pav-mainnav input[name=\'search\']').parent().find('span').on('click', function() {
    url = $('base').attr('href') + 'index.php?route=product/search';

    var value = $('#pav-mainnav input[name=\'search\']').val();

    if (value) {
      url += '&search=' + encodeURIComponent(value);
    }

    location = url;
  });

  $('#pav-mainnav input[name=\'search\']').on('keydown', function(e) {
    if (e.keyCode == 13) {
      $('header input[name=\'search\']').parent().find('span').trigger('click');
    }
  });

  $('#search_mobile .button-search').bind('click', function() {
    url = $('base').attr('href') + 'index.php?route=product/search';
    var search = $('#search_mobile input[name=\'search\']').attr('value');
    if (search) {
        url += '&search=' + encodeURIComponent(search);
    }
    location = url;
  }); 
  $('#search_mobile input[name=\'search\']').bind('keydown', function(e) {
    if (e.keyCode == 13) {
        url = $('base').attr('href') + 'index.php?route=product/search';             
        var search = $('#search_mobile input[name=\'search\']').attr('value');         
        if (search) {
            url += '&search=' + encodeURIComponent(search);
        }           
        location = url;
    }
  });

  // Fix First Click Menu 
  $(document.body).on('click', '.megamenu [data-toggle="dropdown"], .verticalmenu [data-toggle="dropdown"]' ,function(){
      if(!$(this).parent().hasClass('open') && this.href && this.href != '#'){
          window.location.href = this.href;
      }

  });

} );