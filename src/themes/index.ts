import light from './light';
import dark from './dark';

export type themeMode = 'light' | 'dark';
export type Theme = typeof light;

export default { dark, light };
