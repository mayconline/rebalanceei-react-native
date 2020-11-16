import { Theme } from '../themes';

declare module 'styled-components/native' {
  interface DefaultTheme extends Theme {}
}
