import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
`;

export const TaskGroup = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.main};
  border-radius: 8px;
  padding: 0.5rem;
`;

export const TaskGroupHeader = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.main};
`;

export const TaskGroupTitle = styled.h3`
  text-align: center;
`;

export const TaskGroupContent = styled.section`
  padding: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex-basis: 0px;
`;
