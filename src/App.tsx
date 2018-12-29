import * as React from 'react';
import Circle from './Circle';

class App extends React.Component<{}> {
  public render() {
    return (
      <div>
        <Circle progress={0.4} />
      </div>
    );
  }
}

export default App;
