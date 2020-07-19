import { Theme } from '../themes';

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
