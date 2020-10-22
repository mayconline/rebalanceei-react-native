import React, { useContext, useRef } from 'react';
import { ScrollView } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

import { Wrapper, Title, FiltersContainer, Filter, TextFilter } from './styles';
import { formatFilter } from '../../utils/format';

interface ISubHeaderProps {
  title: string;
  filters?: IFilters[];
  onPress(filter: string): void;
}

interface IFilters {
  name: string;
  focused: boolean;
}

const SubHeader: React.FC<ISubHeaderProps> = ({
  title,
  filters,
  onPress,
  children,
}) => {
  const { color } = useContext(ThemeContext);

  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
      <FiltersContainer>
        <ScrollView
          horizontal={true}
          centerContent={true}
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef?.current?.scrollToEnd({ animated: true })
          }
        >
          {filters?.map(filter => (
            <Filter key={filter.name} onPress={() => onPress(filter.name)}>
              <TextFilter focused={filter.focused}>
                {formatFilter(filter.name)}
              </TextFilter>
            </Filter>
          ))}
        </ScrollView>
        <FontAwesome5 name="sort-amount-up" size={24} color={color.subtitle} />
      </FiltersContainer>
    </Wrapper>
  );
};

export default SubHeader;
