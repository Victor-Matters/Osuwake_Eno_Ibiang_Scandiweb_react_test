import React from 'react'
import './App.css';
import Header from './components/Header';
import Landing from './pages/Landing';


class App extends React.Component {


  render() {
  
    return (
      <div className='App'>
        <Header />
      <Landing/>
      </div>
    );
  }
};


export default App
