import React from 'react'
import { gql } from '@apollo/client';
import { client } from '../index.js'
import { LandingContainer } from '../styles/Landing.js';
const GET_CATEGORIES = gql`
  query {
     categories{    
      name,
         products{id, name, description, brand}
      }
  }
`;




class Landing extends React.Component {


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
            <LandingContainer>
                <h2>
                    Category Name
                </h2>
            </LandingContainer>
        );
    }
};


export default Landing
