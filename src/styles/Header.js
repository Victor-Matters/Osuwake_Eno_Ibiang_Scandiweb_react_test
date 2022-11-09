import styled from "styled-components";


export const HeaderContainer = styled.div`
height: 12vh;
display: flex;
align-items: center;

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
       line-height: 290%;
       font-size: 16px;
       text-transform: uppercase;
       border-bottom: 3px #fff solid;
       
       :hover{
        color: #5ECE7B;
        cursor: pointer;
       }
    }
    .active{
    color: #5ECE7B;
    font-weight: 600;
    border-bottom: 3px #5ECE7B solid;
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

     .item{
        display: flex;
        flex-direction:row;
        align-items: center;
        margin-left: 25px; 
    }   
    }
   
}
`;
