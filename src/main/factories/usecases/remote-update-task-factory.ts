import { RemoteUpdateTask } from '@/data/usecases/remote-update-task';
import { UpdateTask } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/authorize-http-client-decorator-factory';
import { makeUrl } from '../http';

export const makeRemoteUpdateTask = (): UpdateTask =>
  new RemoteUpdateTask(makeUrl('/tasks'), makeAuthorizeHttpClientDecorator());
