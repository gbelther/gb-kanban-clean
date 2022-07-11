import { Board } from '@/presentation/pages/board';
import {
  makeRemoteLoadTaskList,
  makeRemoteLoadTaskStatusList,
} from '../usecases';

export const makeBoard = () => (
  <Board
    loadTaskList={makeRemoteLoadTaskList()}
    loadTaskStatusList={makeRemoteLoadTaskStatusList()}
  />
);
