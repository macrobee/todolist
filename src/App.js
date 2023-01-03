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
        // {
        //   title: "Todo List",
        //   description: "Complete features of todo list project",
        //   due: "2022-11-29",
        //   priority: 2,
        //   completed: false,
        //   identifier: "asdfadsf1",
        // },
        // {
        //   title: "Weather app",
        //   description: "learn APIs and async data handling",
        //   due: "2022-12-29",
        //   priority: 1,
        //   completed: false,
        //   identifier: "asdfadsf2",
        // },
      ],
      todos: [
        // {
        //   title: "Run 5k",
        //   description: "run around neighborhood 3 times",
        //   due: "2023-10-26",
        //   priority: 1,
        //   completed: false,
        //   identifier: "asdfadsf3",
        // },
      ],
      goals: [
        // {
        //   title: "Run a marathon",
        //   description: "digest food",
        //   due: "2023-10-27",
        //   priority: 0,
        //   completed: false,
        //   identifier: "asdfadsf4",
        // },
      ],
      isEditing: false,
      today: null,
    };
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.markAsComplete = this.markAsComplete.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.makeUpcomingList = this.makeUpcomingList.bind(this);
    this.makeCompletedList = this.makeCompletedList.bind(this);
  }
  componentDidMount() {
    const today = new Date(new Date().toISOString().slice(0, 10));
    this.setState({ today });
    if (localStorage.length) {
      const savedProjects = JSON.parse(localStorage.getItem("projects"));
      const savedTodos = JSON.parse(localStorage.getItem("todos"));
      const savedGoals = JSON.parse(localStorage.getItem("goals"));
     
      this.setState({
        projects: savedProjects ? savedProjects : [],
        todos: savedTodos ? savedProjects: [],
        goals: savedGoals ? savedGoals: [],
      });
    } else {
      this.setState({ projects: [], todos: [], goals: [] });
    }
  }

  async addTask(type, info) {
    await this.setState((state) => {
      return { [type]: state[type].concat(info) };
    });

    this.saveToLocalStorage();
  }
  editTask(newTaskData, category) {
    let updatedTaskList = this.state[category].map((task) => {
      if (task.identifier !== newTaskData.identifier) {
        return task;
      } else {
        return newTaskData;
      }
    });
    this.setState({ [category]: updatedTaskList });
  }
  saveToLocalStorage() {
    localStorage.clear();
    window.localStorage.setItem(
      "projects",
      JSON.stringify(this.state.projects)
    );
    window.localStorage.setItem("todos", JSON.stringify(this.state.todos));
    window.localStorage.setItem("goals", JSON.stringify(this.state.goals));
  }
  removeCard(e) {
    //done
    const taskIdentifier =
      e.currentTarget.parentElement.getAttribute("identifier");

    const taskCategory = e.currentTarget.parentElement
      .getAttribute("category")
      .toLowerCase();
    let newTaskList = this.state[taskCategory].filter((task) => {
      return task.identifier !== taskIdentifier;
    });
    this.setState({ [taskCategory]: newTaskList });
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
      return (
        <EditForm
          addTask={this.addTask}
          closeEditor={this.toggleEditor}
          today={this.state.today}
        />
      );
    } else {
      return null;
    }
  }
  makeUpcomingList() {
    const { projects, todos, goals } = this.state;
    let allTasks;
    if (projects.length >0 || todos.length >0 || goals.length>0) {
      allTasks = [...projects, ...todos, ...goals];
    } else {
      allTasks = [];
    }
    let incompleteTasks = allTasks.filter((task) => {
      return task.completed === false;
    });

    let sortedList = incompleteTasks.sort((currTask, prevTask) => {
      const currTaskDate = new Date(currTask.due);
      const prevTaskDate = new Date(prevTask.due);
      return currTaskDate - prevTaskDate;
    });
    return sortedList.length > 5 ? sortedList.slice(0, 5) : sortedList;
  }
  makeCompletedList() {
    const { projects, todos, goals } = this.state;
    const allTasks = [...projects, ...todos, ...goals];

    let completedTaskList = allTasks.filter((task) => {
      return task.completed === true;
    });
    //for this.state.projects, this.state.todos, this.state.goals
    //iterate through list and return items with completed status
    return completedTaskList;
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Task Planner</h1>
          <div className="button-container">
            <button onClick={this.toggleEditor} id="add-task">
              Create Task <PlusIcon height={15} width={15} fill="white" />
            </button>
          </div>
        </div>

        {this.showEditor()}
        <div className="taskgroup-container">
          <ItemGroup
            groupName="Todos"
            items={this.state.todos}
            removeCard={this.removeCard}
            markComplete={this.markAsComplete}
            editTask={this.editTask}
          />
          <ItemGroup
            groupName="Projects"
            items={this.state.projects}
            removeCard={this.removeCard}
            markComplete={this.markAsComplete}
            editTask={this.editTask}
          />

          <ItemGroup
            groupName="Goals"
            items={this.state.goals}
            removeCard={this.removeCard}
            markComplete={this.markAsComplete}
            editTask={this.editTask}
          />
        </div>
        <div className="overview-container">
          <Overview
            upcoming={this.makeUpcomingList()}
            completed={this.makeCompletedList()}
            today={this.state.today}
          />
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    this.saveToLocalStorage();
  }
}

export default App;
