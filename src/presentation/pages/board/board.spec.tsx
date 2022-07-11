/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import { screen, waitFor } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { LoadTaskList, LoadTaskStatusList } from '@/domain/usecases';
import { renderTheme } from '@/main/config/tests/renderTheme';
import { Board } from '.';

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

const statusListFake: LoadTaskStatusList.Model[] = makeStatusList();
const taskListFake: LoadTaskList.Model[] = makeTaskList().map(task => ({
  ...task,
  statusId:
    statusListFake[Math.floor(Math.random() * statusListFake.length)].id,
}));

class LoadTaskListSpy implements LoadTaskList {
  taskList = taskListFake;
  callsCount: number = 0;

  async loadAll(): Promise<LoadTaskList.Model[]> {
    this.callsCount++;
    return this.taskList;
  }
}

class LoadTaskStatusListSpy implements LoadTaskStatusList {
  statusList = statusListFake;
  callsCount: number = 0;

  async loadAll(): Promise<LoadTaskStatusList.Model[]> {
    this.callsCount++;
    return this.statusList;
  }
}

type SutTypes = {
  loadTaskListSpy: LoadTaskListSpy;
  loadTaskStatusListSpy: LoadTaskStatusListSpy;
};

const makeSut = (): SutTypes => {
  const loadTaskListSpy = new LoadTaskListSpy();
  const loadTaskStatusListSpy = new LoadTaskStatusListSpy();
  renderTheme(
    <Board
      loadTaskList={loadTaskListSpy}
      loadTaskStatusList={loadTaskStatusListSpy}
    />,
  );
  return {
    loadTaskListSpy,
    loadTaskStatusListSpy,
  };
};

describe('<Board />', () => {
  it('should call loadTaskList when the page loaded', async () => {
    const { loadTaskListSpy } = makeSut();
    await waitFor(() => {
      expect(loadTaskListSpy.callsCount).toBe(1);
    });
  });

  it('should call loadTaskStatusList when the page loaded', async () => {
    const { loadTaskStatusListSpy } = makeSut();
    await waitFor(() => {
      expect(loadTaskStatusListSpy.callsCount).toBe(1);
    });
  });

  it('should render statuses column when loadTaskStatusList returns statuses', async () => {
    makeSut();
    const statusColumns = await screen.findAllByTestId('status-column');
    expect(statusColumns.length).toBeGreaterThanOrEqual(1);
  });

  it('should render tasks cards when loadTaskList returns tasks', async () => {
    makeSut();
    const tasks = await screen.findAllByTestId('task-card');
    expect(tasks.length).toBeGreaterThanOrEqual(1);
  });
});
