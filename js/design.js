TEEDESIGN = window.TEEDESIGN || {};
var canvas;
TEEDESIGN.General = function() {
  var $hiddenData;
  var init = function() {
    $(document).ready(function() {
      $hiddenData = $('#hiddenData');

      setupCanvas();
      loadBackgroundShirt();
      TEEDESIGN.Text.init();
      TEEDESIGN.Art.init();

      // EVENTS
      /*
       * event: 
       */
       $('[name=rdSide]').on('change', function() {
        storeJsonData();
        loadBackgroundShirt();
        loadJsonData();
      });

      /*
       * event: 
       */
       $('#panelMediaList .media').on('click', function() {
        $('#panelMediaList .media.active').removeClass('active');
        var $me = $(this),
        $hidden = $('#hiddenData');
        $me.addClass('active');
        $hidden.attr('data-front-img', $me.attr('data-front-img'));
        $hidden.attr('data-back-img', $me.attr('data-back-img'));
        loadBackgroundShirt();
      });
     });
  }

  var setupCanvas = function() {
    canvas = new fabric.Canvas('myCanvas');
    canvas.setWidth(250);
    canvas.setHeight(380);
    canvas.on({
      'object:added': function(e) {
        canvas.setActiveObject(canvas.item(0));
      },
      'object:selected': function(e){
        if(TEEDESIGN.Text.isEditMode()) {
          TEEDESIGN.Text.loadSelectedText(e.target);
          TEEDESIGN.Text.enterEditMode();
        }
      },
      'selection:cleared': function() {
        unselect();
        TEEDESIGN.Text.leaveEditMode();
      }
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
    $('.design-area').css('background-image', 'url(' + imgUrl + ')');
  }

  /*
   * method: 
   */
  var addDeleteBtn = function(x, y){
    $(".deleteBtn").remove(); 
    var btnLeft = x-10;
    var btnTop = y-10;
    var deleteBtn = '<img src="https://www.funagain.com/images/old/common/delete-icon.png" class="deleteBtn" style="position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;width:20px;height:20px;"/>';
    $('#myCanvas').append(deleteBtn);
  }

  var unselect = function() {
    TEEDESIGN.Text.resetInputs();
    setTimeout(function() {
      canvas.deactivateAll().renderAll();
    }, 50);
  }

  /*
   * method: remove selected object
   */
  var removeSelectedObject = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      if (confirm('Are you sure?')) {
        canvas.remove(activeObject);
      }
    }
  }

  /*
   * method: store current side's data into JSON
   */
  var storeJsonData = function() {
    var $store = $('#hiddenData'),
    currSide = $('[name="rdSide"]:not(:checked)').val();
    $store.data(currSide, JSON.stringify(canvas));
  }

  /*
   * method: load JSON data that belong to selected side
   */
  var loadJsonData = function() {
    canvas.clear();
    var $store = $('#hiddenData'),
    currSide = $('[name="rdSide"]:checked').val()
    storeData = $store.data(currSide);
    if (storeData == undefined) {
      storeData = '{"objects":[],"background":""}';
    }
    canvas.loadFromJSON(storeData);
    unselect();
    TEEDESIGN.Text.leaveEditMode();
  }

  var exportCanvas = function() {

  }

  return {
    init: init,
    unselect: unselect,
    storeJsonData: storeJsonData,
    loadJsonData: loadJsonData
  }
}();

