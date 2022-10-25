import React, {Component} from 'react';
import './Overview.css';

class Overview extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="overview">
                <h2 className="overview-title">Upcoming</h2>
                <h2 className="overview-title">Completed</h2>
            </div>
        )
    }
}
export default Overview;