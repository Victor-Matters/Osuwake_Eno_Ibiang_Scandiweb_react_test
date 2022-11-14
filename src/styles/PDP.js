import styled from "styled-components";


export const PDPContainer = styled.div`
background: #FFFFFF;
display: flex;
height: 90vh;
flex-direction: row;
justify-content: space-between;


.dim-overlay{
  height: 100vh;
  background: gray;
  width: 100%;
  position: absolute;
  opacity: 60% ;
  display:   ${props => props.dimContent ? 'block' : 'none'}; 
}
 .column1{
    padding-top: 40vh;
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
  ::-webkit-scrollbar {
  display: none;
}

    .image-container{
        display: flex;
        justify-content: center;
        width: 80%;
        height: 20vh;
        margin-bottom: 3px;
        
        :hover{
            cursor: pointer;
            border: 2px white solid;
        }

        img{
                max-width: 80%;
      max-height: 80%;
      object-fit: scale-down;
            }
    }

}

.column2{
    padding-top: 10vh;
    width: 50%;
  display: flex;

  align-items: flex-start;

   .large-image{
      max-width: 80%;
      max-height: 80%;
      object-fit: scale-down;

    }
}

.column3{
    padding-top: 20vh;
    width: 30%;

    .content{
        width: 75%;  
    }

    .product-brand{
        font-weight: 600;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        color: #1D1F22;
    }

    .product-name{
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 27px;
        display: flex;
        align-items: center;
        color: #1D1F22;
        margin-top: 5px;
    }

    .product-attribute-header{
        font-family: 'Roboto Condensed';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
        margin-top: 20px;
        color: #1D1F22;
        margin-bottom: 3px;
        text-transform: uppercase;
    }

    .product-in-cart-bottom{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
            

        button{
            border: none;
            padding: 14px 20px;
            font-size: 16px;
            font-weight: 600;
            background: #5ECE7B;
            color: #FFFFFF;
            cursor: pointer;
        }

        span{
            font-size: 17px;
            font-weight: 500;

        }
    }

      .attribute-row1{
margin-top: 7px;
display: flex;
flex-direction: row;
margin-bottom: 10px;  
    }

    .attribute-row2{
margin-top: 7px;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-gap: 5px;
margin-bottom: 10px;  
    }

    .price{
        font-weight: 700;
        font-size: 22px;
        line-height: 18px;
        color: #1D1F22;
        margin-top: 10px;
    }

    .product-description{
        margin-top: 25px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 159.96%;
    }

.highlight{
    border: 2px solid red;
    padding: 0 5px;
}

}

}
`;