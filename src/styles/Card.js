import styled from "styled-components";


export const CardContainer = styled.div`
  box-sizing: border-box;
height: 350px;
margin-bottom: 30px;
display: flex;
flex-direction: column;
padding: 20px;
 position: relative;

.low-opacity{
opacity: 0.5;
}

:hover{
background-color:  ${props => props.inStock ? "whitesmoke" : ""};
cursor:  ${props => props.inStock ? "pointer" : "default"};
}
.item-name{
font-weight: 300;
font-size: 18px;
line-height: 160%;
display: flex;
align-items: center;
color: #1D1F22;
margin-top: 20px;
}

.item-price{
font-weight: 500;
}
img{
  width: 70%;
  height: 70%;
  object-fit: contain;
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


 @media (max-width: 768px) {
   font-size: 15px;
  }
}

}
`;