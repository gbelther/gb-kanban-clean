import { RemoteUpdateTask } from '@/data/usecases/remote-update-task';
import { UpdateTask } from '@/domain/usecases';
import { makeAxiosHttpClient, makeUrl } from '../http';

export const makeRemoteUpdateTask = (): UpdateTask =>
  new RemoteUpdateTask(makeUrl('/tasks'), makeAxiosHttpClient());
