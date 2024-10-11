import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ViroARScene, ViroARSceneNavigator, Viro3DObject, ViroText } from 'react-viro';

const MyARScene = ({ selectedModel }) => {
  return (
    <ViroARScene>
      <ViroText text="Tap to place the object" position={[0, 0.1, -2]} />
      
      {/* Load different models based on button press */}
      {selectedModel === 'model1' && (
        <Viro3DObject
          source={require('./90d4862ea1a84b45b63b8a860da94956.glb')}
          position={[0, 0, -2]}
          scale={[0.2, 0.2, 0.2]}
          type="GLTF"
        />
      )}
      {selectedModel === 'model2' && (
        <Viro3DObject
          source={require('./c9c572b946de4f6b9f0fcc7043c23ea0.glb')}
          position={[0, 0, -2]}
          scale={[0.2, 0.2, 0.2]}
          type="GLTF"
        />
      )}
      {selectedModel === 'model3' && (
        <Viro3DObject
          source={require('./model3.gltf')}
          position={[0, 0, -2]}
          scale={[0.2, 0.2, 0.2]}
          type="GLTF"
        />
      )}
    </ViroARScene>
  );
};

const App = () => {
  const [selectedModel, setSelectedModel] = useState('model1'); // default to model1

  const handleModelSwitch = (model) => {
    setSelectedModel(model);
  };

  return (
    <div>
      {/* AR Viewer */}
      <ViroARSceneNavigator
        initialScene={{
          scene: () => <MyARScene selectedModel={selectedModel} />,
        }}
        style={{ flex: 1 }}
      />

      {/* Buttons to switch models */}
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => handleModelSwitch('model1')}>Model 1</button>
        <button style={styles.button} onClick={() => handleModelSwitch('model2')}>Model 2</button>
        <button style={styles.button} onClick={() => handleModelSwitch('model3')}>Model 3</button>
      </div>
    </div>
  );
};

// Button styles
const styles = {
  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
};

ReactDOM.render(<App />, document.getElementById('app'));
