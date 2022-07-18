import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useMutation, useQuery } from 'react-query';
import { LoadTaskList, UpdateTask } from '@/domain/usecases';

type ChangeStatusParams = {
  taskId: string;
  statusId: string;
};

type TasksContextData = {
  taskList: LoadTaskList.Model[];
  changeTaskStatus: (params: ChangeStatusParams) => void;
};

type TasksContextProviderProps = {
  children: ReactNode;
  loadTaskList: LoadTaskList;
  updateTask: UpdateTask;
};

const TasksContext = createContext<TasksContextData>(null);

export function TasksContextProvider({
  children,
  loadTaskList,
  updateTask,
}: TasksContextProviderProps) {
  const { data, refetch } = useQuery('tasks', () => loadTaskList.loadAll());

  const updateTaskMutation = useMutation(
    (newTask: any) =>
      updateTask.update({ id: newTask.id, statusId: newTask.statusId }),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const changeTaskStatus = useCallback(
    ({ taskId, statusId }: ChangeStatusParams) => {
      updateTaskMutation.mutate({ id: taskId, statusId });
    },
    [],
  );

  const providerValue = useMemo(
    () => ({
      taskList: data ?? [],
      changeTaskStatus,
    }),
    [data],
  );

  return (
    <TasksContext.Provider value={providerValue}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext);
