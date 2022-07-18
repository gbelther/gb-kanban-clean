/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import { screen, waitFor } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import {
  LoadTaskList,
  LoadTaskStatusList,
  UpdateTask,
} from '@/domain/usecases';
import { renderTheme } from '@/main/config/tests/renderTheme';
import { Board } from '.';
import { TaskStatusesContext } from '@/presentation/contexts/tasks-status-context';
import { TasksContext } from '@/presentation/contexts/tasks-context';

const makeTask = (): LoadTaskList.Model => ({
  id: faker.datatype.uuid(),
  title: faker.random.word(),
  content: faker.hacker.phrase(),
  statusId: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
});

const makeTaskList = (length: number = 3): LoadTaskList.Model[] => {
  const taskList: LoadTaskList.Model[] = [];
  for (let i = 0; i < length; i++) {
    taskList.push(makeTask());
  }
  return taskList;
};

const makeStatus = (order: number): LoadTaskStatusList.Model => ({
  id: faker.datatype.uuid(),
  name: faker.random.word(),
  order,
});

const makeStatusList = (length: number = 3): LoadTaskStatusList.Model[] => {
  const statusList: LoadTaskStatusList.Model[] = [];
  for (let i = 0; i < length; i++) {
    statusList.push(makeStatus(i + 1));
  }
  return statusList;
};

const makeSut = (statusList = makeStatusList(), taskList = makeTaskList()) => {
  renderTheme(
    <TaskStatusesContext.Provider value={{ statusList }}>
      <TasksContext.Provider value={{ taskList, changeTaskStatus: jest.fn() }}>
        <Board />,
      </TasksContext.Provider>
    </TaskStatusesContext.Provider>,
  );
};

describe('<Board />', () => {
  it('should render statuses correctly', async () => {
    const statusList = makeStatusList(2);
    makeSut(statusList);
    await waitFor(() => {
      expect(screen.getAllByTestId('status-column')).toHaveLength(2);
      expect(screen.queryByText(statusList[0].name)).toBeTruthy();
      expect(screen.queryByText(statusList[1].name)).toBeTruthy();
    });
  });

  it('should render tasks correctly', async () => {
    const statusList = makeStatusList(2);
    const taskList = [
      { ...makeTask(), statusId: statusList[0].id },
      { ...makeTask(), statusId: statusList[1].id },
    ];
    makeSut(statusList, taskList);
    await waitFor(() => {
      expect(screen.getAllByTestId('task-card')).toHaveLength(2);
    });
  });
});
