import * as React from 'react';

interface Props extends React.Props<About> {
}

export default class About extends React.Component<Props, {}> {
   public render() {
       return (
          <div className="row about-page">
            <h1 className="jumbotron">00 Start sample</h1>

            <div className="col-xs-12">
              <h1>
                <small>
                  More information about this sample can be found on this particular project's readme.md
                </small>
              </h1>
            </div>
          </div>
       );
  }
}
