import "./OverviewCard.css";
import React, { Component } from "react";

class OverviewCard extends Component {
  constructor(props) {
    super(props);
  }
  calculateDateDiff(date) {
    const today = this.props.today;
    const itemDate = new Date(date);
    const dateDiff = (itemDate - today) / 86400000;

    let returnedString;
    if (dateDiff === 0){
      returnedString = "Today";
    } else if (dateDiff === 1) {
      returnedString = "Tomorrow";
    } else if (dateDiff < 15) {
      returnedString = `In ${dateDiff} days`;
    } else if (dateDiff < 60) {
      returnedString = `In ${Math.floor(dateDiff / 7)} weeks`;
    } else if (dateDiff < 365) {
      returnedString = `In ${Math.floor(dateDiff / 30.5)} months`;
    }
    return returnedString;
  }
  render() {
    return (
      <div className="overview-card" identifier={this.props.identifier}>
        <div className="overview-heading">
          <div>
            <h3>{this.props.title}</h3>
          </div>
          <div>
            <h4>{this.props.due}</h4>
          </div>
        </div>
        <div>
          <p>{this.calculateDateDiff(this.props.due)}</p>
        </div>
      </div>
    );
  }
}

export default OverviewCard;
