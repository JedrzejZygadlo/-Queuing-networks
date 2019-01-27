import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledSeat = styled.div`
    width: 80px;
    height: 80px;
    margin: 10px 5px;
    background-color: #C4F9FF;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #055387;
    position: relative;
`;
const StyledP = styled.p `
    top: -40px;
    left: 25px;
    position: absolute;
`;
class SeatInQueue extends React.Component {
    /*constructor(props){
        super(props);
    }*/
    render() {
        if (this.props.status === 'free') {
            return (
                <StyledSeat>
                    <StyledP>{this.props.id}</StyledP>
                </StyledSeat>
            );
         }
         if (this.props.status === 'busy') {
            return (
                <StyledSeat>
                    <FontAwesomeIcon icon='user-clock' size='3x' />
                </StyledSeat>
            );
         }
         return(
            <div>
                dupa
            </div>
        );
        
         
    }
}
export default SeatInQueue;