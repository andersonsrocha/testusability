import { resources, defaultNS } from "../config/i18n/index";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: string;
    resources: typeof resources;
  }
}
