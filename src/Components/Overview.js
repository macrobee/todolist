import React, { Component } from "react";
import "./Overview.css";
import OverviewCard from "./OverviewCard";
import uniqid from 'uniqid';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.displayCards = this.displayCards.bind(this);
  }
  //receive list of upcoming tasks in props
  //iterate through list, display top 5

  //receive list of completed tasks in props
  //iterate through list, display top 5
  displayCards(itemList) {
    return itemList.map((item) => {
      return (
        <OverviewCard
          identifier={item.identifier}
          title={item.title}
          due={item.due}
          today={this.props.today}
          key={uniqid()}
        />
      );
    });
  }
  render() {
    return (
      <div className="overview">
        <div className="overview-category">
            <h2 className="overview-title">Upcoming</h2>
            {this.displayCards(this.props.upcoming)}
        </div>
        <div className="overview-category">
            <h2 className="overview-title">Completed</h2>
            {this.displayCards(this.props.completed)}
        </div>
      </div>
    );
  }
}
export default Overview;
