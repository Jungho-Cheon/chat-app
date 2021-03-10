import 'styled-components'

declare module 'styled-components' {
  export interface DefualtTheme {
    dark: {
      mainBackground: string;
      title: string;
      primaryText: string;
      secondaryText: string;
      disable: string;
      divider: string;
      
    }
  }
}