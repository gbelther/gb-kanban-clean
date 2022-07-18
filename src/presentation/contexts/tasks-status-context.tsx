import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { LoadTaskStatusList } from '@/domain/usecases';

type TaskStatusesContextData = {
  statusList: LoadTaskStatusList.Model[];
};

type TaskStatusesContextProviderProps = {
  children: ReactNode;
  loadTaskStatusList: LoadTaskStatusList;
};

export const TaskStatusesContext = createContext<TaskStatusesContextData>(null);

export function TaskStatusesContextProvider({
  children,
  loadTaskStatusList,
}: TaskStatusesContextProviderProps) {
  const { data } = useQuery('statuses', () => loadTaskStatusList.loadAll());

  const providerValue = useMemo(
    () => ({
      statusList: data ?? [],
    }),
    [data],
  );

  return (
    <TaskStatusesContext.Provider value={providerValue}>
      {children}
    </TaskStatusesContext.Provider>
  );
}

export const useTaskStatuses = () => useContext(TaskStatusesContext);
