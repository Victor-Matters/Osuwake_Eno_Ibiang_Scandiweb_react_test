import styled from "styled-components";


export const CardContainer = styled.div`
  box-sizing: border-box;
height: 350px;
margin-bottom: 30px;
 position: relative;
 background: #FFFFFF;
box-shadow:  ${props => props.focusedProductId === props.productId ? "0px 4px 35px rgba(168, 172, 176, 0.19)" : "none"};
.low-opacity{
opacity: 0.5;
}

:hover{
cursor:  ${props => props.inStock ? "pointer" : "default"};
box-shadow:  ${props => props.inStock ? "0px 4px 35px rgba(168, 172, 176, 0.19)" : "none"};

}


.product-image{
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;

    img{
      max-width: 100%;
      max-height: 90%;
      object-fit: cover;

       }

       .item-info{
 position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 400;
font-size: 20px;
line-height: 160%;
text-align: center;
color: #8D8F9A;

}

}

.product-price{
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 19px;

  :hover{
background-color:  ${props => props.inStock ? "#FBFCFC" : "none"};

}

  
}
.item-name{
font-weight: 300;
font-size: 18px;
display: flex;
align-items: center;
color: #1D1F22;
margin-bottom: 5px;
}

.item-price{
font-weight: 500;
}

.cart-icon{
  height: 50px;
  width: 50px;
   position: absolute;
  bottom: 10%;
  right: 2%;
  transform: translate(-50%, -50%);
z-index:10;
}

}

 @media (max-width: 768px) {
  .product-image{
 
       .item-info{
font-size: 15px;
}

}



.cart-icon{
  height: 40px;
  width: 40px;
}



}
`;