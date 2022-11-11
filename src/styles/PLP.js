import styled from "styled-components";


export const PLPContainer = styled.div`
background: #FFFFFF;
margin: 55px;  
padding-top: 80px;

}
`;

export const CategoryContainer = styled.div`

min-height: 50vh;

.header-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h2{
font-weight: 400;
font-size: 30px;
line-height: 160%;
color: #1D1F22;
text-transform: capitalize;

}

.filter-container span{
font-size: 15px;
}

.hidden{
  display: none;
}

.filter{
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
position: relative;
display: inline-block;

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #FFFFFF;
  text-transform: capitalize;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.visible{
    display: block;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-style: normal;
font-weight: 500;
font-size: 14px;
}

.highlighted{
  background-color: whitesmoke;
}

.dropdown-content a:hover {background-color: #EEEEEE; cursor: pointer}

  span{
    font-size: 15px;
  }

.filter-btn{
padding: 8px 15px 8px;
display: flex;
 justify-content: center;
  align-items: center;
margin-left: 10px;
font-weight: 500;
font-size: 14px;
cursor: pointer;
text-transform: capitalize;
text-decoration: underline;

:hover{
  background-color: whitesmoke;
}
}
}
}


}
`;


export const ItemsContainer = styled.div`
padding-top: 50px;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 45px;
margin-bottom: 70px;

`;