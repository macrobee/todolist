import React, { Component } from "react";
import { ReactComponent as Edit } from "./edit.svg";
import { ReactComponent as Expand } from "./expand.svg";
import { ReactComponent as Collapse } from "./collapse.svg";

class EditingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      due: this.props.due,
      priority: this.props.priority,
      identifier: this.props.identifier,
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  sendData(e){
    e.preventDefault();
    console.log(this.state);
    console.log('sent data');
  }
  handleChange(e) {
    const target = e.target.id;
    const value = e.target.value;
    console.log(value);
    this.setState({ [target]: value });
  }
  render() {
    return (
      <div
        className={
          `item-card editing item-expanded priority-` + this.props.priority
        }
        identifier={this.props.identifier}
      >
        <form onSubmit={this.sendData}>
            <label htmlFor="title">Task: </label>
            <input
              type="text"
              className="card-title"
              id="title"
              defaultValue={this.props.title}
              onChange={this.handleChange}
            />
            <label htmlFor="due">Due: </label>
            <input
              type="date"
              className="card-due"
              id="due"
              defaultValue={this.props.due}
              onChange={this.handleChange}
            />
            <label htmlFor="priority">Priority: </label>
            <input
              type="range"
              className="priority-text"
              min="0"
              max="2"
              id="priority"
              defaultValue={this.props.priority}
              onChange={this.handleChange}
            />
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              className="description-text"
              id="description"
              defaultValue={this.props.description}
              onChange={this.handleChange}
            />
            <button type="submit">
              Save
            </button>
        </form>
      </div>
    );
  }
}

export default EditingItem;
