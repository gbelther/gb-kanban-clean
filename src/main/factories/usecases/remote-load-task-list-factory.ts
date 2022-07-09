import { RemoteLoadTaskList } from '@/data/usecases/remote-load-task-list';
import { LoadTaskList } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/authorize-http-client-decorator-factory';
import { makeUrl } from '../http';

export const makeRemoteLoadTaskList = (): LoadTaskList =>
  new RemoteLoadTaskList(makeUrl('/tasks'), makeAuthorizeHttpClientDecorator());
