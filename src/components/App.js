import { Component } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

export default class App extends Component {
  state = {
    data: [
      {
        description: 'Completed task',
        createdAt: new Date(),
        id: 1,
        editing: false,
        completed: true,
      },
      {
        description: 'Editing task',
        createdAt: new Date(),
        id: 2,
        editing: true,
        completed: false,
      },
      {
        description: 'Active task',
        createdAt: new Date(),
        id: 3,
        editing: false,
        completed: false,
      },
    ],
  };

  onCompleted = (id) => {
    this.setState((state) => ({
      data: state.data.map((task) => {
        if (task.id === id) return { ...task, completed: !task.completed };
        return { ...task };
      }),
    }));
  };

  onDeleted = (id) => {
    this.setState((state) => ({
      data: state.data.filter((task) => task.id !== id),
    }));
  };

  getId = () => this.state.data.reduce((maxId, data) => (maxId < data.id ? data.id : maxId), 0) + 1;

  onAddTask = (task) => {
    if (task.length > 0 && task.trim().length > 0) {
      this.setState((state) => ({
        data: [
          ...state.data,
          {
            id: this.getId(),
            editing: false,
            completed: false,
            description: task,
            createdAt: new Date(),
          },
        ],
      }));
    }
  };

  onChangeFilter = (filter) =>
    this.setState({
      filter,
    });

  onChangeDescription = (id, newDescription) =>
    this.setState((state) => ({
      data: state.data.map((task) => ({
        ...task,
        editing: !task.id === id,
        description: task.id === id ? newDescription : task.description,
      })),
    }));

  onEditDescription = (id) =>
    this.setState((state) => ({
      data: state.data.map((task) => ({
        ...task,
        editing: task.id === id,
      })),
    }));

  onClearCompleted = () =>
    this.setState((state) => ({
      data: state.data.filter((task) => !task.completed),
    }));

  render() {
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.onAddTask} />
        </header>
        <div className="main">
          <TaskList
            data={this.state.data}
            onCompleted={this.onCompleted}
            onDeleted={this.onDeleted}
            onEditDescription={this.onEditDescription}
            onChangeDescription={this.onChangeDescription}
            filter={this.state.filter}
          />
          <Footer
            data={this.state.data}
            onClearCompleted={this.onClearCompleted}
            filter={this.state.filter}
            onChangeFilter={this.onChangeFilter}
          />
        </div>
      </div>
    );
  }
}
