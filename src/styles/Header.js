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
        cursor: pointer;
        position: relative;
        display: inline-block;

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #FFFFFF;
  width: 295px;
  right: -20px;
  top: 45px;
  height: 80vh;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.visible{
    display: block;
}


        .total-tag{
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
