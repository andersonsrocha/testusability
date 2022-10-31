import { useMemo } from "react";
import { Radar, RadarConfig } from "@ant-design/plots";
import { useTranslation } from "react-i18next";

type Item = {
  law: string;
  site: string;
  score: number;
};

export function Report({ data }: Record<"data", Array<Item>>) {
  const { t } = useTranslation();

  const config = useMemo<RadarConfig>(
    () => ({
      data,
      xField: "law",
      yField: "score",
      seriesField: "site",
      meta: {
        score: {
          alias: "分数",
          min: 0,
          max: 10,
        },
        law: {
          formatter: (value) => {
            const name = `${value}. ${t(`law${value}.name`)}`;
            const short = `${value}. ${t(`law${value}.short`)}`;

            if (name.length > 50) return short;

            return name;
          },
        },
      },
      xAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      },
      yAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: "line",
            style: {
              lineDash: null,
            },
          },
          alternateColor: "rgba(0, 0, 0, 0.04)",
        },
      },
      area: {},
      point: {
        size: 2,
      },
    }),
    [data, t]
  );

  return <Radar {...config} />;
}
