import React from 'react'
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { client } from '../index.js'
import { show_FilterDropDown, hide_FilterDropDown, setFocusedCategoryData, setFocusedProductId } from '../redux/slices/dataSlice'
import { CategoryContainer, ItemsContainer, PLPContainer } from '../styles/PLP.js';
import { LoadingContainer } from '../styles/Loading.js';
import Card from '../components/Card.jsx';


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
    products{id, name, inStock, gallery, prices{currency{label, symbol} amount}}
  }
}
`;






class PLP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            all_categories: [],
            loading: true,
            error: ''
        }
    }


    getCategory = async (categoryName) => {
        await client.query({
            query: GET_CATEGORY(categoryName)
        }).then((result) => {
            let categoryData = result.data.category
            this.props.setFocusedCategoryData(categoryData)
            this.setState({loading: false })
            window.history.replaceState(null, '', categoryData.name)

        }).catch(err => {
            this.setState({ error: err?.message })
        })
    }


    getCategories = async (categoryName) => {
        await client.query({
            query: GET_CATEGORIES
        }).then((result) => {
            let all_categories = result.data.categories
            this.setState({ all_categories: all_categories })
            // Here am Checking if the name of the passed route(category) exist in our list of categories from backend
            // If it is not found i will present client with our 0 index category. Which for this test is "all" 

            let categoryExist = false;
            for (let i = 0; i < all_categories.length; i++) {
                if (all_categories[i].name === categoryName) {
                    categoryExist = true;
                }
            }
            if (categoryExist) {
                this.getCategory(categoryName)
            }
            else {
                this.getCategory(all_categories[0].name)
            }
        }
        ).catch(err => {
            this.setState({ error: err?.message })
        })
    }

    componentDidMount() {
        const { categoryName } = this.props.params
        this.getCategories(categoryName)

    }

    dropDownClick() {
        if (this.props.showFilterDropDown) {
            this.props.hide_FilterDropDown()
        }
        else {
            this.props.show_FilterDropDown()
        }

    }

    onProductImageClick(productId){
    
        this.markOrUnMarkProductAsSelected(productId, this.props.focusedProductId)

    }

    onProductPriceClick(productId){
   
        this.props.setFocusedProductId(productId)
        this.props.navigate(`/${this.props.focusedCategoryData.name}/${productId}`)
    }

    markOrUnMarkProductAsSelected(incommingFocusedProductId, focusedProductId){
        if (focusedProductId!==incommingFocusedProductId){
            this.props.setFocusedProductId(incommingFocusedProductId)
        } 
        else{
            this.props.setFocusedProductId('')
        } 
    }

    render() {

        const selectedCurrency = this.props.selectedCurrency
        const focusedCategoryData = this.props.focusedCategoryData
        const showFilterDropDown = this.props.showFilterDropDown
        const showCurrencyDropDown = this.props.showCurrencyDropDown
        const focusedProductId = this.props.focusedProductId
        const error = this.state.error


        if (this.state.loading) {
            return (
                <LoadingContainer>
                    <h3 hidden={error !== ''}>Please Wait...</h3>
                    <h4 hidden={error === ''}>{error}</h4>
                </LoadingContainer>
            )
        }
        else {

            return (
                <PLPContainer>

                    <CategoryContainer>
                        <div className='header-container'>
                            <h2>{focusedCategoryData.name}</h2>
                            <div className={`filter-container ${showCurrencyDropDown ? "hidden" : ""}`}>
                                <span>Category:</span>
                                <div className='filter'>
                                    <div onClick={() => this.dropDownClick()} className='filter-btn'>{focusedCategoryData.name}</div>
                                    <div>
                                        <div className={`dropdown-content ${showFilterDropDown ? "visible" : ""}`}>
                                            {this.state.all_categories.map((item, index) => {
                                                return (
                                                    <a className={item.name === focusedCategoryData.name ?'highlighted':undefined}  onClick={() => {
                                                        this.props.hide_FilterDropDown();
                                                        this.getCategory(item.name)
                                                    }}
                                                        key={index}>{item?.name}</a>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                        onCartClick={()=>alert('')}
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
        show_FilterDropDown: () => dispatch(show_FilterDropDown()),
        hide_FilterDropDown: () => dispatch(hide_FilterDropDown()),
        setFocusedCategoryData: (item) => dispatch(setFocusedCategoryData(item)),
        setFocusedProductId: (item) => dispatch(setFocusedProductId(item))


    }
};

const mapStateToProps = state => ({
    selectedCurrency: state.navSlice.selectedCurrency,
    focusedCategory: state.dataSlice.focusedCategory,
    showFilterDropDown: state.dataSlice.showFilterDropDown,
    showCurrencyDropDown: state.navSlice.showCurrencyDropDown,
    focusedCategoryData: state.dataSlice.focusedCategoryData,
    focusedProductId: state.dataSlice.focusedProductId
})

export const withRouter = (Component) => (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <Component {...props} params={params} navigate={navigate} />;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PLP))


 //export default Landing

