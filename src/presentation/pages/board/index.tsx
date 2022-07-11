import { useEffect, useState } from 'react';
import { LoadTaskList, LoadTaskStatusList } from '@/domain/usecases';
import { TaskCard } from './components/task-card';
import * as Sty from './styles';

type BoardParams = {
  loadTaskList: LoadTaskList;
  loadTaskStatusList: LoadTaskStatusList;
};

export function Board({ loadTaskList, loadTaskStatusList }: BoardParams) {
  const [tasks, setTasks] = useState<LoadTaskList.Model[]>([]);
  const [statuses, setStatuses] = useState<LoadTaskStatusList.Model[]>([]);

  const filterTasksByStatusId = (statusId: string) =>
    tasks.filter(task => task.statusId === statusId);

  useEffect(() => {
    loadTaskList.loadAll().then(taskList => setTasks(taskList));

    loadTaskStatusList.loadAll().then(statusList =>
      setStatuses(
        statusList.sort((a, b) => {
          if (a.order > b.order) return 1;
          if (a.order < b.order) return -1;
          return 0;
        }),
      ),
    );
  }, []);

  return (
    <Sty.Container>
      {statuses.map(status => (
        <Sty.TaskGroup key={status.id}>
          <Sty.TaskGroupHeader>
            <Sty.TaskGroupTitle>{status.name}</Sty.TaskGroupTitle>
          </Sty.TaskGroupHeader>
          <Sty.TaskGroupContent>
            {filterTasksByStatusId(status.id).map(task => (
              <TaskCard
                key={task.id}
                title={task.title}
                content={task.content}
              />
            ))}
          </Sty.TaskGroupContent>
        </Sty.TaskGroup>
      ))}
    </Sty.Container>
  );
}
