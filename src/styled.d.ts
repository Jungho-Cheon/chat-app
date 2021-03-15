import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainBackground: string;
    background: string;
    purple: string;
    secondaryPurple: string;
    deepPurple: string;
    title: string;
    primaryText: string;
    secondaryText: string;
    divider: string;
    orange: string;
    orangeHovered: string;
  }
}
