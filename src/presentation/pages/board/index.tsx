import { useEffect, useState } from 'react';
import { LoadTaskList } from '@/domain/usecases';
import { TaskCard } from './components/task-card';
import * as Sty from './styles';

type BoardParams = {
  loadTaskList: LoadTaskList;
};

export function Board({ loadTaskList }: BoardParams) {
  const [tasks, setTasks] = useState<LoadTaskList.Model[]>([]);
  const [loadTaskListError, setLoadTaskListError] = useState('');

  useEffect(() => {
    loadTaskList
      .loadAll()
      .then(taskList => setTasks(taskList))
      .catch(error => setLoadTaskListError(error.message));
  }, []);

  console.log('tasks: ', tasks);
  console.log('loadTaskListError: ', loadTaskListError);

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
