import { TasksContextProvider } from '@/presentation/contexts/tasks-context';
import { TaskStatusesContextProvider } from '@/presentation/contexts/tasks-status-context';
import { Board } from '@/presentation/pages/board';
import {
  makeRemoteLoadTaskList,
  makeRemoteLoadTaskStatusList,
  makeRemoteUpdateTask,
} from '../usecases';

export const makeBoard = () => (
  <TaskStatusesContextProvider
    loadTaskStatusList={makeRemoteLoadTaskStatusList()}
  >
    <TasksContextProvider
      loadTaskList={makeRemoteLoadTaskList()}
      updateTask={makeRemoteUpdateTask()}
    >
      <Board
        loadTaskList={makeRemoteLoadTaskList()}
        loadTaskStatusList={makeRemoteLoadTaskStatusList()}
        updateTask={makeRemoteUpdateTask()}
      />
    </TasksContextProvider>
  </TaskStatusesContextProvider>
);
