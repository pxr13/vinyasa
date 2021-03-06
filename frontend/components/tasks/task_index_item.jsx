import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

export class TaskIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.task.title,
      id: this.props.task.id
    };
    this.completeTask = this.completeTask.bind(this);
    this.updateField = this.updateField.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  updateField(e) {
    if (this.state.title !== e.target.value) {
      this.setState({title: e.target.value}, () => {
        this.props.updateTaskInStore(this.state);
      });
    }
  }

  updateTask() {
    this.props.updateTask(this.state);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTask) {
      if (Number(nextProps.currentTask.id) === this.state.id) {
        this.setState({title: nextProps.currentTask.title});
      }
    }
  }

  completeTask() {
    let pathname = this.props.history.location.pathname.split('/');
    let id = Number(this.props.history.location.pathname.match(/\d+/));
    let action;
    if (pathname[2] === 'projects') {
      action = this.props.fetchProject;
    } else if (pathname[2] === 'users') {
      action = this.props.fetchUser;
    } else if (pathname[1] === 'dashboard') {
      action = this.props.fetchUser;
      id = this.props.currentUser.id;
    }
    this.props.deleteTask(this.props.task.id)
      .then(() => action(id));
  }

  render() {
    let pathname = this.props.history.location.pathname.split('/');
    let id = Number(this.props.history.location.pathname.match(/\d+/));
    if (pathname[2] === 'projects') {
      pathname = 'projects';
    } else if (pathname[2] === 'users') {
      pathname = 'users';
    } else if (pathname[1] === 'dashboard') {
      pathname = 'users';
      id = this.props.currentUser.id;
    }

    return (
      <div className="task-item">
        <Link to={`/dashboard/${pathname}/${id}/tasks/${this.props.task.id}`}>
        <div className="task-content">
          <div className="checkbox">
            <svg onClick={this.completeTask} className="Icon PlusIcon CompleteIcon Small" viewBox="0 0 32 32">
              <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615">
              </polygon>
            </svg>
          </div>
              <textarea
                id={this.state.id}
                onBlur={this.updateTask}
                placeholder="Write a task name"
                value={this.state.title}
                className="task-name-input"
                onChange={this.updateField}
                rows="1"
                />
        </div>
      </Link>
      </div>
    );
  }
}
