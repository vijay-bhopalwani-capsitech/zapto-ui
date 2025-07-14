import { createContext, useContext } from "react";

export interface IUiSettingsContext {
  size: "small" | "medium" | "large";
  multiTasking?: boolean;
}

export const UiSettingsContext = createContext<IUiSettingsContext>({
  size: "small",
  multiTasking: false,
});

export const useUiSettingsContext = () => useContext(UiSettingsContext);
