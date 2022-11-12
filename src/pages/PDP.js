import React, { Component } from 'react'
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { client } from '../index.js'

 class PDP extends Component {
    componentDidMount(){
      const { categoryName, product } = this.props.params

    }
  render() {
    return (
      <div>
      
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
  }
};

const mapStateToProps = state => ({
 
})


export const withRouter = (Component) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <Component {...props} params={params} navigate={navigate} />;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PDP))

