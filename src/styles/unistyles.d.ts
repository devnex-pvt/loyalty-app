import { lightTheme } from "./theme";

type AppTheme = typeof lightTheme;

declare module "react-native-unistyles" {
  export interface UnistylesThemes {
    light: AppTheme;
  }
}
