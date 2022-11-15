import React from 'react'
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { client } from '../index.js'
import { setFocusedCategoryData, setFocusedProductId, setLoading, setError } from '../redux/slices/dataSlice'
import { setFocusedTab } from '../redux/slices/navSlice'

import { CategoryContainer, ItemsContainer, PLPContainer } from '../styles/PLP.js';
import Card from '../components/Card.jsx';
import Loading from '../components/Loading.jsx';


const GET_CATEGORIES = gql`
  query {
     categories{    
      name
      }
  }
`;


const GET_CATEGORY = (categoryName) => gql`
query  {
  category(input: {title: "${categoryName}"}) {
    name,
    products{
        id, 
        name, 
        inStock, 
        gallery, 
        prices{currency{label, symbol} amount},
    }
  }
}
`;






class PLP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            all_categories: []
        }
    }


    getCategoryByName = async (categoryName) => {
        this.props.setLoading(true)
        this.props.setError('')
        await client.query({
            query: GET_CATEGORY(categoryName)
        }).then((result) => {
            let categoryData = result.data.category
            this.props.setFocusedCategoryData(categoryData)
            this.props.setFocusedTab(categoryName)
            this.props.setLoading(false)
            window.history.replaceState(null, '', categoryData.name)

        }).catch(err => {
            this.props.setError(err?.message)
        })
    }


    getCategories = async (categoryName) => {
        await client.query({
            query: GET_CATEGORIES
        }).then((result) => {
            let all_categories = result.data.categories
            this.setState({ all_categories: all_categories })

            // Here am Checking if the name of the passed route(categoryName) exist in our list of categories from backend
            // If it is not found i will present client with our 0 index category. Which for this test is "all" 

            let categoryExist = false;
            for (let i = 0; i < all_categories.length; i++) {
                if (all_categories[i].name === categoryName) {
                    categoryExist = true;
                }
            }
            if (categoryExist) {
                this.getCategoryByName(categoryName)
            }
            else {
                this.getCategoryByName(all_categories[0].name)

            }
        }
        ).catch(err => {
            this.props.setError(err?.message)
        })
    }

    componentDidMount() {
        const { categoryName } = this.props.params
        this.getCategories(categoryName)

    }



    onProductImageClick(productId) {

        this.markOrUnMarkProductAsSelected(productId, this.props.focusedProductId)

    }

    onProductPriceClick(productId) {

        this.props.setFocusedProductId(productId)
        this.props.navigate(`/${this.props.focusedCategoryData.name}/${productId}`)
    }

    markOrUnMarkProductAsSelected(incommingFocusedProductId, focusedProductId) {
        if (focusedProductId !== incommingFocusedProductId) {
            this.props.setFocusedProductId(incommingFocusedProductId)
        }
        else {
            this.props.setFocusedProductId('')
        }
    }

    render() {

        const selectedCurrency = this.props.selectedCurrency
        const focusedCategoryData = this.props.focusedCategoryData
        const loading = this.props.loading
        const error = this.props.error
        const showCart = this.props.showCart
        const focusedProductId = this.props.focusedProductId

        if (loading || error!=='') {
            return (
                <Loading
                    loadingMessage={'Please Wait..'}
                    errorMessage={error}
                />
            )
        }
        else {

            return (
                <PLPContainer dimContent={showCart}>
                    <div className='dim-overlay' ></div>
                    <CategoryContainer>
                        <div className='header-container'>
                            <h2>{focusedCategoryData.name}</h2>
                        </div>
                        <ItemsContainer>
                            {focusedCategoryData.products.map((product, index) => {
                                return (
                                    <Card
                                        key={index}
                                        image={product.gallery[0]}
                                        productId={product.id}
                                        imageName={product.name}
                                        name={product.name}
                                        amount={product.name}
                                        price={product.prices[selectedCurrency].currency.symbol + " " + product.prices[selectedCurrency].amount}
                                        inStock={product.inStock}
                                        focusedProductId={focusedProductId}
                                        onProductImageClick={() => this.onProductImageClick(product.id)}
                                        onProductPriceClick={() => this.onProductPriceClick(product.id)}
                                        dimContent={showCart}
                                        onCartClick={() => alert('')}
                                    />
                                )
                            })}
                        </ItemsContainer>
                    </CategoryContainer>
                </PLPContainer>
            );
        }
    }
};


const mapDispatchToProps = (dispatch) => {
    return {

        setFocusedCategoryData: (item) => dispatch(setFocusedCategoryData(item)),
        setFocusedProductId: (item) => dispatch(setFocusedProductId(item)),
        setLoading: (item) => dispatch(setLoading(item)),
        setError: (item) => dispatch(setError(item)),
        setFocusedTab: (item) => dispatch(setFocusedTab(item)),

    }
};

const mapStateToProps = state => ({
    selectedCurrency: state.navSlice.selectedCurrency,
    focusedCategory: state.dataSlice.focusedCategory,
    showCurrencyDropDown: state.navSlice.showCurrencyDropDown,
    focusedCategoryData: state.dataSlice.focusedCategoryData,
    focusedProductId: state.dataSlice.focusedProductId,
    loading: state.dataSlice.loading,
    error: state.dataSlice.error,
    showCart: state.navSlice.showCart
})

export const withRouter = (Component) => (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <Component {...props} params={params} navigate={navigate} />;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PLP))

