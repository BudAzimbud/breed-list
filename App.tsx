import React from 'react';
import {SafeAreaView} from 'react-native';
import BreedsList from './src/screens/BreedList';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaView style={{backgroundColor: 'white'}}>
          <BreedsList />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
