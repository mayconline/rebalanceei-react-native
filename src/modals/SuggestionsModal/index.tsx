import React, { useState, useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import {
  SuggestionContainer,
  SuggestionList,
  SuggestionItem,
  SuggestionText,
  SuggestionButton,
  SuggestionError,
  BackButton,
  BackButtonContainer,
} from './styles';
import api from '../../services/api';
import { useDebouncedCallback } from 'use-debounce';
import ShadowBackdrop from '../../components/ShadowBackdrop';
import InputForm from '../../components/InputForm';

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

  const handleSuggestionsAutoComplete = useCallback((ticket: string) => {
    setLoading(true);
    setSelectTicket(ticket);

    displaySuggestionsAutoComplete.callback(ticket);
  }, []);

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

  const handleSelectSuggest = useCallback((symbol: string, name: string) => {
    handleSelectTicket(symbol, name);
    onClose();
  }, []);

  return (
    <>
      <ShadowBackdrop />
      <SuggestionContainer>
        <InputForm
          label="Busque e Selecione um Ativo"
          value={selectTicket}
          placeholder="RBLC3"
          maxLength={10}
          autoFocus
          onChangeText={ticket => handleSuggestionsAutoComplete(ticket)}
          autoCapitalize={'characters'}
        />

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
    </>
  );
};

export default SuggestionsModal;
