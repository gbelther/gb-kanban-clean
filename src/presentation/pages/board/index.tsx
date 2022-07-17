import { useEffect, useState } from 'react';
import {
  LoadTaskList,
  LoadTaskStatusList,
  UpdateTask,
} from '@/domain/usecases';
import { TaskCard } from './components/task-card';
import * as Sty from './styles';

type BoardParams = {
  loadTaskList: LoadTaskList;
  loadTaskStatusList: LoadTaskStatusList;
  updateTask: UpdateTask;
};

export function Board({
  loadTaskList,
  loadTaskStatusList,
  updateTask,
}: BoardParams) {
  const [tasks, setTasks] = useState<LoadTaskList.Model[]>([]);
  const [statuses, setStatuses] = useState<LoadTaskStatusList.Model[]>([]);

  const filterTasksByStatusId = (statusId: string) =>
    tasks.filter(task => task.statusId === statusId);

  const handleStatusLeftChange = async (
    taskId: string,
    statusOrder: number,
  ) => {
    if (statusOrder === 0) return;
    const statusByOrder = statuses.find(
      status => status.order === statusOrder - 1,
    );
    await updateTask.update({ id: taskId, statusId: statusByOrder.id });
  };

  const handleStatusRightChange = async (
    taskId: string,
    statusOrder: number,
  ) => {
    if (statusOrder === statuses.length) return;
    const statusByOrder = statuses.find(
      status => status.order === statusOrder + 1,
    );
    await updateTask.update({ id: taskId, statusId: statusByOrder.id });
  };

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
        <Sty.TaskGroup data-testid="status-column" key={status.id}>
          <Sty.TaskGroupHeader>
            <Sty.TaskGroupTitle>{status.name}</Sty.TaskGroupTitle>
          </Sty.TaskGroupHeader>
          <Sty.TaskGroupContent>
            {filterTasksByStatusId(status.id).map(task => (
              <TaskCard
                key={task.id}
                title={task.title}
                content={task.content}
                onStatusLeftButton={() =>
                  handleStatusLeftChange(task.id, status.order)
                }
                onStatusRightButton={() =>
                  handleStatusRightChange(task.id, status.order)
                }
              />
            ))}
          </Sty.TaskGroupContent>
        </Sty.TaskGroup>
      ))}
    </Sty.Container>
  );
}
