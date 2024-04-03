import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import TaskApp from './TaskApp';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

interface Props {
  // Define props here
}

const App: React.FC<Props> = (
  {
    /* destructure props here */
  },
) => {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={
          <ActivityIndicator
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            color="#55BCF6"
            size={40}
          />
        }>
        <TaskApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
