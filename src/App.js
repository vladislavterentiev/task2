import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Planner from './components/Planner';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Planner />
      </div>
    </Provider>
  );
}

export default App;