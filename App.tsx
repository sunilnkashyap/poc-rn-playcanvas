import React from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View, Text} from 'react-native';
// import {JS} from './PlayCanvas/index';
// import * as HTML from './PlayCanvas/index.html';
// const playCanvasHtml = require('./PlayCanvas/index.html');

const App = () => {
  const testScript = `
      document.body.style.backgroundColor = 'red';
      function initCanvas() {
        console.log('init');
      }
      setTimeout(function() {
        window.postMessage("Your message");
        document.body.style.backgroundColor = 'blue';
        document.getElementById('btnInit').onclick = function () {
          window.alert('here');
          var canvas = document.getElementById("application-canvas");

          // Start and init Application
          var app = new pc.Application(canvas);
          app.start();
          app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
          app.setCanvasResolution(pc.RESOLUTION_AUTO);

          // Create camera
          var camera = new pc.Entity();
          camera.addComponent("camera", { clearColor: new pc.Color(0.8, 0.8, 0.8) });
          app.root.addChild(camera);
          camera.setPosition(0, 0, 7); 

          // Create cube
          var box = new pc.Entity();
          box.addComponent("model", { type: "box" });
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
        }
        window.alert('Hello'+pc);
      }, 2000);
      true;
    `;
  return (
    <View style={styles.view}>
      <Text>Sunil Kashyap</Text>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
            <script src='https://end3r.github.io/MDN-Games-3D/PlayCanvas/js/playcanvas-latest.js'></script>
            <button style='font-size:60px' id='btnInit'>Enable PlayCanvas</button>      
            <h1 onclick="this.innerHTML = 'Ooops!'">Click on this text!</h1>
            <canvas id="application-canvas"></canvas>
          `,
        }}
        injectedJavaScript={testScript}
        startInLoadingState
        javaScriptEnabled={true}
        onMessage={(event) => {
          console.log('MESSAGE >>>>' + event.nativeEvent.data);
        }}
      />
      <Text>End</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default App;
