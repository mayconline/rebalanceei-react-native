import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import {
  SuggestionContainer,
  SuggestionList,
  SuggestionItem,
  SuggestionText,
  SuggestionButton,
  SuggestionError,
  Input,
  InputGroup,
  Label,
  BackButton,
  BackButtonContainer,
} from './styles';
import api from '../../services/api';
import { useDebouncedCallback } from 'use-debounce';

interface ISuggestions {
  symbol: string;
  name: string;
}

interface ISuggestionsProps {
  onClose(): void;
  handleSelectTicket(symbol: string, name: string): void;
}

const SuggestionsModal: React.FC<ISuggestionsProps> = ({
  onClose,
  handleSelectTicket,
}) => {
  const { color } = useContext(ThemeContext);
  const [suggestions, setSuggestions] = useState<ISuggestions[] | null>([]);
  const [selectTicket, setSelectTicket] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSuggestionsAutoComplete = (ticket: string) => {
    setLoading(true);
    setSelectTicket(ticket);

    displaySuggestionsAutoComplete.callback(ticket);
  };

  const displaySuggestionsAutoComplete = useDebouncedCallback(
    async (ticket: string) => {
      const response = await api.get('/autoc?', {
        params: {
          query: ticket,
          region: 1,
          lang: 'ptbr',
        },
      });

      let suggest = response?.data?.ResultSet?.Result;

      if (!suggest.length) {
        setLoading(false);
        setError(true);
      }

      setSuggestions(suggest);
      setLoading(false);
    },
    300,
  );

  const handleSelectSuggest = (symbol: string, name: string) => {
    handleSelectTicket(symbol, name);
    onClose();
  };

  return (
    <SuggestionContainer>
      <InputGroup>
        <Label>Busque e Selecione um Ativo</Label>
        <Input
          value={selectTicket}
          autoCapitalize={'characters'}
          returnKeyType={'next'}
          placeholder="RBLC3"
          placeholderTextColor={color.titleNotImport}
          maxLength={10}
          onChangeText={ticket => handleSuggestionsAutoComplete(ticket)}
          autoCorrect={false}
          autoFocus
        />
      </InputGroup>

      {loading ? (
        <ActivityIndicator size="large" color={color.titleNotImport} />
      ) : !!suggestions?.length ? (
        <SuggestionList>
          {suggestions?.map(suggestion => (
            <SuggestionItem key={suggestion.symbol}>
              <SuggestionButton
                onPress={() =>
                  handleSelectSuggest(suggestion.symbol, suggestion.name)
                }
              >
                <SuggestionText numberOfLines={1} ellipsizeMode="tail">
                  {suggestion.symbol}- {suggestion.name}
                </SuggestionText>
              </SuggestionButton>
            </SuggestionItem>
          ))}
        </SuggestionList>
      ) : (
        error && (
          <SuggestionError numberOfLines={1} ellipsizeMode="tail">
            Ativo não encontrado
          </SuggestionError>
        )
      )}

      <BackButtonContainer onPress={() => onClose()}>
        <BackButton>Fechar</BackButton>
      </BackButtonContainer>
    </SuggestionContainer>
  );
};

export default SuggestionsModal;
