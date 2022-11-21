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
    if (task.length > 0 && task.trim().length > 0) {
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
    }
  };

  onClearCompleted = () =>
    this.setState((state) => ({
      data: state.data.filter((task) => !task.completed),
    }));

  toggleProperty = (arr, id, property, property2 = null) => {
    const newArr = arr.map((element) => {
      if (element.id === id) {
        element = { ...element, [property]: !element[property], [property2]: !element[property2] };
      }
      return element;
    });
    return newArr;
  };

  onToggleEdit = (id) => {
    this.setState(({ data }) => ({ data: this.toggleProperty(data, id, 'editing') }));
  };

  updateTask = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        const id = e.currentTarget.parentNode.getAttribute('id');
        const newEl = this.createTask(e.target.value);
        this.setState(({ data }) => {
          const newArr = data.map((el) => {
            if (el.id === +id) {
              el = newEl;
            }
            return el;
          });
          return { data: newArr };
        });
      }
    }
  };

  changeFilter = (filter) =>
    this.setState({
      filter,
    });

  createTask(task) {
    return {
      description: task,
      id: this.getId(),
      created: new Date(),
      completed: false,
      editing: false,
    };
  }

  render() {
    const todoCount = this.state.data.filter((el) => !el.completed).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.onAddTask} />
        </header>
        <section className="main">
          <TaskList
            data={this.state.data}
            onCompleted={this.onCompleted}
            onDeleted={this.onDeleted}
            updateTask={this.updateTask}
            onToggleEdit={this.onToggleEdit}
            filter={this.state.filter}
          />
          <Footer
            onClearCompleted={this.onClearCompleted}
            todoCount={todoCount}
            filter={this.state.filter}
            onChangeFilter={this.changeFilter}
          />
        </section>
      </section>
    );
  }
}
