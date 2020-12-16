import React, { ReactNode, useState, useCallback } from 'react';
import { Wrapper, Header, Title, Body } from './styles';

interface ICollapse {
  title: string;
  children: ReactNode;
}

const Collapse = ({ title, children }: ICollapse) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = useCallback(() => {
    setIsVisible(isVisible => !isVisible);
  }, []);

  return (
    <Wrapper>
      <Header onPress={handleVisible}>
        <Title>{title}</Title>
      </Header>
      {isVisible && <Body>{children}</Body>}
    </Wrapper>
  );
};

export default React.memo(Collapse);
