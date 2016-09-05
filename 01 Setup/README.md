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

Let's start by installing the testing libraries / runners:

- **chai:** BDD / TDD assertion framework for node.js and the browser that can be paired with any testing framework.
- **deep-freeze**:To ensure immutability of the reducers.
- **enzyme**: Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.
- **mocha**: Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple.
- **redux-mock-store:** A mock store for testing your redux async action creators and middleware.
- **sinon:** Standalone and test framework agnostic JavaScript test spies, stubs and mocks.
- **karma:** test runner. A simple tool that allows you to execute JavaScript code in multiple real browsers.
- **karma-chai:** chai plugin for karma.
- **karma-chrome-launcher:** chrome browser support plugin for karma.
- **karma-mocha:** mocha plugin for karma.
- **karma-sinon:** sinon plugin for karma.
- **karma-sourcemap-loader:** add source map support to karma (debugging).
- **karma-webpack:** webpack support for karma.

We will do that by running:

```
npm install chai deep-freeze enzyme mocha sinon
redux-mock-store karma karma-chai karma-chrome-launcher
karma-mocha karma-sinon karma-sourcemap-loader karma-webpack
 --save-dev
```

Then we will install the type definitions for some of this libraries:

```
typings install dt~mocha dt~chai dt~deep-freeze
dt~sinon dt~enzyme --global --save
```

Let's create a simple test for a reducer:

Now let's add the karma.conf configuration to run the tests

Let's add  command to our npm to run the tests

Let's run the tests from the command line
