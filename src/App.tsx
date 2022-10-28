import { ConfigProvider } from "antd";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { configureI18n } from "./config/i18n";
import { configureStorage } from "./config/store";
import { locales } from "./constants/locales";

import { Layout } from "./layout";

const themes = {
  DARK: "/dark.css",
  LIGHT: "/light.css",
};

const store = configureStorage();

const i18n = configureI18n(store);

export function App() {
  const { theme, lang: lng } = store.getState();
  const locale = locales.find((e) => e.key === lng.current);

  return (
    <ConfigProvider locale={locale?.package}>
      <Provider store={store}>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={theme.current}>
          <I18nextProvider i18n={i18n}>
            <Layout />
          </I18nextProvider>
        </ThemeSwitcherProvider>
      </Provider>
    </ConfigProvider>
  );
}
