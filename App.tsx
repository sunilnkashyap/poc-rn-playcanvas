/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View, Text} from 'react-native';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Select,
  SelectItem,
  Layout,
  ButtonGroup,
  Button,
  IndexPath,
} from '@ui-kitten/components';

const App = () => {
  let webview: any = null;
  const models = [
    'Andri',
    'Bjartur',
    'Charlie',
    'Gudjon',
    'Gummi',
    'Gunnar',
    'Karitas',
    'Paresh',
    'Raggi',
    'Signy',
    'Tori',
    'Villi',
  ];

  const [playCanvasInit, setPlayCanvasInit] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = models[selectedIndex.row];

  useEffect(() => {
    if (playCanvasInit === true) {
      console.log('model changed');
      webview.postMessage(
        JSON.stringify({type: 'changeModel', message: displayValue}),
      );
    }
  }, [displayValue]);

  const initPlayCanvas = () => {
    console.log('in init play canvas');
    setPlayCanvasInit(true);
    webview.postMessage(JSON.stringify({type: 'init'}));
  };

  const changePlayCanvasAnimation = (message: string) => {
    webview.postMessage(JSON.stringify({type: 'animation', message}));
  };

  const renderOption = (title: any, index: any) => (
    <SelectItem key={index} title={title} />
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.view}>
        <Layout style={styles.selectView} level="1">
          <Select
            placeholder="Select Model"
            value={displayValue}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}>
            {models.map(renderOption)}
          </Select>
        </Layout>

        <View style={styles.buttonView}>
          <ButtonGroup style={styles.buttonGroup} appearance="outline">
            <Button
              disabled={playCanvasInit}
              onPress={() => {
                initPlayCanvas();
              }}>
              Init
            </Button>
            <Button
              onPress={() => {
                changePlayCanvasAnimation('idle');
              }}>
              Idle
            </Button>
            <Button
              onPress={() => {
                changePlayCanvasAnimation('dance');
              }}>
              Dance
            </Button>
            <Button
              onPress={() => {
                changePlayCanvasAnimation('run');
              }}>
              Run
            </Button>
          </ButtonGroup>
        </View>
        <WebView
          style={styles.webView}
          originWhitelist={['*']}
          source={{
            uri: 'https://playcanvas-poc.web.app',
          }}
          // injectedJavaScript={js}
          startInLoadingState
          javaScriptEnabled={true}
          onMessage={(event) => {
            console.log('MESSAGE >>>>', event.nativeEvent.data);
          }}
          ref={(ref) => (webview = ref)}
        />
        <Text>End</Text>
      </View>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  selectView: {
    margin: 40,
    zIndex: 999,
  },
  buttonView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  buttonGroup: {
    margin: 2,
  },
  webView: {},
});

export default App;
