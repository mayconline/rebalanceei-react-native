import React from 'react';
import { TextContentError } from './styles';

const TextError = ({ children }: { children: string }) => (
  <TextContentError numberOfLines={1} ellipsizeMode="tail">
    {children}
  </TextContentError>
);

export default TextError;
