var canvas;

function setupCanvas() {
  canvas = new fabric.Canvas('myCanvas');
  canvas.setBackgroundImage('images/tshirt.png', canvas.renderAll.bind(canvas), {

    scaleY: 0.5,
    scaleX: 0.5,

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
}

function addClipArt() {
  fabric.Image.fromURL('images/clipart/charizard.png', function(oImg) {
    oImg.left = 100;
    oImg.top = 100;
    canvas.add(oImg);
  });
}

function uploadImage() {
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
          height: 110,
          width: 110,
        });
        canvas.centerObject(image);
        canvas.add(image);
        canvas.renderAll();
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }
}

function addText() {
  var str = document.getElementById('txt').value;
  if (str != '') {
    var text = new fabric.Text(str, {
      left: 150,
      top: 150,
      fontFamily: 'Comic Sans'
    });
    canvas.add(text);
    document.getElementById('txt').value = '';
  }
}

setupCanvas();
uploadImage();
