import { useCallback, useState } from "react";
import { Row, Layout, Col, Menu, Switch } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useDispatch, useSelector } from "react-redux";
import { DarkModeOutlined, LightModeOutlined, TranslateOutlined } from "@icons";
import { AppDispatch, selectTheme, setCurrentTheme, selectLang, setCurrentLang } from "@config";
import { useTranslation } from "react-i18next";
import { locales } from "@constants";

import logo from "@assets/logo.svg";

import { LanguageCurrentDisplay } from "@types";
import { MenuInfo } from "rc-menu/lib/interface";

const { Header: AntHeader } = Layout;

export function Header() {
  const { switcher, themes } = useThemeSwitcher();
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [mode, setMode] = useState(useSelector(selectTheme).current);
  const [locale, setLocale] = useState(useSelector(selectLang).current);

  const onChangeTheme = useCallback(
    (checked = false) => {
      const newTheme = checked ? "DARK" : "LIGHT";
      switcher({ theme: themes[newTheme] });
      dispatch(setCurrentTheme(newTheme));
      setMode(newTheme);
    },
    [switcher, themes]
  );

  const onChangeLocale = useCallback(
    ({ key }: MenuInfo) => {
      const language = key as LanguageCurrentDisplay;
      i18n.changeLanguage(language).then(() => {
        setLocale(language);
        dispatch(setCurrentLang(language));
      });
    },
    [dispatch, i18n]
  );

  return (
    <AntHeader style={{ width: "100%", position: "fixed", right: 0, zIndex: 100 }}>
      <Row justify="space-between" align="middle" style={{ height: "100%" }}>
        <Col>
          <a href="/">
            <div
              style={{
                backgroundColor: "#ffffff",
                WebkitMask: `url(${logo}) no-repeat center`,
                WebkitMaskSize: "contain",
                width: 50,
                height: 50,
              }}
            />
          </a>
        </Col>

        <Col md={12} flex="none">
          <Row gutter={8}>
            <Col>
              <Menu
                selectedKeys={[locale]}
                disabledOverflow
                theme="dark"
                mode="horizontal"
                items={[
                  {
                    key: "locale",
                    label: <TranslateOutlined />,
                    theme: "light",
                    children: locales,
                  },
                ]}
                onClick={onChangeLocale}
              />
            </Col>

            <Col>
              <Switch
                checkedChildren={<DarkModeOutlined />}
                unCheckedChildren={<LightModeOutlined />}
                checked={mode === "DARK"}
                onChange={onChangeTheme}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </AntHeader>
  );
}
