import { Layout as AntLayout } from "antd";

import { Header } from "./header";
import { Main } from "./main";

const { Header: AntHeader } = AntLayout;

export function Layout() {
  return (
    <AntLayout hasSider>
      <AntLayout style={{ minHeight: "100vh" }}>
        <Header />
        <AntHeader />

        <Main />
      </AntLayout>
    </AntLayout>
  );
}
