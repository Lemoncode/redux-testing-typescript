import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import {Header} from '../common/components/header';
import {ContainerSpinnerComponent as Spinner} from '../common/components/spinner';
import reducers from '../reducers';


interface Props extends React.Props<App> {
}


let store = createStore(
  reducers
  ,applyMiddleware(reduxThunk)
);


export default class App extends React.Component<Props, {}> {
   public render() {
       return (
            <Provider store={store}>
              <div className="container-fluid">
                <Spinner/>
                <Header/>
                  {this.props.children}
              </div>
            </Provider>
       );
  }
}
