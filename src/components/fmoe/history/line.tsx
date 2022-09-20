import { FmoeContext } from "@/pages/fmoe";
import { OverallLineDataType } from "@/types/fmoe";
import { Chart } from "@antv/g2";
import React, { useContext, useEffect, useState } from "react";

const HistoryLine = () => {
  const { product, month, historyLineData } = useContext(FmoeContext);
  const [chart, setChart] = useState<Chart>();

  const createChart = () => {
    const c = new Chart({
      container: "history-linechart",
      autoFit: true,
      height: 380,
      padding: [60, 10, 60, 50],
    });

    setChart(c);
  };

  const addChartProps = () => {
    if (!chart) return;

    chart.scale("value", {
      nice: true,
    });
    chart.axis("date", {
      label: {
        style: {
          fontSize: 16,
        },
      },
    });
    chart.axis("value", {
      label: {
        style: {
          fontSize: 20,
        },
      },
    });
    chart.legend({
      itemName: {
        style: {
          fontSize: 20,
        },
      },
    });
    chart.tooltip({
      showMarkers: false,
      shared: true,
      customItems: (items) =>
        items.map((item) => ({
          ...item,
          value: `${item.value} items`,
        })),
      title: (title) => `Date : ${title}`,
      domStyles: {
        "g2-tooltip": {
          fontSize: "16px",
        },
        "g2-tooltip-title": {
          fontSize: "20px",
          fontWeight: 700,
        },
      },
    });
    chart.interval().position("date*value").color("line").adjust("stack");
    chart.interaction("active-region");

    chart.render();
  };

  useEffect(() => {
    if (chart) return;

    createChart();
  }, []);

  useEffect(() => {
    addChartProps();
  }, [chart]);

  useEffect(() => {
    if (!chart) return;

    chart.changeData(historyLineData);
  }, [historyLineData]);

  return (
    <div className="history-line">
      <div className="history-line__wrapper">
        <p>History total by Line</p>
        <div className="history-line__chart">
          <div id="history-linechart" />
        </div>
      </div>
    </div>
  );
};

export default HistoryLine;
