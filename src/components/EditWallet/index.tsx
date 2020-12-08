import React, { useContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { useMutation, gql } from '@apollo/client';

import { Form, FormRow, ContainerButtons } from './styles';

import { IWalletData, GET_WALLET_BY_USER } from '../../modals/WalletModal';
import InputForm from '../InputForm';
import TextError from '../TextError';
import Button from '../Button';

interface IEditWallet {
  walletData?: IWalletData;
  handleResetEditWallet?(): void;
  onClose(): void;
}

interface IDeleteWallet {
  deleteWallet: boolean;
}

const EditWallet = ({
  walletData,
  handleResetEditWallet,
  onClose,
}: IEditWallet) => {
  const { gradient } = useContext(ThemeContext);
  const [wallet, setWallet] = useState<IWalletData>({} as IWalletData);
  const [focus, setFocus] = useState(0);

  useFocusEffect(
    useCallback(() => {
      walletData && setWallet(walletData);
    }, [walletData]),
  );

  const handleSetName = useCallback((walletName: string) => {
    setWallet((wallet: IWalletData) => ({
      ...wallet,
      description: walletName,
    }));
  }, []);

  const handleGoBack = useCallback(() => {
    handleResetEditWallet && handleResetEditWallet();
    setWallet({} as IWalletData);
    onClose();
  }, []);

  const [
    updateWallet,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation<IWalletData>(UPDATE_WALLET);

  const [
    deleteWallet,
    { loading: mutationDeleteLoading, error: mutationDeleteError },
  ] = useMutation<IDeleteWallet>(DELETE_WALLET);

  const handleEditSubmit = useCallback(async () => {
    if (!wallet._id || !wallet.description) return;

    try {
      await updateWallet({
        variables: {
          _id: wallet._id,
          description: wallet.description,
        },
        refetchQueries: [
          {
            query: GET_WALLET_BY_USER,
          },
        ],
      });

      handleGoBack();
    } catch (err) {
      console.error(mutationError?.message + err);
    }
  }, [wallet]);

  const handleDeleteSubmit = useCallback(async () => {
    if (!wallet._id) return;

    try {
      await deleteWallet({
        variables: {
          _id: wallet._id,
        },
        refetchQueries: [
          {
            query: GET_WALLET_BY_USER,
          },
        ],
      });

      handleGoBack();
    } catch (err) {
      console.error(mutationDeleteError?.message + err);
    }
  }, [wallet]);

  return (
    <Form>
      <FormRow>
        <InputForm
          label="Nome da Carteira"
          value={wallet.description}
          defaultValue={wallet.description}
          placeholder="Minha Nova Carteira"
          autoCompleteType="off"
          maxLength={80}
          keyboardType="email-address"
          autoFocus={focus === 1}
          onFocus={() => setFocus(1)}
          onChangeText={handleSetName}
          onEndEditing={() => setFocus(0)}
          onSubmitEditing={handleEditSubmit}
        />
      </FormRow>

      {!!mutationError && <TextError>{mutationError?.message}</TextError>}

      {!!mutationDeleteError && (
        <TextError>{mutationDeleteError?.message}</TextError>
      )}

      <ContainerButtons>
        <Button
          colors={gradient.lightToDarkRed}
          start={[1, 0.5]}
          onPress={handleDeleteSubmit}
          loading={mutationDeleteLoading}
        >
          Deletar
        </Button>

        <Button
          colors={gradient.darkToLightBlue}
          start={[1, 0.5]}
          onPress={handleEditSubmit}
          loading={mutationLoading}
        >
          Alterar
        </Button>
      </ContainerButtons>
    </Form>
  );
};

export const UPDATE_WALLET = gql`
  mutation updateWallet($_id: ID!, $description: String!) {
    updateWallet(_id: $_id, input: { description: $description }) {
      _id
      description
    }
  }
`;

export const DELETE_WALLET = gql`
  mutation deleteWallet($_id: ID!) {
    deleteWallet(_id: $_id)
  }
`;

export default EditWallet;
