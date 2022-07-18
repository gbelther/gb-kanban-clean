import { TaskCard } from './components/task-card';
import { useTasks } from '@/presentation/contexts/tasks-context';
import { useTaskStatuses } from '@/presentation/contexts/tasks-status-context';
import * as Sty from './styles';

export function Board() {
  const { statusList: statuses } = useTaskStatuses();
  const { taskList: tasks, changeTaskStatus } = useTasks();

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
    changeTaskStatus({ taskId, statusId: statusByOrder.id });
  };

  const handleStatusRightChange = async (
    taskId: string,
    statusOrder: number,
  ) => {
    if (statusOrder === statuses.length) return;
    const statusByOrder = statuses.find(
      status => status.order === statusOrder + 1,
    );
    changeTaskStatus({ taskId, statusId: statusByOrder.id });
  };

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
