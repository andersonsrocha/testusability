import enUS from "antd/lib/locale/en_US";
import ptBR from "antd/lib/locale/pt_BR";

// the object with the current languages
// available on the system
export const locales = [
  {
    key: "pt-BR",
    label: "Português",
    icon: <span>🇧🇷</span>,
    package: ptBR,
  },
  {
    key: "en",
    label: "English",
    icon: <span>🇺🇸</span>,
    package: enUS,
  },
];
