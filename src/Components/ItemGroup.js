import "./ItemGroup.css";
import React, { Component } from "react";
import ItemCard from "./ItemCard";
import uniqid from "uniqid";

class ItemGroup extends Component {
  constructor(props) {
    super(props);

    this.renderCards = this.renderCards.bind(this);
  }

  renderCards() {
    let cardArray = this.props.items;

    return cardArray.map((card) => {
      return (
        <ItemCard
          category={this.props.groupName.toLowerCase()}
          title={card.title}
          description={card.description}
          due={card.due}
          priority={card.priority}
          removeCard={this.props.removeCard}
          key={uniqid()}
          identifier={card.identifier}
          completed={card.completed}
          markComplete={this.props.markComplete}
          editTask={this.props.editTask}
        />
      );
    });
  }

  render() {
    // const itemCount = this.state.length;
    return (
      <div className="item-group" category={this.props.groupName}>
        <div className="group-heading">
          <h2>{this.props.groupName}</h2>
          <h3>
            ({this.props.items.length}{" "}
            {this.props.items.length === 1 ? "task" : "tasks"})
          </h3>
        </div>
        {this.renderCards()}
      </div>
    );
  }
}

export default ItemGroup;
