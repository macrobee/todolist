import "./ItemCard.css";
import React, { Component } from "react";
import { ReactComponent as Trash } from "./trash.svg";
import { ReactComponent as Edit } from "./edit.svg";
import { ReactComponent as Circle } from "./circle.svg";
import { ReactComponent as CheckMark } from "./checkmark.svg";
import { ReactComponent as Expand } from "./expand.svg";
import { ReactComponent as Collapse } from "./collapse.svg";

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleCollapseIcon = this.toggleCollapseIcon.bind(this);
    this.isItemCollapsed = this.isItemCollapsed.bind(this);
    this.completionCheck = this.completionCheck.bind(this);
    this.translatePriority = this.translatePriority.bind(this);
    // this.markAsComplete = this.markAsComplete.bind(this);
  }
  toggleCollapse() {
    this.setState((state) => {
      return { collapsed: !state.collapsed };
    });
  }
  toggleCollapseIcon() {
    return this.state.collapsed ? (
      <Expand height={20} width={20} onClick={this.toggleCollapse} />
    ) : (
      <Collapse height={20} width={20} onClick={this.toggleCollapse} />
    );
  }
  isItemCollapsed() {
    return this.state.collapsed ? "collapsed" : "expanded";
  }
  completionCheck() {
    return this.props.completed ? (
      <CheckMark
        height={20}
        width={20}
        onClick={this.props.markComplete}
        fill="green"
      />
    ) : (
      <Circle height={18} width={18} onClick={this.props.markComplete} />
    );
  }
  translatePriority() {
    let descriptor;
    if (this.props.priority === 0) {
      descriptor = "low";
    } else if (this.props.priority === 1) {
      descriptor = "medium";
    } else {
      descriptor = "high";
    }
    return descriptor;
  }

  render() {
    return (
      <div
        className={
          `item-card ` +
          ` item-` +
          this.isItemCollapsed() +
          ` priority-` +
          this.props.priority
        }
        identifier={this.props.identifier}
      >
        <div
          className="card-heading"
          identifier={this.props.identifier}
          category={this.props.category}
        >
          {this.completionCheck()}
          <h3 className="card-title">{this.props.title}</h3>
        </div>
        <p className="card-due">due {this.props.due}</p>
        <div
          className="card-actions"
          identifier={this.props.identifier}
          category={this.props.category}
        >
          <Trash height={20} width={20} onClick={this.props.removeCard} />
          <Edit height={18} width={18} />
          {this.toggleCollapseIcon()}
        </div>

        <div className="card-description">
          <p className="description-text">{this.props.description}</p>
        </div>
        <div className="card-priority">
          <p className="priority-text">{this.translatePriority()} priority</p>
        </div>
        {/* <p className="card-completion" >{this.completionCheck()}</p>  */}
      </div>
    );
  }
  //   componentDidUpdate(){
  //     this.completionCheck();
  //   }
}

export default ItemCard;
