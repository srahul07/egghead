import React from 'react';

// With state component creation
class App extends React.Component {
  render(){
    return (
      <div>
        <h1>Hello World</h1>
        <b>Bold</b>
      </div>
    );
    // return React.createElement('h1', null, 'Hello Guys')
  }
}

// State less component creation
//const App = () => <h1>Hello Eggheads</h1>

export default App
