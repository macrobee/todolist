import "./EditForm.css";
import React, { Component } from "react";
import uniqid from "uniqid";

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "todos",
      description: "",
      due: "",
      priority: 1,
      completed: false,
    };
    // this.collectDataOnSubmit = this.collectDataOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logData = this.logData.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  handleChange(e) {
    const target = e.target.id;
    const value = e.target.value;
    this.setState({ [target]: value });
  }
  sendData(e) {
    e.preventDefault();
    const { title, type, description, due, priority, completed } = this.state;
    console.log(title, description, due, priority);
    const taskType = type;
    const newData = {
      title,
      description,
      due,
      priority,
      completed,
      identifier: uniqid(),
    };
    this.props.addTask(taskType, newData);
  }

  logData() {
    //for testing
    console.log(this.state);
  }
  render() {
    return (
      <div className="edit-form">
        <button onClick={this.logData}>Log current data</button>
        <form onSubmit={this.sendData}>
          <div className="form-item">
            <label htmlFor="title">Task title:</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-item">
            <label htmlFor="type">Task type: </label>
            <select name="type" id="type" onChange={this.handleChange}>
              <option value="todos">Todo</option>
              <option value="projects">Project</option>
              <option value="goals">Goal</option>
            </select>
          </div>

          <div className="form-item">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Describe the task here"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-item">
            <label htmlFor="due">Complete by:</label>
            <input
              type="date"
              name="due"
              id="due"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-item">
            <label htmlFor="priority">Priority level</label>
            <input
              type="range"
              min="0"
              max="2"
              id="priority"
              defaultValue="1"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-item">
            <input
              type="submit"
              value="Add task"
              onChange={this.handleChange}
            />
          </div>
        </form>
      </div>
    );
  }
}
export default EditForm;
