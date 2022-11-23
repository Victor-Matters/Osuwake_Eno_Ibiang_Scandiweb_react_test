import { gql } from '@apollo/client';


export const GET_CATEGORIES = gql`
  query {
     categories{    
      name
      }
  }
`;


export const GET_CATEGORY_querry_type1 = (categoryName) => gql`
query  {
  category(input: {title: "${categoryName}"}) {
    name,
    products{id, name, inStock, gallery, prices{currency{label, symbol} amount}}
  }
}
`;


export const GET_CATEGORY_querry_type2 = (categoryName) => gql`
query  {
  category(input: {title: "${categoryName}"}) {
    name,
    products{
        id, 
        name,
        brand, 
        inStock, 
        gallery, 
        prices{currency{label, symbol} amount},
        attributes{id, name, type, items{displayValue, value, id}}
    },
  }
}
`;

export const GET_PRODUCT = (productId) => gql`
query  {
  product(id: "${productId}") {
    id,
    name,
    inStock,
    gallery,
    description,
    category,
    attributes{id, name, type, items{displayValue, value, id}},
    prices{currency{label,symbol}, amount},
    brand

   
  }
}
`;

