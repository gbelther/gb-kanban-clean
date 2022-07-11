/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import { waitFor } from '@testing-library/react';
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

class LoadTaskListSpy implements LoadTaskList {
  taskList = makeTaskList();
  callsCount: number = 0;

  async loadAll(): Promise<LoadTaskList.Model[]> {
    this.callsCount++;
    return this.taskList;
  }
}

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

class LoadTaskStatusListSpy implements LoadTaskStatusList {
  statusList = makeStatusList();
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
});
