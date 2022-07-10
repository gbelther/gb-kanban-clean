import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.mainLight};
  border-radius: 4px;
  padding: 0.25rem;
  max-width: 250px;
`;

export const Header = styled.header`
  padding: 0.25rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainDark};
`;

export const Title = styled.h4``;

export const ContentBox = styled.section`
  padding: 0.25rem 0;
`;

export const Content = styled.p`
  font-size: 0.875rem;
  text-align: justify;
`;
