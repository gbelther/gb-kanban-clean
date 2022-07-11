import * as Sty from './styles';

type TaskCardProps = {
  title: string;
  content: string;
};

export function TaskCard({ title = '', content = '' }: TaskCardProps) {
  return (
    <Sty.Container>
      <Sty.Header>
        <Sty.Title>{title}</Sty.Title>
      </Sty.Header>
      <Sty.ContentBox>
        <Sty.Content>{content}</Sty.Content>
      </Sty.ContentBox>
    </Sty.Container>
  );
}
