import { Board } from '@/presentation/pages/board';
import { makeRemoteLoadTaskList } from '../usecases';

export const makeBoard = () => (
  <Board loadTaskList={makeRemoteLoadTaskList()} />
);
