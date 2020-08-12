export const js = `document.body.style.backgroundColor = 'red';
function sendMessage() {
  alert('button clicked');
  window.postMessage('hi from webview')
}
setTimeout(function () {
  document.body.style.backgroundColor = 'blue';

  document.getElementById('btnWV').onclick = function() {
    alert('data send to RN');
    window.ReactNativeWebView.postMessage('hi there')
  }

  function loadPlayCanvas() {
    window.alert('here');
    var canvas = document.getElementById('application-canvas');

    // Start and init Application
    var app = new pc.Application(canvas);
    app.start();
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    // Create camera
    var camera = new pc.Entity();
    camera.addComponent('camera', {clearColor: new pc.Color(0.8, 0.8, 0.8)});
    app.root.addChild(camera);
    camera.setPosition(0, 0, 7);

    // Create cube
    var box = new pc.Entity();
    box.addComponent('model', {type: 'box'});
    app.root.addChild(box);
    box.rotate(10, 15, 0);

    // Create light
    var light = new pc.Entity();
    light.addComponent('light');
    light.rotate(45, 0, 0);
    app.root.addChild(light);
    app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

    // Create cube's material
    var boxMaterial = new pc.PhongMaterial();
    boxMaterial.diffuse.set(0, 0.58, 0.86);
    boxMaterial.update();
    box.model.model.meshInstances[0].material = boxMaterial;
  };
  document.addEventListener("message", function(evt) {

    const evtData = JSON.parse(evt.data);

    var node = document.createElement("DIV");
    var textNode = document.createTextNode(evt.data);
    node.appendChild(textNode);
    document.getElementById("contentDiv").appendChild(node);  

    document.getElementById('contentDiv').append
    window.ReactNativeWebView.postMessage(evt.data);
    alert(evtData.type);
    //loadPlayCanvas();
  });
}, 2000);
true;
`;
