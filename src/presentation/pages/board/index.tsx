import { TaskCard } from './components/task-card';
import * as Sty from './styles';

export function Board() {
  return (
    <Sty.Container>
      <Sty.TaskGroup>
        <Sty.TaskGroupHeader>
          <Sty.TaskGroupTitle>TODO</Sty.TaskGroupTitle>
        </Sty.TaskGroupHeader>
        <Sty.TaskGroupContent>
          <TaskCard />
        </Sty.TaskGroupContent>
      </Sty.TaskGroup>
      <Sty.TaskGroup>
        <Sty.TaskGroupHeader>
          <Sty.TaskGroupTitle>DOING</Sty.TaskGroupTitle>
        </Sty.TaskGroupHeader>
        <Sty.TaskGroupContent>
          <TaskCard />
        </Sty.TaskGroupContent>
      </Sty.TaskGroup>
      <Sty.TaskGroup>
        <Sty.TaskGroupHeader>
          <Sty.TaskGroupTitle>DONE</Sty.TaskGroupTitle>
        </Sty.TaskGroupHeader>
        <Sty.TaskGroupContent>
          <TaskCard />
        </Sty.TaskGroupContent>
      </Sty.TaskGroup>
    </Sty.Container>
  );
}
