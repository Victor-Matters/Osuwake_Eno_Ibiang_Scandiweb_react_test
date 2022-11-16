import styled from "styled-components";


export const CartPageContainer = styled.div`
background: #FFFFFF;
display: flex;
height: 90vh;
flex-direction: column;


.dim-overlay{
  height: 100vh;
  background: gray;
  width: 100%;
  position: fixed;
  opacity: 60% ;
  display:   ${props => props.dimContent ? 'block' : 'none'};
  z-index: 1; 
}

.header-container{

  margin-top: 125px; 
  margin-bottom: 15px; 
border-bottom: 1px solid #E5E5E5; 
padding-bottom: 40px;
margin-left: 50px;
   h2{
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 30px;

text-transform: uppercase;
color: #1D1F22;
    }
}

.items-container{

margin-left: 50px;

  .cart-item{
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 15px;  
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 45px;
   
    width: 100%;
    .left{
  
    width: 30%;
        display: flex;
        flex-direction: row;
    .attributes{
    width: 85%;

.attributes-container{
    .header{
        font-size: 15px;
        font-weight: 700;
        margin-top: 15px;
        text-transform: uppercase;
    }
     .attribute-row1{
margin-top: 7px;
display: flex;
flex-direction: row;

    }

    .attribute-row2{
margin-top: 7px;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-gap: 2px; 
margin-right: 20px;
    }
}


.brand{
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 7px;
    }
    .name{
        font-size: 20px;
        margin-bottom: 7px;

    }
    
    .amount{
        margin-top: 5px;
        font-weight: 500;
        font-size: 16px;
    }
    }
    
    

    }

    .right{
        width: 30%;
        display: flex;
        flex-direction: row;
        position: relative;

        .left-arrow{
            position: absolute;
            bottom: 0;
            right: 170px;
        }

        .right-arrow{
            position: absolute;
            bottom: 0;
            right: 130px;
            
        }

        .enabled{
            cursor: pointer;
        }
        
        img{
      width: auto;
      height: 180px;
      
        }
      .quantity-buttons{
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

     .button{
        cursor: pointer;

    }
    
        }

    }
      

    }  
     
}

 .buttons-container{
height: 15%;


.total-container{
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .text{
        font-size: 16px;
        font-weight: 500;
        font-family: Roboto;
    }

    .value{
        font-size: 16px;
        font-weight: 700;
        font-family: Raleway;
        
    }

}
}

 .empty-cart{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 50vh;

   p{
    color: gray;
    margin: 10px;
   }

   .button-container{
    height: 10vh;
    width: 50%;
   }
}

.order-section{

   .tax{
font-weight: 400;
font-size: 18px;
margin-bottom: 5px;

span{
    margin-left: 10px;
    font-weight: 700;
}
    }

     .quantity{
font-weight: 400;
font-size: 18px;
margin-bottom: 5px;

span{
    margin-left: 10px;
    font-weight: 700;
}
    }

     .total{
font-weight: 400;
font-size: 18px;
margin-bottom: 15px;

span{
    margin-left: 10px;
    font-weight: 700;
}
    }
   
    width: 25%;
    display: flex;
    flex-direction: column;

}

}
 @media (max-width: 768px) {
 .items-container{ 
    .cart-item{
    .right{
        width: 50%;

         .left-arrow{
            right: 110px;
        }

        .right-arrow{
            right: 70px;
            
        }
    }
  }
}
 }


`;