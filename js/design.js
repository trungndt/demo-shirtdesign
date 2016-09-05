TEEDESIGN = window.TEEDESIGN || {};
var canvas;
TEEDESIGN.General = function() {
  var $hiddenData;
  var init = function() {
    $(document).ready(function() {
      $hiddenData = $('#hiddenData');

      setupCanvas();
      loadBackgroundShirt();
      setupImageUploader();
      TEEDESIGN.Text.init();

      // EVENTS
      /*
       * event: Open file upload dialog
       */
      $('[data-action="openFileDialog"]').on('click', function() {
        $('#imgLoader').click();
      });

      /*
       * event: 
       */
      $('[name=rdSide]').on('change', function() {
        loadBackgroundShirt();
      });

      /*
       * event: 
       */
      $('#panelMediaList .media').on('click', function() {
        $('#panelMediaList .media.active').removeClass('active');
        $(this).addClass('active');
      });
    });
  }

  var setupCanvas = function() {
    canvas = new fabric.Canvas('myCanvas');
    canvas.setWidth(220);
    canvas.setHeight(380);
    canvas.on({
      'object:added': function(e) {
        console.log(e);
        console.log(e.target.get('type'));
        canvas.setActiveObject(canvas.item(0));
      }
    });

    $('.canvas-container').contextmenu(function(ev) {
      console.log(123);
      var pointer = canvas.getPointer(ev.originalEvent);
      var objects = canvas.getObjects();
      for (var i = objects.length - 1; i >= 0; i--) {
        if (objects[i].containsPoint(pointer)) {
          canvas.setActiveObject(objects[i]);
          break;
        }
      }

      if (i < 0) {
        canvas.deactivateAll();
      }

      canvas.renderAll();

      ev.preventDefault();
      return false;
    });
    /*canvas.setBackgroundImage('images/tshirt.png', canvas.renderAll.bind(canvas), {
      scaleY: 0.5,
      scaleX: 0.5,
    });*/
  }

  /*
   * method: load background shirt based on which side is chosen
   */
  var loadBackgroundShirt = function() {
    var selectedSide = $('[name=rdSide]:checked').val(), // "front" or "back"
      imgUrl = $hiddenData.attr('data-' + selectedSide + '-img');
    console.log(imgUrl);
    $('.design-area').css('background-image', 'url(' + imgUrl + ')');
  }

  function setupImageUploader() {
    document.getElementById('imgLoader').onchange = function handleImage(e) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function() {
          var image = new fabric.Image(imgObj);
          image.set({
            angle: 0,
            padding: 10,
            cornersize: 10,
            // height: 110,
            // width: 110,
          });
          canvas.centerObject(image);
          canvas.add(image);
          $('.canvas-container').trigger('object.added');
          canvas.renderAll();
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return {
    canvas: canvas,
    init: init
  }
}();

TEEDESIGN.Text = function() {
  var init = function() {
    $(document).ready(function() {

      /*
       * EVENT: press enter to add text into canvas
       */
      $('[name=text]').on('keypress', function(e) {
        var inputVal = $(this).val();
        if (e.which == 13 && inputVal != '') {
          addText(inputVal);
          $(this).val('').blur();
        }
      });

      /*
       * EVENT: active seleted styling button
       */
      $('[data-event="styling"]').on('click', function() {
        var $me = $(this);
        if ($me.hasClass('active')) {
          $me.removeClass('active');
        } else {
          $me.siblings('.active').removeClass('active');
          $me.addClass('active');
        }
      });
    });
  }

  var addText = function(inputVal) {
    var fontFamily = $('#inputFontFamily').val(),
      color = $('#inputColor').val(),
      options = {
        left: 10,
        top: 50,
        fill: color,
        fontFamily: fontFamily
      };
    var $activeStyle = $('#text-style .btn.active');
    if ($activeStyle.length) {
      var val = $activeStyle.attr('data-value');
      switch (val) {
        case 'styleB': break;
        case 'styleI': break;
        case 'styleU': break;
      }
    }
    var objText = new fabric.Text(inputVal, options);
    canvas.add(objText);
  }

  return {
    init: init
  }
}();

function addClipArt() {
  fabric.Image.fromURL('images/clipart/charizard.png', function(oImg) {
    oImg.left = 100;
    oImg.top = 100;
    canvas.add(oImg);
    $('.canvas-container').trigger('object.added');
  });
}

TEEDESIGN.General.init();
