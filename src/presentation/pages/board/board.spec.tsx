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

const makeUpdateTaskModel = (): UpdateTask.Model => ({
  id: faker.datatype.uuid(),
  title: faker.random.word(),
  content: faker.random.words(),
  statusId: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
});

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

class UpdateTaskSpy implements UpdateTask {
  task = makeUpdateTaskModel();
  callsCount: number = 0;

  async update(data: UpdateTask.Params): Promise<UpdateTask.Model> {
    this.callsCount++;
    return this.task;
  }
}

type SutTypes = {
  loadTaskListSpy: LoadTaskListSpy;
  loadTaskStatusListSpy: LoadTaskStatusListSpy;
};

const makeSut = (
  statusList = makeStatusList(),
  taskList = makeTaskList(),
): SutTypes => {
  const loadTaskListSpy = new LoadTaskListSpy();
  const loadTaskStatusListSpy = new LoadTaskStatusListSpy();
  const updateTaskSpy = new UpdateTaskSpy();

  renderTheme(
    <TaskStatusesContext.Provider value={{ statusList }}>
      <TasksContext.Provider value={{ taskList, changeTaskStatus: jest.fn() }}>
        <Board
          loadTaskList={loadTaskListSpy}
          loadTaskStatusList={loadTaskStatusListSpy}
          updateTask={updateTaskSpy}
        />
        ,
      </TasksContext.Provider>
    </TaskStatusesContext.Provider>,
  );
  return {
    loadTaskListSpy,
    loadTaskStatusListSpy,
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

  // it('should call loadTaskStatusList when the page loaded', async () => {
  //   const { loadTaskStatusListSpy } = makeSut();
  //   await waitFor(() => {
  //     expect(loadTaskStatusListSpy.callsCount).toBe(1);
  //   });
  // });

  // it('should render statuses column when loadTaskStatusList returns statuses', async () => {
  //   makeSut();
  //   const statusColumns = await screen.findAllByTestId('status-column');
  //   expect(statusColumns.length).toBeGreaterThanOrEqual(1);
  // });

  // it('should render tasks cards when loadTaskList returns tasks', async () => {
  //   makeSut();
  //   const tasks = await screen.findAllByTestId('task-card');
  //   expect(tasks.length).toBeGreaterThanOrEqual(1);
  // });
});
