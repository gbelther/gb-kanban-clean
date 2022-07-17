import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.mainLight};
  border-radius: 4px;
  padding: 0.25rem;
  max-width: 220px;
  min-width: 140px;
  flex-grow: 1;
  flex-basis: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

export const Footer = styled.footer`
  height: min-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4px;
`;

export const ButtonChangeStatus = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.light01};
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.main};
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.dark04};
    border-color: ${({ theme }) => theme.colors.dark04};
  }
`;

export const IconToLeft = styled(AiOutlineLeft).attrs({
  size: 12,
})``;

export const IconToRight = styled(AiOutlineRight).attrs({
  size: 12,
})``;
