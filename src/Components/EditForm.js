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
      missingField: null,
      invalidDate: null,
    };
    // this.collectDataOnSubmit = this.collectDataOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.checkIfDateValid = this.checkIfDateValid.bind(this);
  }
  handleChange(e) {
    const target = e.target.id;
    const value = e.target.value;
    this.setState({ [target]: value });
  }
  sendData(e) {
    e.preventDefault();
    const { title, type, description, due, priority, completed } = this.state;
    const taskType = type;
    const newData = {
      title,
      description,
      due,
      priority,
      completed,
      identifier: uniqid(),
    };

    // handling case if user leaves field blank
    let missingDataField = this.findMissingField(newData);
    // handling case if date entered is in the past
    let dateIsValid = this.checkIfDateValid(newData.due);

    if (missingDataField) {
      const errorMessage = this.renderErrorMessage(missingDataField);
      this.setState({ missingField: errorMessage, invalidDate: null });
    } else if (!dateIsValid) {
      const errorMessage = <p>Date must be in the future</p>;
      this.setState({ missingField: null, invalidDate: errorMessage });
    } else if (!missingDataField && dateIsValid) {
      this.setState({ missingField: null, invalidDate: null });
      this.props.addTask(taskType, newData);
      this.props.closeEditor();
    }
  }

  findMissingField(data) {
    //returns name of blank data field or null if none found
    let missingField = null;
    for (const [key, value] of Object.entries(data)) {
      if (value === "") {
        missingField = key;
        break;
      }
    }
    return missingField;
  }
  renderErrorMessage(missingField) {
    //returns error helper text
    this.setState({ missingField: true });
    const possibleFields = {
      title: "title",
      description: "description",
      due: "due date",
    };
    return <p>Please enter a {possibleFields[missingField]}</p>;
  }
  checkIfDateValid(date) {
    const today = this.props.today;
    const itemDate = new Date(date);
    if (today - itemDate > 0) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const renderError = this.state.missingField;
    const dateIsInvalid = this.state.invalidDate;
    return (
      <div className="edit-form">
        {/* <button onClick={this.logData}>Log current data</button> */}
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
          <div className="error">
            {renderError}
            {dateIsInvalid}
          </div>
        </form>
      </div>
    );
  }
  componentDidUpdate() {
    console.log("hello, component updated");
  }
}
export default EditForm;
