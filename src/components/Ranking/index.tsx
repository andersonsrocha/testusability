import { useEffect, useState } from "react";
import { List, Typography } from "antd";

import { Website } from "@types";

type Props = {
  data: Array<Website>;
};

type Rank = {
  name: string;
  average: number;
  position: number;
};

export function Ranking({ data }: Props) {
  const [dataSource, setDataSource] = useState<Array<Rank>>([]);

  useEffect(() => {
    const list = data.map((item, index) => ({
      position: index,
      name: item.link,
      average: item.laws.reduce((a, b) => a + b.note, 0) / 10,
    }));

    const orderly = list.sort((a, b) => b.average - a.average);
    const source = orderly.map((sort, index) => ({ ...sort, position: index + 1 }));
    setDataSource(source);
  }, [data]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item extra={<Typography.Text strong>Média: {item.average}</Typography.Text>}>
          <List.Item.Meta
            avatar={<Typography.Text strong>{item.position}</Typography.Text>}
            title={<Typography.Link>{item.name}</Typography.Link>}
          />
        </List.Item>
      )}
    />
  );
}
