import { RemoteLoadTaskStatusList } from '@/data/usecases/remote-load-task-status-list';
import { LoadTaskStatusList } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/authorize-http-client-decorator-factory';
import { makeUrl } from '../http';

export const makeRemoteLoadTaskStatusList = (): LoadTaskStatusList =>
  new RemoteLoadTaskStatusList(
    makeUrl('/statuses'),
    makeAuthorizeHttpClientDecorator(),
  );
