import styled from "styled-components";


export const HeaderContainer = styled.div`
height: 10vh;
display: flex;
align-items: center;
background: #FFFFFF;
 position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;


.left{
    width: 33.3%;
   ul{ 
    display: flex;
    flex-direction: row;
    list-style-type: none;
    align-items: center;
    margin-left: 4%;

    .nav-item{
       margin-right: 8%;
       color: #1D1F22;
       font-style: normal;
       font-weight: 400;
       font-size: 16px;
       text-transform: uppercase;
      
       display: flex;
       align-items: center;
        height: 10vh;
       
       :hover{
        color: #5ECE7B;
        cursor: pointer;
       }
    }
    .active{
    color: #5ECE7B;
    font-weight: 600;
    border-bottom: 3px #5ECE7B solid;
    padding-top: 4px;
    }

   }
}

.center{
    width: 33.3%;
    display: flex;
    align-items: center;
    justify-content: center;
 

}

.right{
    width: 33.3%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  

    .items{
        margin-right: 15%;
        display: flex;
        flex-direction:row;
        align-items: center;

     .currency-dropdown{
        display: flex;
        flex-direction:row;
        align-items: center;
        position: relative;
        display: inline-block;

        .currency{
                cursor: pointer;
            span{
                margin-right: 10px;
                font-weight: 500;
                font-size: 18px;
                line-height: 160%;
            }
        }
    }  

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #FFFFFF;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 2;
}

.visible{
    display: block;
}

.highlighted{
  background-color: whitesmoke;
}

.dropdown-content div {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-style: normal;
font-weight: 500;
font-size: 17px;
}

.dropdown-content div:hover {background-color: #EEEEEE; cursor: pointer}
 
     .cart{
        display: flex;
        flex-direction:row;
        align-items: center;
        margin-left: 35px; 
        position: relative;
        display: inline-block;

        .cart-icon{
            cursor: pointer;
        }

.dropdown-content-cart {
  display: none;
  position: absolute;
  background-color: #FFFFFF;
  width: 295px;
  right: -20px;
  top: 45px;
  padding: 10px;
  max-height: 55vh;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

   .empty-cart{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 60vh;

   p{
    color: gray;
    margin: 10px;
   }

   .button-container{
    height: 10vh;
    width: 100%;
   }
}

  .header{
    color: #1D1F22;
    font-weight: 700;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 8%;
    margin-bottom: 20px;

    .empty{
        font-size: 11px;
        font-weight: 400;
        cursor: pointer;
    }

    span{
        font-weight: normal;  
    }
  }

.items-container{

height: 72%;
overflow-x: auto;
 ::-webkit-scrollbar {
  display: none;
}
  .cart-item{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 45px;
   
    width: 100%;
    .left{
  
    width: 60%;
        display: flex;
        flex-direction: row;
    .attributes{
    width: 85%;

.attributes-container{
    .header{
        font-size: 15px;
        font-weight: 400;
        margin-top: 15px;
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
        font-size: 16px;
        margin-bottom: 7px;
    }
    .name{
        font-size: 16px;
        margin-bottom: 9px;
    }
    .amount{
        margin-top: 5px;
        font-weight: 500;
        font-size: 16px;
    }
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

    .right{
        width: 40%;
        
        img{
      max-width: 80%;
      max-height: 80%;
      object-fit: scale-down;
        }

    }
      

    }  
     
}

 .buttons-container{
height: 15%;



.bottons-row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 95%;

    .button-container{
    width: 48%; 
    }
}

.total-container{
    padding-top: 10px;
    padding-bottom: 30px;
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

}

.visible{
    display: flex;
    flex-direction: column;

}


        .total-tag{
            cursor: pointer;
            height: 20px;
            width: 20px;
            border-radius: 20px;
            background-color: #1D1F22;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            font-size: 12px;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: -8px;
            right: -15px;
        }
    }  
    }
   
}
`;
