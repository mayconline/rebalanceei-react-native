import { ApolloError } from '@apollo/client';
import React from 'react';
import { TextContentError } from './styles';

interface ITextError {
  children?: string | ApolloError;
  isTabs?: boolean;
}

const TextError = ({ children, isTabs }: ITextError) => (
  <TextContentError isTabs={isTabs} numberOfLines={1} ellipsizeMode="tail">
    {children}
  </TextContentError>
);

export default TextError;
