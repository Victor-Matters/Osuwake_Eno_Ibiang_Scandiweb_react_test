import styled from "styled-components";


export const ColorBoxContainer = styled.div`
background-color: #FFFFFF;
height:  ${props => props.boxHeight};
width: ${props => props.boxWidth};
border:  ${props => props.selected ?"1px solid #5ECE7B":"1px solid #FFFFFF"};
margin-right: 10px;
color: #1D1F22;
cursor:${props => props.isCursor ? "pointer" : "default"};
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

.color{
width: 85%;
height: 85%;
background-color:  ${props => props.boxColor};
}

}
`;