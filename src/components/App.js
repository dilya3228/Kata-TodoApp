import { Component } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

export default class App extends Component {
  state = {
    data: [
      {
        description: 'Completed task',
        created: 'created 17 seconds ago',
        id: 1,
        editing: false,
        completed: true,
      },
      {
        description: 'Editing task',
        created: 'created 5 minutes ago',
        id: 2,
        editing: true,
        completed: false,
      },
      {
        description: 'Active task',
        created: 'created 5 minutes ago',
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

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList data={this.state.data} onCompleted={this.onCompleted} onDeleted={this.onDeleted} />
          <Footer />
        </section>
      </section>
    );
  }
}
