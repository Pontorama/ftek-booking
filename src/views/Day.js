import React from 'react';
import { Row } from 'react-bootstrap';
import '../css/Day.css';

class Day extends React.Component{
    constructor(props){
        super(props);
        this.bookings = this.getBookings();
        this.blockHeight = 100;
        this.blockoffset = 81;
    }

    getBookings(){
        //Vet ej hur man gör detta än. Statiskt tills vidare
        var bookingsList = [];
        if(this.props.day === "Monday"){
            bookingsList = [{
                start_h: 8,
                duration: 2,
                name: "Pontus",
            },
            {
                start_h: 13,
                duration: 1,
                name: "Leia",
            },
            {
                start_h: 20,
                duration: 3,
                name: "Pontus",
            }];
        }else if(this.props.day === "Tuesday"){
            bookingsList = [{
                start_h: 8,
                duration: 2,
                name: "Pontus",
            },
            {
                start_h: 11,
                duration: 3,
                name: "Han",
            }];
        }else if(this.props.day === "Friday"){
            bookingsList = [{
                start_h: 17,
                duration: 6,
                name: "Luke",
            }];
        }

        return bookingsList;
    }

    getBookingStyle(booking){
        return {
            position: "absolute",
            height: (booking.duration * this.blockHeight) + "px",
            top: (booking.start_h * this.blockHeight + this.blockoffset) + "px",
            backgroundColor: "burlywood",
            zIndex: "100",
            width: "100%",
            border: "solid",
            borderWidth:"1px"
        }
    }

    render(){
        const hours = [];
    
        for( let i = 0; i <24; i++){ // Dumt. Men kan inget bätre sätt
            hours.push(<div></div>)
        }
    
        return(
            <div className="booking-container">
                <div className="header">{this.props.day}</div>
                <hr />
                {hours.map(hour => (
                    <Row>
                        <div className="booking-box">
                        
                        <hr />
                        </div>
                    </Row>
                    
                ))}
                {this.bookings.map(booking => (
                    <div style={this.getBookingStyle(booking)}>{booking.name}</div>
                ))}
                </div>
        );
    }
}

export default Day;