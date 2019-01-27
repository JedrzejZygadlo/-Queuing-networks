import React from 'react';
import ReactDOM from 'react-dom'; 

import SeatInQueue from './components/SeatInQueue';
import Machine from './components/Machine';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faUserCog,faArrowRight, faUserClock, faUserCheck } from '@fortawesome/free-solid-svg-icons';
library.add(faUserCog, faArrowRight, faUserClock, faUserCheck);
const ms = require('pretty-ms');

const StyledMainContainer = styled.div`
    max-width: 1200px;
    margin: auto;

`;
const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
    margin-bottom: 40px;
`;
const StyledCounter = styled.div `
    width: 40%;
    font-size:4em;
    text-align: center;
    margin-right: 30px;
    background-color: lightblue;
    position: relative;
`;

const StyledBtn = styled.button `
    width: 120px;
    height: 74px;
    background-color: lightblue;
    border: none;
    font-size: 3em;
`;
const StyledQueue = styled.div`
    /*display: grid;
    grid-template-columns: repeat(3,1fr) 2fr repeat(4,1fr) 2fr repeat(4,1fr) 2fr;*/
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledResults = styled.div `
    width: 100%;
    margin: 100px auto;
    text-align: center;
`;

class App extends React.Component {
    constructor(props){
        super(props);
         this.state = {
             seats: ['free','free','free','free','free','free','free','free','free','free','free','free','free'],
             removedUsers: 0,
             work: 0,
             time: 0,
             isOn: false,
             start: 0,
             usersServered: 0
         }
         this.startTimer = this.startTimer.bind(this)
         this.stopTimer = this.stopTimer.bind(this)
    }
    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        })
            this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 100);
    }
    stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
    componentDidMount () {
        //this.setState({
         //   seats: 
        //});
        let losowania = [];
        losowania[0] = 5000;
        for (var i=0;i<=1000;i++){
            losowania[i+1] = losowania[i] + 100*Math.floor((Math.random() * 150) + 1);
            //console.log(losowania[i]);
        }
        let j=0;
        //let timeOfArrival= 0
        this.losowanie(losowania,j);
    }
    componentDidUpdate() {
        if (this.state.work === 1){
            let n=1;
            let index = 4;
            this.setState({
                work: 0
            });
            setTimeout(() => {
                console.log("Maszyna: ", index, "skonczyla obsługę o czasie: ", this.state.time/1000);
                this.checkBehind(index);
                this.isMachineFree(n + 1);
            }, 10000);
            //console.log("1");
            return;
        }
        else if (this.state.work === 2) {
            let n = 2;
            let index = 8;
            this.setState({
                work: 0
            });
            setTimeout(() => {
                console.log("Maszyna: ", index, "skonczyla obsługę o czasie: ", this.state.time/1000);
                this.checkBehind(index);
                this.isMachineFree(n + 1);
            }, 10000);
            console.log("1");
            return;
        }
        else if (this.state.work === 3) {
            let n = 3;
            let index = 12;
            this.setState({
                work: 0
            });
            setTimeout(() => {
                console.log("Maszyna: ", index, "skonczyla obsługę o czasie: ", this.state.time / 1000);
                this.checkBehind(index);
                this.isMachineFree(n + 1);
            }, 10000);
            console.log("1");
            return;
        };
        }
    renderSeat(i){
        return <SeatInQueue id={i} status={this.state.seats[i]} />
    }
    renderMachine(i){
        return <Machine id={i} status={this.state.seats[i]}/>
    }
    losowanie(losowania,i) {

        if (losowania[i] <= this.state.time) {
            i=i+1;
            console.log('Osoba przybyla o czasie: ', losowania[i]/1000, '. Id osoby: ',i);
            this.isMachineFree(1)
        };
        setTimeout(() => {
            this.losowanie(losowania,i);
        }, 1000);
       // let timeOfArrival = timeOfArrival + 20;
    }
    isMachineFree(n){
        let index = 4*n;
        if (this.state.seats[index] === 'free'){
            this.changeOneStatus(index);
            setTimeout(()=>{
                console.log("Maszyna: ", index, "skonczyla obsługę o czasie: ", this.state.time / 1000);
                this.checkBehind(index);
                this.isMachineFree(n+1);
        },10000);
            console.log("Maszyna", index, "zaczela obsluge o czasie: ", this.state.time / 1000);
            return;
        }
        else if (this.state.seats[index - 1] === 'free'){
            this.changeOneStatus(index - 1);
            console.log("Osoba usiadła w poczekalni na miejscu ", index - 1, "Nastąpiło to w: ", this.state.time / 1000);
            return;
        }
        else if (this.state.seats[index - 2] === 'free') {
            this.changeOneStatus(index - 2);
            console.log("Osoba usiadła w poczekalni na miejscu ", index - 2, "Nastąpiło to w: ", this.state.time / 1000);
            return;
        }
        else if (this.state.seats[index - 3] === 'free') {
            this.changeOneStatus(index - 3);
            console.log("Osoba usiadła w poczekalni na miejscu ", index - 3, "Nastąpiło to w: ", this.state.time / 1000);
            return;
        }
        this.numberOfMachine(n);
    }
    checkBehind(index){
        if (this.state.seats[index - 3] !== 'free') {
            console.log("Osoba wstala z miejsca: ", index - 1, ". Udała się do maszyny:  ", index, "Nastąpiło to w: ", this.state.time / 1000);
            console.log("Osoba wstala z miejsca: ", index - 2, "Udała się na miejsce: ", index - 1, "Nastąpiło to w: ", this.state.time / 1000);
            console.log("Osoba wstala z miejsca: ", index - 3, "Udała się na miejsce: ", index - 2, "Nastąpiło to w: ", this.state.time / 1000);
            console.log("Maszyna: ", index, "rozpoczeła obsluge o czasie: ", this.state.time / 1000);
            let arr = this.state.seats;
            arr.splice(index-3, 1, 'free')
            this.setState({
                seats: arr,
                work: index/4
            });
            return;
        }
        else if (this.state.seats[index - 2] !== 'free') {
            console.log("Osoba wstala z miejsca: ", index - 1, ". Udała się do maszyny:  ", index, "Nastąpiło to w: ", this.state.time / 1000);
            console.log("Osoba wstala z miejsca: ", index - 2, "Udała się na miejsce: ", index - 1, "Nastąpiło to w: ", this.state.time / 1000);
            console.log("Maszyna: ", index, "rozpoczeła obsluge o czasie: ", this.state.time / 1000);
            let arr = this.state.seats;
            arr.splice(index-2, 1, 'free')
            this.setState({
                seats: arr,
                work: index/4
            });
            return;
        }
        else if (this.state.seats[index - 1] !== 'free') {
            console.log("Osoba wstala z miejsca: ", index - 1, ". Udała się do maszyny:  ", index, "Nastąpiło to w: ", this.state.time / 1000);
            console.log("Maszyna: ", index, "rozpoczeła obsluge o czasie: ", this.state.time / 1000);
            let arr = this.state.seats;
            arr.splice(index-1, 1, 'free')
            this.setState({
                seats: arr,
                work: index/4
            });
            return;
        }
            let arr = this.state.seats;
            arr.splice(index, 1, 'free')
            this.setState({
                seats: arr
            });
            return;
    }
    numberOfMachine(n){
        if(n===1){
            console.log("Zgloszenie nie zostało przyjęte z powodu braku miejsc w kolejce");
            this.setState((state) => ({
                removedUsers: state.removedUsers + 1
            }));
            return;
        }
        if(n===2 || n ===3){
            const change = this.state.seats.slice();
            change[4*n] = 'done';
            this.setState({seats: change});
            console.log("Maszyna: ", 4 * n, "skończyła obsluge o czasie: ", this.state.time / 1000, ", ale osoba musi poczekać");
            return;
        }
        if(n===4){
            console.log("Osoba została obsłuzona przez wszystkie maszyny. Koniec obsługi nastąpił w :", this.state.time / 1000);
            this.setState((state)=>({
                usersServered: state.usersServered + 1 
            }));
            return;
        }
    }
    changeOneStatus(i){
        //console.log(this.state.seats);
        const newStatus = this.state.seats.slice();
        //console.log(newStatus);
        if(i % 4 === 0){
          newStatus[i] = 'working';  
        }
        else {
            newStatus[i] = 'busy';
        }
        this.setState({seats: newStatus});
        //console.log(this.state.seats[i]);
    }
    render() {
        let start = (this.state.time === 0) ?
      <StyledBtn onClick={this.startTimer}>start</StyledBtn> :
      null
      let stop = (this.state.time === 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>
        return (
            <StyledMainContainer>
                <StyledHeader>
                    <StyledCounter>{ms(this.state.time)}</StyledCounter>
                    {start}
                    {stop}
                </StyledHeader>
                <StyledQueue>
                        {this.renderSeat(1)}
                        {this.renderSeat(2)}
                        {this.renderSeat(3)}
                        {this.renderMachine(4)}
                         <FontAwesomeIcon icon='arrow-right' size='3x' style={{ marginright: '1.5em' }}/>
                        {this.renderSeat(5)}
                        {this.renderSeat(6)}
                        {this.renderSeat(7)}
                        {this.renderMachine(8)}
                        <FontAwesomeIcon icon='arrow-right' size='3x' style={{ marginright: '1.5em' }}/>
                        {this.renderSeat(9)}
                        {this.renderSeat(10)}
                        {this.renderSeat(11)}
                        {this.renderMachine(12)}
                    
                </StyledQueue>
                <StyledResults>
                    <h1>Zgloszenia odrzucone: {this.state.removedUsers}</h1>
                    <h1>Ilosc obsłużonych osób: {this.state.usersServered} </h1>
                </StyledResults>
            </StyledMainContainer>
        );
    }
}

ReactDOM.render( <
    App / > ,
    document.querySelector('#root')
);