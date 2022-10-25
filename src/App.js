import React, { Component } from "react";
import "./App.css";
import uniqid from "uniqid";
import ItemGroup from "./Components/ItemGroup";
import newItem from "./Modules/newItem.js";
import EditForm from "./Components/EditForm";
import Overview from "./Components/Overview";
import { ReactComponent as PlusIcon } from "./Components/plus.svg";


class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          title: "Todo List",
          description: "Complete features of todo list project",
          due: "2022-11-29",
          priority: 2,
          completed: false,
          identifier: uniqid(),
        },
        {
          title: "Weather app",
          description: "learn APIs and async data handling",
          due: "2022-12-29",
          priority: 1,
          completed: false,
          identifier: uniqid(),
        },
      ],
      todos: [
        {
          title: "Run 5k",
          description: "run around neighborhood 3 times",
          due: "2023-10-26",
          priority: 1,
          completed: false,
          identifier: uniqid(),
        },
      ],
      goals: [
        {
          title: "Run a marathon",
          description: "digest food",
          due: "2023-10-27",
          priority: 0,
          completed: false,
          identifier: uniqid(),
        },
      ],
      isEditing: false,
    };
    this.addTask = this.addTask.bind(this);
    this.createToDo = this.createToDo.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.markAsComplete = this.markAsComplete.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
  }
  addNewItem() {
    console.log(newItem);
    this.addTask("goals", newItem);
    console.log(this.state.goals);
  }

  addTask(type, info) {
    this.setState((state) => {
      console.log(state);
      console.log(type);
      console.log(info);
      return { [type]: state[type].concat(info) };
    });
  }

  removeCard(e) {
    //done
    console.log(e.currentTarget.parentElement.getAttribute("identifier"));
    const taskIdentifier =
      e.currentTarget.parentElement.getAttribute("identifier");

    const taskCategory = e.currentTarget.parentElement
      .getAttribute("category")
      .toLowerCase();
    console.log(this.state[taskCategory]);
    let newTaskList = this.state[taskCategory].filter((task) => {
      return task.identifier != taskIdentifier;
    });
    console.log(newTaskList);
    this.setState({ [taskCategory]: newTaskList });
  }

  createToDo() {
    //defunct
    const projectArray = this.state.projects;
    const todoArray = this.state.todos;
    const goalArray = this.state.goals;
    console.log(projectArray);
    // console.log(projectArray[0].title);
    console.log(todoArray);
    console.log(goalArray);
    let projectItems = projectArray.map((project) => {
      const projectKey = uniqid();
      console.log(project.title);
      return (
        <p key={projectKey}>
          title: {project.title}, description: {project.description}
        </p>
      );
    });

    return (
      <div>
        Projects:
        {projectItems}
        {/* Todos:
        {todoItems}
        Goals:
        {goalItems} */}
      </div>
    );
  }
  markAsComplete(e) {
    //done
    const taskIdentifier =
      e.currentTarget.parentElement.getAttribute("identifier");
    const taskCategory = e.currentTarget.parentElement
      .getAttribute("category")
      .toLowerCase();
    let newTaskList = this.state[taskCategory];
    let selectedTask = newTaskList.filter(
      (task) => task.identifier === taskIdentifier
    ); //returns array of 1 item (selected task)

    selectedTask[0].completed = !selectedTask[0].completed; //sets completion status of selected item
    const indexOfSelectedTask = newTaskList.indexOf(selectedTask[0]); //find index of selected item in list

    newTaskList[indexOfSelectedTask] = selectedTask[0];
    this.setState({ [taskCategory]: newTaskList });
    // e.currentTarget.parentElement.getAttribute("identifier");

    //find card with matching identifier
    //update card data ('complete' property) to !complete
  }
  toggleEditor() {
    this.setState((state) => {
      return { isEditing: !state.isEditing };
    });
  }
  showEditor() {
    if (this.state.isEditing) {
      return <EditForm addTask={this.addTask} closeEditor={this.toggleEditor}/>;
    } else {
      return null;
    }
  }
  updateUpcoming(){
    //for this.state.projects, this.state.todos, this.state.goals
    //iterate through list and return items with due dates within 10 days
    //need to get today's date
    //date diff <= 10
    // max 5 items before scroll bar?
  }
  updateCompleted(){
    //for this.state.projects, this.state.todos, this.state.goals
    //iterate through list and return items with completed status
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Task Planner</h1>
          <div className="button-container">
            <button onClick={this.toggleEditor} id="add-task">
              Create Task <PlusIcon height={15 } width={15 } fill='white'/>
            </button>
          </div>
        </div>

        {this.showEditor()}
        {/* <button onClick={this.addNewItem}>Log new</button>  */}
        <div className="taskgroup-container">
          <ItemGroup
            groupName="Projects"
            items={this.state.projects}
            removeCard={this.removeCard}
            markComplete={this.markAsComplete}
          />
          <ItemGroup
            groupName="Todos"
            items={this.state.todos}
            removeCard={this.removeCard}
            markComplete={this.markAsComplete}
          />
          <ItemGroup
            groupName="Goals"
            items={this.state.goals}
            removeCard={this.removeCard}
            markComplete={this.markAsComplete}
          />
        </div>
        <div className="overview-container">
          <Overview upcoming={[]} completed={[]} />
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    // console.log(this.state);
  }
}

export default App;
