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
  const [loadTaskListError, setLoadTaskListError] = useState('');
  const [loadTaskStatusListError, setLoadTaskStatusListError] = useState('');

  useEffect(() => {
    loadTaskList
      .loadAll()
      .then(taskList => setTasks(taskList))
      .catch(error => setLoadTaskListError(error.message));

    loadTaskStatusList
      .loadAll()
      .then(statusList => setStatuses(statusList))
      .catch(error => setLoadTaskStatusListError(error.message));
  }, []);

  console.log('tasks: ', tasks);
  console.log('loadTaskListError: ', loadTaskListError);
  console.log('statuses: ', statuses);
  console.log('loadTaskStatusListError: ', loadTaskStatusListError);

  return (
    <Sty.Container>
      <Sty.TaskGroup>
        <Sty.TaskGroupHeader>
          <Sty.TaskGroupTitle>TODO</Sty.TaskGroupTitle>
        </Sty.TaskGroupHeader>
        <Sty.TaskGroupContent>
          <TaskCard title="Task 01" content="Conteúdo da task" />
          <TaskCard title="Task 01" content="Conteúdo da task" />
          <TaskCard title="Task 01" content="Conteúdo da task" />
        </Sty.TaskGroupContent>
      </Sty.TaskGroup>
      <Sty.TaskGroup>
        <Sty.TaskGroupHeader>
          <Sty.TaskGroupTitle>DOING</Sty.TaskGroupTitle>
        </Sty.TaskGroupHeader>
        <Sty.TaskGroupContent>
          <TaskCard title="Task 01" content="Conteúdo da task" />
        </Sty.TaskGroupContent>
      </Sty.TaskGroup>
      <Sty.TaskGroup>
        <Sty.TaskGroupHeader>
          <Sty.TaskGroupTitle>DONE</Sty.TaskGroupTitle>
        </Sty.TaskGroupHeader>
        <Sty.TaskGroupContent>
          <TaskCard title="Task 01" content="Conteúdo da task" />
        </Sty.TaskGroupContent>
      </Sty.TaskGroup>
    </Sty.Container>
  );
}
