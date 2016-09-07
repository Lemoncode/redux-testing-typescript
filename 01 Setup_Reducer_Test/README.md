# Sample 01: Setup

In this sample we take as starting point sample: "00 Start" and we will add all the setup needed to support unit testing on this project.

Summary:

- Add all the needed packages.
- Configure karma.
- Create a simple test on a reducer.
- Start our test.

_Note: we have chosen as testing libraries: mocha, chai, sinon. New versions of Jest are gaining momentum, we have planned to
create jest based samples in future samples_


# Steps:

A previous check, do we have all the app packages already installed? Let's ensure that, we will run npm install form the command prompt

```
npm install
```

Let's start by installing the testing libraries / runners:

- **chai:** BDD / TDD assertion framework for node.js and the browser that can be paired with any testing framework.
- **deep-freeze**:To ensure immutability of the reducers.
- **enzyme**: Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.
- **mocha**: Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple.
- **redux-mock-store:** A mock store for testing your redux async action creators and middleware.
- **sinon:** Standalone and test framework agnostic JavaScript test spies, stubs and mocks.
- **json-loader: json loader for webpack.**
- **karma:** test runner. A simple tool that allows you to execute JavaScript code in multiple real browsers.
- **karma-chai:** chai plugin for karma.
- **karma-chrome-launcher:** chrome browser support plugin for karma.
- **karma-mocha:** mocha plugin for karma.
- **karma-sinon:** sinon plugin for karma.
- **karma-sourcemap-loader:** add source map support to karma (debugging).
- **karma-webpack:** webpack support for karma.
- **react-addons-test-utils: makes it easy to test React components in the testing framework of your choice.**

We will do that by running:

```
npm install chai deep-freeze enzyme mocha json-loader sinon
redux-mock-store karma karma-chai karma-chrome-launcher
karma-mocha karma-sinon karma-sourcemap-loader karma-webpack
react-addons-test-utils --save-dev
```

Then we will install the type definitions for some of this libraries:

```
typings install dt~mocha dt~chai dt~deep-freeze
dt~sinon dt~enzyme dt~redux-mock-store --global --save
```

Let's create a simple test for a reducer:

Under reducers let's create a subfolder called "specs" (we think is a good idea to keep specs near the real implementation of what we are testing, it's easier to peer for a developer).

Under this spec folder, let's create a test set for the httpReducer, we will call this file: _httpreducer.spec.ts_:

- The httpReducer: it keeps a counter of http calls that are in progress, whenever an http call is triggered or completed an external agent will trigger an action that will be trapped by this reducer and will increment / decrement the counter.

- What we are going to test:
    - Ensure empty setup (http calls counter is zero).
    - When we launch a request start counter is incremented by one.
    - When we launch a request and then complete counter is set back to zero.
    - Some combined scenarios (two calls request, then two calls completed...)

  The code of this tests:

````javascript
import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from "../../common/actions/actionsEnum";
import { http as httpReducer, HttpState } from '../httpReducer';

