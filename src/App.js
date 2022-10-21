import React, { Component } from "react";
import "./App.css";
import uniqid from "uniqid";
import ItemGroup from "./Components/ItemGroup";
import newItem from "./Modules/newItem.js";
import EditForm from "./Components/EditForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          title: "project 0",
          description: "eat food",
          due: "march",
          priority: 2,
          completed: false,
          identifier: uniqid(),
        },
        {
          title: "project 1",
          description: "drink water",
          due: "feb",
          priority: 1,
          completed: false,
          identifier: uniqid(),
        },
      ],
      todos: [
        {
          title: "todo 0",
          description: "cook food",
          due: "april",
          priority: 1,
          completed: false,
          identifier: uniqid(),
        },
      ],
      goals: [
        {
          title: "goal 0",
          description: "digest food",
          due: "may",
          priority: 0,
          completed: false,
          identifier: uniqid(),
        },
      ],
      isEditing: true,
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
    //done
    console.log(e.currentTarget.parentElement.getAttribute("identifier"));
    const taskIdentifier =
      e.currentTarget.parentElement.getAttribute("identifier");

    const taskCategory = e.currentTarget.parentElement.parentElement
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
    const taskCategory = e.currentTarget.parentElement.parentElement
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
      return <EditForm addTask={this.addTask} />;
    } else {
      return null;
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Task Planner</h1>
        <button onClick={this.toggleEditor}>Open editor</button>
        {this.showEditor()}
        <button onClick={this.addNewItem}>Log new</button> {/* for testing */}
        <div className="container">
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
      </div>
    );
  }
  componentDidUpdate() {
    // console.log(this.state);
  }
}

export default App;
