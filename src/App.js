import React from 'react'
import logo from './logo.svg';
import './App.css';
import { gql } from '@apollo/client';
import { client } from './index.js'
const GET_CATEGORIES = gql`
  query {
     categories{    
      name,
         products{id, name, description, brand}
      }
  }
`;




class App extends React.Component {
  constructor(props) {
    super(props);
  };


  getData = async () => {
    await client.query({
      query: GET_CATEGORIES
    }).then((result) => console.log(result.data.categories));
  }

  componentDidMount() {
    this.getData()
  }

  render() {
  
    return (
      <div>
        <h1>
          My First React Component!
        </h1>
      </div>
    );
  }
};


export default App
