import { Component } from 'react';

export default class Task extends Component {
  render() {
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={this.props.onCompleted} />
        <div className="label">
          <span className="description">{this.props.el.description}</span>
          <span className="created">{this.props.el.created}</span>
        </div>
        <button type="button" className="icon icon-edit">
          {}
        </button>
        <button type="button" className="icon icon-destroy">
          {}
        </button>
      </div>
    );
  }
}
