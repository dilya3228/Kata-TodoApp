import { Component } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

export default class App extends Component {
  state = {
    data: [
      {
        description: 'Completed task',
        created: new Date(),
        id: 1,
        editing: false,
        completed: true,
      },
      {
        description: 'Editing task',
        created: new Date(),
        id: 2,
        editing: true,
        completed: false,
      },
      {
        description: 'Active task',
        created: new Date(),
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
    this.setState((state) => ({
      data: [
        ...state.data,
        {
          id: this.getId(),
          editing: false,
          completed: false,
          description: task,
          created: new Date(),
        },
      ],
    }));
  };

  onClearCompleted = () =>
    this.setState((state) => ({
      data: state.data.filter((task) => !task.completed),
    }));

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.onAddTask} />
        </header>
        <section className="main">
          <TaskList data={this.state.data} onCompleted={this.onCompleted} onDeleted={this.onDeleted} />
          <Footer onClearCompleted={this.onClearCompleted} />
        </section>
      </section>
    );
  }
}
