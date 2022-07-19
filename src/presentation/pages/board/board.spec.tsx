/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import { fireEvent, screen, waitFor } from '@testing-library/react';
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

type SutTypes = {
  changeTaskStatus: jest.Mock;
};

const makeSut = (statusList = makeStatusList(), taskList = makeTaskList()) => {
  const changeTaskStatus = jest.fn();
  renderTheme(
    <TaskStatusesContext.Provider value={{ statusList }}>
      <TasksContext.Provider value={{ taskList, changeTaskStatus }}>
        <Board />,
      </TasksContext.Provider>
    </TaskStatusesContext.Provider>,
  );
  return {
    changeTaskStatus,
  };
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

  it('should not call changeTaskStatus if the status task is the first and the click is to left', async () => {
    const statusList = makeStatusList(3);
    const taskList = [{ ...makeTask(), statusId: statusList[0].id }];
    const { changeTaskStatus } = makeSut(statusList, taskList);
    fireEvent.click(screen.getByTestId('button-change-status-left'));
    await waitFor(() => {
      expect(changeTaskStatus).not.toHaveBeenCalled();
    });
  });

  it('should call changeTaskStatus if the status task is not the first and the click is to left', async () => {
    const statusList = makeStatusList(3);
    const taskList = [{ ...makeTask(), statusId: statusList[1].id }];
    const { changeTaskStatus } = makeSut(statusList, taskList);
    fireEvent.click(screen.getByTestId('button-change-status-left'));
    await waitFor(() => {
      expect(changeTaskStatus).toHaveBeenCalled();
    });
  });

  it('should not call changeTaskStatus if the status task is the last and the click is to right', async () => {
    const statusList = makeStatusList(3);
    const taskList = [{ ...makeTask(), statusId: statusList[2].id }];
    const { changeTaskStatus } = makeSut(statusList, taskList);
    fireEvent.click(screen.getByTestId('button-change-status-right'));
    await waitFor(() => {
      expect(changeTaskStatus).not.toHaveBeenCalled();
    });
  });

  it('should call changeTaskStatus if the status task is not the last and the click is to right', async () => {
    const statusList = makeStatusList(3);
    const taskList = [{ ...makeTask(), statusId: statusList[1].id }];
    const { changeTaskStatus } = makeSut(statusList, taskList);
    fireEvent.click(screen.getByTestId('button-change-status-right'));
    await waitFor(() => {
      expect(changeTaskStatus).toHaveBeenCalled();
    });
  });
});
