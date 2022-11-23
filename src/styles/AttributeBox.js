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
padding: 0 5px;
color: ${props => props.selected ?"#FFFFFF" : "#1D1F22"};
cursor:${props => props.isCursor ? "pointer" : "default"};
:hover{
    font-weight: 500;
}

 @media (max-width: 768px) {
height: 20px;
font-size: 11px;
 }
}
`;