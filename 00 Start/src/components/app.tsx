import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import Header from '../common/components/header'
/*
import reducers from '../reducers';
import Spinner from './common/spinner';
*/

interface Props extends React.Props<App> {
}

/*
let store = createStore(
  reducers
  ,applyMiddleware(reduxThunk)
);
*/

export default class App extends React.Component<Props, {}> {
   public render() {
       return (

            <div className="container-fluid">
              <Header/>
                {this.props.children}
              </div>

       );
  }
}
