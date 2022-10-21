import "./ItemCard.css";
import React, { Component } from "react";

class ItemCard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   completed: props.completed,
    // };
    this.completionCheck = this.completionCheck.bind(this);
    // this.markAsComplete = this.markAsComplete.bind(this);
  }
  completionCheck() {
    return this.props.completed ? "Completed" : "Incomplete";
  }

  render() {
    return (
      <div className={`item-card `+ this.completionCheck()} identifier={this.props.identifier}>

        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <p>{this.props.due}</p>
        <p>{this.props.priority}</p>
        <p>{this.completionCheck()}</p>

        <button onClick={this.props.markComplete}>Mark Complete</button>
        <button onClick={this.props.removeCard}>Remove</button>
      </div>
    );
  }
//   componentDidUpdate(){
//     this.completionCheck();
//   }
}

export default ItemCard;
