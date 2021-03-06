import { combineReducers } from 'redux';
import { sessionReducer } from './session_reducer';
import errorsReducer from './errors_reducer';
import { teamsReducer } from './team_reducer';
import { projectReducer } from './project_reducer';
import { membersReducer } from './members_reducer';
import { tasksReducer } from './tasks_reducer';
import { usersReducer } from './users_reducer';

export const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  teams: teamsReducer,
  projects: projectReducer,
  members: membersReducer,
  tasks: tasksReducer,
  user: usersReducer
});
