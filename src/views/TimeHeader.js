import { Row } from 'react-bootstrap';
import '../css/TimeHeader.css';

function TimeHeader(){
    const hours = [];

    for( let i = 0; i <24; i++){
        var str = "" + i;
        if(i < 10){
            str = '0'+i;
        }
        hours.push(<div className="time-header">{""+str+":00"}</div>)
    }
    
    return(
        <div className="time-header">
            <div className="header">Time</div>
            <hr />
            {hours.map(hour => (
                <Row>
                    <div className="hour-box">
                        <p>{hour}</p>
                        <hr />
                    </div>
                </Row>
            ))}
        </div>
    );
}

export default TimeHeader;