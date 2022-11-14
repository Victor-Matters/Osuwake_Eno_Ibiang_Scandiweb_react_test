import styled from "styled-components";


export const AttributeBoxContainer = styled.div`
background: ${props => props.selected ? "#1D1F22" : "#FFFFFF"};
height:  ${props => props.boxHeight};
font-size: ${props => props.fontSize};
display: flex;
justify-content: center;
align-items: center;
border: 1px solid #1D1F22;
margin-right: 10px;
color: ${props => props.selected ?"#FFFFFF" : "#1D1F22"};
cursor: pointer;
:hover{
    font-weight: 500;
}
}
`;