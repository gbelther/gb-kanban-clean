import { Board } from '@/presentation/pages/board';
import {
  makeRemoteLoadTaskList,
  makeRemoteLoadTaskStatusList,
  makeRemoteUpdateTask,
} from '../usecases';

export const makeBoard = () => (
  <Board
    loadTaskList={makeRemoteLoadTaskList()}
    loadTaskStatusList={makeRemoteLoadTaskStatusList()}
    updateTask={makeRemoteUpdateTask()}
  />
);
