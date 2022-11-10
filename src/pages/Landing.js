import React from 'react'
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import { client } from '../index.js'
import { setFocusedCategory, show_FilterDropDown, hide_FilterDropDown } from '../redux/slices/dataSlice'
import { CategoryContainer, ItemsContainer, LandingContainer } from '../styles/Landing.js';
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






class Landing extends React.Component {
    constructor() {
        super()
        this.state = {
            all_categories: [],
            focusedCategoryData: {},
            loading: true,
            error: ''
        }
    }


    getCategory = async (categoryName) => {     
        await client.query({
            query: GET_CATEGORY(categoryName)
        }).then((result) => {
            let categoryData = result.data.category
          this.setState({focusedCategoryData: categoryData, loading: false})
        }).catch(err => {
            this.setState({ error: err?.message })
        })
    }


    getCategories = async () => {
        await client.query({
            query: GET_CATEGORIES
        }).then((result) => {
            let all_categories = result.data.categories
             

            this.setState({ all_categories: all_categories })
            if (this.props.focusedCategory === '') {
                this.props.set_FocusedCategory(all_categories[0].name)
                this.getCategory(all_categories[0].name)
            }
            else{

                this.getCategory(this.props.focusedCategory)   
            }
        }
        ).catch(err => {
            this.setState({ error: err?.message })
        })
    }

    componentDidMount() {
        this.getCategories()
    }

    dropDownClick() {
        if (this.props.showFilterDropDown) {
            this.props.hide_FilterDropDown()
        }
        else {
            this.props.show_FilterDropDown()
        }

    }

    render() {

        const selectedCurrency = this.props.selectedCurrency
        const focusedCategory = this.props.focusedCategory
        const focusedCategoryData = this.state.focusedCategoryData
        const showFilterDropDown = this.props.showFilterDropDown
        const showCurrencyDropDown = this.props.showCurrencyDropDown


        console.log(showFilterDropDown)

        if (this.state.loading) {
            return (
                <LoadingContainer>
                    <h3>Please Wait...</h3>
                </LoadingContainer>
            )
        }
        else {

            return (
                <LandingContainer>

                    <CategoryContainer>
                        <div className='header-container'>
                            <h2>{focusedCategory}</h2>
                            <div className={`filter-container ${showCurrencyDropDown ? "hidden" : ""}`}>
                            <span>Filter:</span>
                            <div className='filter'>
                                <div onClick={() => this.dropDownClick()} className='filter-btn'>{focusedCategory}</div>
                                <div>
                                    <div className={`dropdown-content ${showFilterDropDown ? "visible" : ""}`}>
                                        {this.state.all_categories.map((item, index) => {
                                            return (
                                                <a onClick={() => {
                                                    this.props.set_FocusedCategory(item.name);
                                                    this.props.hide_FilterDropDown() 
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
                                        imageName={product.name}
                                        name={product.name}
                                        amount={product.name}
                                        price={product.prices[selectedCurrency].currency.symbol + " " + product.prices[selectedCurrency].amount}
                                        inStock={product.inStock}
                                    />
                                )
                            })}
                        </ItemsContainer>
                    </CategoryContainer>



                </LandingContainer>
            );
        }
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        set_FocusedCategory: (item) => dispatch(setFocusedCategory(item)),
        show_FilterDropDown: () => dispatch(show_FilterDropDown()),
        hide_FilterDropDown: () => dispatch(hide_FilterDropDown())
    }
};

const mapStateToProps = state => ({
    selectedCurrency: state.navSlice.selectedCurrency,
    focusedCategory: state.dataSlice.focusedCategory,
    showFilterDropDown: state.dataSlice.showFilterDropDown,
    showCurrencyDropDown: state.navSlice.showCurrencyDropDown,


})
export default connect(mapStateToProps, mapDispatchToProps)(Landing)
