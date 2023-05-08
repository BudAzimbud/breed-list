import React from 'react';
import {SafeAreaView} from 'react-native';
import BreedsList from './src/screens/BreedList';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <BreedsList />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
