import styled from "styled-components";


export const LoadingContainer = styled.div`
background: #FFFFFF;
min-height: 70vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

h3{
    padding-top: 10%;
    color: gray;
    font-weight: 400;
    text-align: center;
}

h4{
    padding-top: 10%;
    color: red;
    font-weight: 400;
    text-align: center;

}

button{
    margin-top: 15px;
    padding: 10px 20px 10px;
    border-radius: 5px;
    border: none;
    color: gray;

    :hover{
        background-color: #5ECE7B;
        color: #FFFFFF;
        cursor: pointer;
    }
}
}
`;