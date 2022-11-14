import styled from "styled-components";


export const NotificationContainer = styled.div`
background:  ${props => props.backgroundColor};
width: 250px;
position: fixed;
top: 80px;
right: 10px;
border-radius: 10px 0;
color: white;
align-items: center;
padding: 20px 15px;
display:  ${props => props.show?'flex': 'none'};
font-size: 15px;
font-weight: 500;


}
`;