TEEDESIGN.Text = function() {
  var init = function() {
    $(document).ready(function() {

      /*
       * EVENT: click "Add Text" button to add text into canvas
       */
       $('[data-action=addText]').on('click', function(e) {
        addText();
      });

      /*
       * EVENT: press enter to add text into canvas
       */
       $('[name=text]').on('keypress', function(e) {
        if (e.which == 13) {
          $('[data-action=addText]').click();
        }
      });
       
      /*
       * EVENT: click "Save" button to add text into canvas
       */
       $('[data-action=updateText]').on('click', function(e) {
        updateText();
      });

      /*
       * EVENT: active seleted styling button
       */
       $('[data-event="styling"]').on('click', function() {
        $(this).toggleClass('active');
      });
     });
  }

  /*
   * method: 
   */
   var resetInputs = function() {
    $('[name="text"]').val('').blur();
    $('#inputFontFamily').val(0);
    $('#inputColor').val('#000000');
    $('#text-style .btn.active').removeClass('active');
    // $('#inputFontWeight').val('400');
  }

  /*
   * method: 
   */
   var addText = function() {
    var inputVal = $('[name=text]').val();
    if (inputVal != '') {
      var fontFamily = $('#inputFontFamily').val(),
      fontWeight = $('#text-style-b').hasClass('active') ? 'bold' : 'normal',
      fontStyle = $('#text-style-i').hasClass('active') ? 'italic' : '',
      textDecoration = $('#text-style-u').hasClass('active') ? 'underline' : '',
      color = $('#inputColor').val();
      
      var options = {
        left: 10,
        top: 50,
        fill: color,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontStyle: fontStyle,
        textDecoration: textDecoration
      }
      var objText = new fabric.Text(inputVal, options);
      canvas.add(objText);
      // TEEDESIGN.General.unselect();
    }
  }

  
  /*
   * method: 
   */
  var updateText = function() {
    var inputVal = $('[name=text]').val(),
    selectedObj = canvas.getActiveObject();
    if (isEditMode() && inputVal != '') {
      var fontFamily = $('#inputFontFamily').val(),
      fontWeight = $('#text-style-b').hasClass('active') ? 'bold' : 'normal',
      fontStyle = $('#text-style-i').hasClass('active') ? 'italic' : '',
      textDecoration = $('#text-style-u').hasClass('active') ? 'underline' : '',
      color = $('#inputColor').val();
      
      selectedObj.setText(inputVal);
      selectedObj.setFontFamily(fontFamily);
      selectedObj.setFill(color);
      selectedObj.setFontWeight(fontWeight);
      selectedObj.setFontStyle(fontStyle);
      selectedObj.setTextDecoration(textDecoration);
      canvas.renderAll();
    }
  }


  /*
   * method: load selected text's attribute into control box
   */
  var loadSelectedText = function(selectedObj) {
    console.log('loadSelectedText');
    // Text
    $('[name="text"]').val(selectedObj.getText());
    // Font family
    $('#inputFontFamily').val(selectedObj.getFontFamily());
    // Color
    $('#inputColor').val(selectedObj.getFill());
    // Style: Bold
    if (selectedObj.getFontWeight() == 'bold') {
      $('#text-style-b').addClass('active')
    }
    // Style: Italic
    if (selectedObj.getFontStyle() == 'italic') {
      $('#text-style-i').addClass('active')
    }
    // Style: Underline
    if (selectedObj.getTextDecoration() == 'underline') {
      $('#text-style-u').addClass('active')
    }
  }

  /*
   * method: check wheter a TEXT is selected
   */
  var isEditMode = function() {
    var obj = canvas.getActiveObject(),
    flag = false;
    if (obj != null && obj != undefined) {
      if (obj.get('type') == 'text')
        flag = true;
    }
    return flag;
  }

  var enterEditMode = function() {
    $('[data-action="addText"]').hide();
    $('[data-action="updateText"]').show();
  }

  var leaveEditMode = function() {
    $('[data-action="addText"]').show();
    $('[data-action="updateText"]').hide();
  }

  return {
    init: init,
    resetInputs: resetInputs,
    loadSelectedText: loadSelectedText,
    isEditMode: isEditMode,
    enterEditMode: enterEditMode,
    leaveEditMode: leaveEditMode
  }
}();

TEEDESIGN.Art = function() {
  var init = function() {
    $(document).ready(function() {
      setupImageUploader();

      $('.art-item').on('click', function() {
        $('#modalArtwork').modal('hide');
        var imgUrl = $(this).find('img').attr('src');
        addClipArt(imgUrl);
      });
      /*
       * event: Open file upload dialog
       */
       $('[data-action="openFileDialog"]').on('click', function() {
        $('#imgLoader').click();
      });

     });
  }

  var addClipArt = function(imgUrl) {
    fabric.Image.fromURL(imgUrl, function(oImg) {
      oImg.left = 10;
      oImg.top = 30;
      canvas.add(oImg);
      $('.canvas-container').trigger('object.added');
      canvas.deactivateAll().renderAll();
    });
  }

  /*
   * method: setup event that allow uploading an image from PC
   */
   var setupImageUploader = function() {
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
    init: init
  }
}();

TEEDESIGN.General.init();
