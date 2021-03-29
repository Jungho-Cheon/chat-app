import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    buttonBackgroundA: string;
    buttonHoveredA: string;
    buttonActiveA: string;
    buttonBackgroundB: string;
    buttonHoveredB: string;
    buttonActiveB: string;
    primaryText: string;
    secondaryText: string;
    divider: string;
    containerBorder: string;
    containerBackground: string;
    modalBackground: string;
    shadow: string;
    navbarBackground: string;
  }
}
