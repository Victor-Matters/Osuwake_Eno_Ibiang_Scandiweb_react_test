import React from 'react'
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { client } from '../index.js'
import { setFocusedCategoryData, setFocusedProductId, setLoading, setError } from '../redux/slices/dataSlice'
import { setFocusedTab, setShowCart } from '../redux/slices/navSlice'
import Notification from '../components/Notification.jsx';
import { CategoryContainer, ItemsContainer, PLPContainer } from '../styles/PLP.js';
import Card from '../components/Card.jsx';
import Loading from '../components/Loading.jsx';
import { setCartItems } from '../redux/slices/cartSlice.js';
import { GET_CATEGORIES, GET_CATEGORY } from '../graphql/queries.js';

let isQuickShopIconClicked = false


class PLP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notificationMessage: '',
            notificationType: '',
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


    validateAttributesSelection = (attributes) => {

        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i].choiceIndex === undefined) {
                this.setState({
                    attributeValidationFocusIndex: i,
                    attributeValidationErrorFound: true
                })
                setTimeout(() => {
                    this.setState({ attributeValidationErrorFound: false })
                }, 3000);
                return false
            }
        }
        return true

    }

    compareAttributes = (attributes1, attributes2) => {
        let matchCount = 0
        for (let i = 0; i < attributes1.length; i++) {
            if (attributes1[i].choiceIndex === attributes2[i].choiceIndex) {
                matchCount += 1
            }
        }

        if (matchCount === attributes1.length) {
            return true
        }
        else {
            return false
        }
    }



    onCartIconClick(item) {
        isQuickShopIconClicked = true
        const productData = { ...item }
        //selecting some default attribute choices for the user 
        let _attributes = [...productData.attributes]
        for (let i = 0; i < _attributes.length; i++) {
            let _attribute = { ..._attributes[i] }

            _attribute.choiceIndex = 0
            _attributes[i] = _attribute

        }
        productData.attributes = _attributes

        console.log(productData)
        let cartItems = [...this.props.cartItems]

        //Check if cart has any items
        if (cartItems.length > 0) {

            let item_with_same_id_and_attributes_found = false
            let index_of_item_with_same_id_and_attributes = null

            if (productData.attributes.length > 0) {
                //Run check for item with same id and same attribute selections

                //Make a validation check (Checks if user has made choices for all attributes)

                //This function (validateAttributesSelection) takes attributes as a parameter and iterates through
                //Returns true if options has been selected for all attributes else returns false
                const are_all_Attributes_Checked = this.validateAttributesSelection(productData.attributes)
                if (are_all_Attributes_Checked) {
                    for (let i = 0; i < cartItems.length; i++) {
                        if (cartItems[i].id === productData.id) {
                            //This function (compareAttributes) takes two attributes  and iterates through them
                            //Returns true if selected options in them are thesame else returns false
                            const attributes_selection_thesame = this.compareAttributes(cartItems[i].attributes, productData.attributes)
                            if (attributes_selection_thesame) {
                                item_with_same_id_and_attributes_found = true
                                index_of_item_with_same_id_and_attributes = i
                            }
                        }
                    }

                    if (item_with_same_id_and_attributes_found) {

                        this.increaseProductQuantity(index_of_item_with_same_id_and_attributes)
                        this.setState({ notificationType: 'success', notificationMessage: 'An identical ' + productData.brand + ' ' + productData.name + ' was found in your bag. Quantity is now ' + parseInt(cartItems[index_of_item_with_same_id_and_attributes].quantity + 1) })
                        setTimeout(() => {
                            this.setState({ notificationMessage: '' })
                        }, 7000)

                    }
                    else {
                        //No item with same id and attribute selections found
                        this.addProductToCart(productData)
                    }
                }

            }
            else {
                let item_with_same_id_found = false
                let index_of_item_with_same_id = null
                //Run check for item with same id
                for (let i = 0; i < cartItems.length; i++) {
                    if (cartItems[i].id === productData.id) {
                        item_with_same_id_found = true
                        index_of_item_with_same_id = i
                        break
                    }

                }


                if (item_with_same_id_found) {

                    this.increaseProductQuantity(index_of_item_with_same_id)
                    this.setState({ notificationType: 'success', notificationMessage: 'An identical ' + productData.brand + ' ' + productData.name + ' was found in your bag. Quantity is now ' + parseInt(cartItems[index_of_item_with_same_id].quantity + 1) })
                    setTimeout(() => {
                        this.setState({ notificationMessage: '' })
                    }, 7000)

                }
                else {
                    //No item with same id and attribute selections found
                    this.addProductToCart(productData)
                }

            }

        }
        else {
            //Check if product has any attributes
            if (productData.attributes.length > 0) {
                //Make a validation check (Checks if user has made choices for all attributes)

                //This function takes attributes as a parameter and iterates through
                //Returns true if options has been selected for all attributes else returns false
                const are_all_Attributes_Checked = this.validateAttributesSelection(productData.attributes)
                if (are_all_Attributes_Checked) {
                    this.addProductToCart(productData)
                }
            }
            else {
                //Since no attributes are found, without further ado
                //just add item to cart
                this.addProductToCart(productData)
            }
        }
    }

    addProductToCart(item) {

        let cartItems = [...this.props.cartItems];

        item.quantity = 1

        cartItems.unshift(item)
        this.props.setCartItems(cartItems)
        this.setState({ notificationType: 'success', notificationMessage: item.brand + ' ' + item.name + ' added to cart' })
        setTimeout(() => {
            this.setState({ notificationMessage: '' })
        }, 5000)


    }



    onProductClick(productId) {
        if (!isQuickShopIconClicked) {
            this.props.setFocusedProductId(productId)
            this.props.navigate(`/${this.props.focusedCategoryData.name}/${productId}`)
        }
        isQuickShopIconClicked = false
    }

    markOrUnMarkProductAsSelected(incommingFocusedProductId, focusedProductId) {
        if (focusedProductId !== incommingFocusedProductId) {
            this.props.setFocusedProductId(incommingFocusedProductId)
        }
        else {
            this.props.setFocusedProductId('')
        }
    }

    increaseProductQuantity(index) {
        let temp_cartItems = [...this.props.cartItems];
        let temp_product = { ...this.props.cartItems[index] };

        temp_product.quantity = temp_product.quantity + 1

        temp_cartItems[index] = temp_product
        this.props.setCartItems(temp_cartItems)
    }

    render() {

        const selectedCurrency = this.props.selectedCurrency
        const focusedCategoryData = this.props.focusedCategoryData
        const loading = this.props.loading
        const error = this.props.error
        const showCart = this.props.showCart
        const focusedProductId = this.props.focusedProductId

        const { notificationMessage, notificationType } = this.state

        if (loading || error !== '') {
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
                    <div className='dim-overlay' onClick={() => this.props.setShowCart(false)} ></div>
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
                                        brand={product.brand}
                                        name={product.name}
                                        amount={product.name}
                                        price={product.prices[selectedCurrency].currency.symbol + " " + parseFloat(product.prices[selectedCurrency].amount).toFixed(2)}
                                        inStock={product.inStock}
                                        focusedProductId={focusedProductId}
                                        onProductClick={() => this.onProductClick(product.id)}
                                        dimContent={showCart}
                                        onCartClick={() => this.onCartIconClick(product)}
                                    />
                                )
                            })}
                        </ItemsContainer>
                    </CategoryContainer>
                    <Notification
                        backgroundColor={notificationType === 'success' ? "#5ECE7B" : "red"}
                        message={notificationMessage}
                        show={notificationMessage !== ''}
                    />
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
        setCartItems: (item) => dispatch(setCartItems(item)),
        setShowCart: () => dispatch(setShowCart())

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
    showCart: state.navSlice.showCart,
    cartItems: state.cartSlice.cartItems,

})

export const withRouter = (Component) => (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <Component {...props} params={params} navigate={navigate} />;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PLP))

