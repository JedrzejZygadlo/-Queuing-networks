import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledMachine = styled.div `
    width: 150px;
    height: 150px;
    background-color: #80FFD4;
    margin: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #055387;
    position:relative;
`;
const StyledP = styled.p`
    top: -40px;
    left: 55px;
    position: absolute;
`;
class Machine extends React.Component {
    /*constructor(props) {
        super(props);
      /* this.state = {
            stauts: 'free'   // 'working' , 'done'
        }

    }
        */
    
    
    render() {
       if (this.props.status === 'free') {
            return (
                
                <StyledMachine>
                   <StyledP>{this.props.id}</StyledP> 
                </StyledMachine>
            );
         }
         if (this.props.status === 'working') {
            return (
                <StyledMachine>
                    <FontAwesomeIcon icon='user-cog' size='3x'/>
                </StyledMachine>
            );
         }
         if (this.props.status === 'done') {
            return (
                <StyledMachine>
                    <FontAwesomeIcon icon='user-check' size='3x'/>
                </StyledMachine>
            );
         }
         return(
            <StyledMachine>
                ??
            </StyledMachine>
        );
    }

};

export default Machine;