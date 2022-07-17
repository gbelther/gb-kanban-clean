import * as Sty from './styles';

type TaskCardProps = {
  title: string;
  content: string;
  onStatusLeftButton: () => void;
  onStatusRightButton: () => void;
};

export function TaskCard({
  title = '',
  content = '',
  onStatusLeftButton,
  onStatusRightButton,
}: TaskCardProps) {
  return (
    <Sty.Container data-testid="task-card">
      <Sty.Header>
        <Sty.Title>{title}</Sty.Title>
      </Sty.Header>
      <Sty.ContentBox>
        <Sty.Content>{content}</Sty.Content>
      </Sty.ContentBox>
      <Sty.Footer>
        <Sty.ButtonChangeStatus
          data-testid="button-change-status"
          onClick={onStatusLeftButton}
        >
          <Sty.IconToLeft />
        </Sty.ButtonChangeStatus>
        <Sty.ButtonChangeStatus onClick={onStatusRightButton}>
          <Sty.IconToRight />
        </Sty.ButtonChangeStatus>
      </Sty.Footer>
    </Sty.Container>
  );
}