describe('httpReducer', () => {

    it('should return new HttpState with default values when passing initialState equals undefined and action equals {}', () => {
        let initialState = undefined;
        let action = {};

        let finalState = httpReducer(initialState, action);

        expect(finalState).not.to.be.undefined;
        expect(finalState.httpCallsInProgress).to.be.false;
        expect(finalState.numberOfCalls).to.be.equal(0);
    });

    it('should return new HttpState with default values when passing initialState equals new HttpState() and action equals {}', () => {
        let initialState = new HttpState();
        let action = {};

        let finalState = httpReducer(initialState, action);

        expect(finalState).not.to.be.undefined;
        expect(finalState.httpCallsInProgress).to.be.false;
        expect(finalState.numberOfCalls).to.be.equal(0);
    });

    it('should return new HttpState with same values when passing initialState with HttpState.httpCallsInProgress equals false '+
        'and action equals {}', () => {
        let initialState = new HttpState();
        initialState.httpCallsInProgress = false;
        let action = {};

        deepFreeze(initialState);
        let finalState = httpReducer(initialState, action);

        expect(finalState.httpCallsInProgress).to.be.false;
    });


    it('should return new HttpState with same values when passing initialState with HttpState.numberOfCalls equals 2 '+
        'and action equals {}', () => {
        let initialState = new HttpState();
        initialState.numberOfCalls = 2;
        let action = {};

        deepFreeze(initialState);
        let finalState = httpReducer(initialState, action);

        expect(finalState.numberOfCalls).to.be.equal(2);
    });

    it('should return new HttpState with numberOfCalls equals 1 and httpCallsInProgress equals true when passing initialState equals new HttpState() '+
        'and action equals { type: "HTTP_GET_CALL_STARTED" }', () => {
        let initialState = new HttpState();
        let action = {
            type: actionsEnums.common.HTTP_GET_CALL_STARTED
        };

        deepFreeze(initialState);
        let finalState = httpReducer(initialState, action);

        expect(finalState.numberOfCalls).to.be.equal(1);
        expect(finalState.httpCallsInProgress).to.be.true;
    });

    it('should return new HttpState with numberOfCalls equals 3 and httpCallsInProgress equals true when passing initialState with '+
        'HttpState.numberOfCalls equals 2 and action equals { type: "HTTP_GET_CALL_STARTED" }', () => {
        let initialState = new HttpState();
        initialState.numberOfCalls = 2;

        let action = {
            type: actionsEnums.common.HTTP_GET_CALL_STARTED
        };

        deepFreeze(initialState);
        let finalState = httpReducer(initialState, action);

        expect(finalState.numberOfCalls).to.be.equal(3);
        expect(finalState.httpCallsInProgress).to.be.true;
    });

    it('should return new HttpState with numberOfCalls equals 0 and httpCallsInProgress equals false when passing initialState equals new HttpState() '+
        'and action equals { type: "HTTP_GET_CALL_COMPLETED" }', () => {
        let initialState = new HttpState();
        let action = {
            type: actionsEnums.common.HTTP_GET_CALL_COMPLETED
        };

        deepFreeze(initialState);
        let finalState = httpReducer(initialState, action);

        expect(finalState.numberOfCalls).to.be.equal(0);
        expect(finalState.httpCallsInProgress).to.be.false;
    });

    it('should return new HttpState with numberOfCalls equals 0 and httpCallsInProgress equals false when passing initialState with '+
        'HttpState equals {numberOfCalls: 1, httpCallsInProgress: true} and action equals { type: "HTTP_GET_CALL_COMPLETED" }', () => {
        let initialState = new HttpState();
        initialState.numberOfCalls = 1;
        initialState.httpCallsInProgress = true;

        let action = {
            type: actionsEnums.common.HTTP_GET_CALL_COMPLETED
        };

        deepFreeze(initialState);
        let finalState = httpReducer(initialState, action);

        expect(finalState.numberOfCalls).to.be.equal(0);
        expect(finalState.httpCallsInProgress).to.be.false;
    });

    it('should return new HttpState with numberOfCalls equals 1 and httpCallsInProgress equals true when passing initialState with '+
        'HttpState equals {numberOfCalls: 2, httpCallsInProgress: true} and action equals { type: "HTTP_GET_CALL_COMPLETED" }', () => {
        let initialState = new HttpState();
        initialState.numberOfCalls = 2;
        initialState.httpCallsInProgress = true;

        let action = {
            type: actionsEnums.common.HTTP_GET_CALL_COMPLETED
        };

        deepFreeze(initialState);
        let finalState = httpReducer(initialState, action);

        expect(finalState.numberOfCalls).to.be.equal(1);
        expect(finalState.httpCallsInProgress).to.be.true;
    });

})
  ````

We are going to do implement a little trick to compile all
specs in the project in a single file and properly generate
maps, let's create under the root folder a subfolder named "test" and create a file called "test_index.js", the file will contain the following code:

````javascript
// require all modules ending in ".spec" from the
// current directory and all subdirectories

var testsContext = require.context("../src", true, /.spec$/);
testsContext.keys().forEach(testsContext);
````

Now let's add the karma.conf configuration to run the tests

In this configuration we:
  - Setup the test frameworks / libraries
we are going to use (mocha, chai, sinon).

  -  Indicate the entry point (test/index.js).

  - Configure karma webpack entry (map, ts loaders...).

  - Configure enzyme for proper component testing (we will use it
    in further samples, component testing).

  -  Setup the port where will run and indicate the browser it will run.

````javascript
var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      './test/test_index.js'
    ],
    exclude: [
    ],
    preprocessors: {
      './test/test_index.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
          loaders: [
              {
                  test: /\.(ts|tsx)$/,
                  exclude: /node_modules/,
                  loader: 'ts-loader'
            },
            //Configuration required by enzyme
            {
                test: /\.json$/,
                loader: 'json'
            }
          ]
      },
      resolve: {
          //Added .json extension required by cheerio (enzyme dependency)
          extensions: ['', '.js', '.ts', '.tsx', '.json']
      },
      //Configuration required by enzyme
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
      }
    },
    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
````

Let's add  command to our npm to run the tests (package.json)

````json
"scripts": {
  //...
  "test": "karma start"
},

````

Let's run the tests from the command line

````
npm test
````
