import { LotQCContext } from "@/pages/lotqc";
import { HistoryChartDataType } from "@/types/lotqc";
import { Chart } from "@antv/g2";
import React, { useState, useEffect, useContext } from "react";
import { lotqcStatusColor } from "statics/lotqc/color";

const LotqcHistoryChart = () => {
  const { historyChartData } = useContext(LotQCContext);
  const [chart, setChart] = useState<Chart>();
  const [chartData, setChartData] = useState<HistoryChartDataType[]>([]);

  const createChart = () => {
    const c = new Chart({
      container: "lotqc-history-chart",
      autoFit: true,
      height: 420,
      padding: [40, 20, 90, 50],
    });

    setChart(c);
  };

  const addPropsChart = () => {
    if (!chart) return;

    chart.scale("value", {
      nice: true,
    });
    chart.axis("value", {
      label: {
        style: {
          fontSize: 18,
        },
      },
    });
    chart.axis("date", {
      label: {
        style: {
          fontSize: 16,
        },
        rotate: Math.PI / 2,
        offsetX: 40,
        offsetY: -8,
      },
    });
    chart.legend({
      position: "top-right",
      itemName: {
        style: {
          fontSize: 25,
        },
      },
      marker: {
        style: {
          r: 10,
        },
      },
      offsetX: -10
    });
    chart.tooltip({
      shared: true,
      showMarkers: false,
      domStyles: {
        "g2-tooltip": {
          fontSize: "26px",
        },
        "g2-tooltip-title": {
          fontSize: "30px",
          fontWeight: 700,
        },
      },
      customItems: (items) =>
        items.map((item) => ({
          ...item,
          value: `${item.value} items`,
        })),
    });
    chart
      .interval()
      .position("date*value")
      .color("type", (type) => lotqcStatusColor[type])
      .adjust({
        type: "stack",
        reverseOrder: false,
      });
    chart.interaction("element-highlight-by-color");

    chart.render();
  };

  useEffect(() => {
    if (chart) return;

    createChart();
  }, []);

  useEffect(() => {
    if (!chart) return;

    addPropsChart();
  }, [chart]);

  useEffect(() => {
    if (!chart) return;

    chart.changeData(chartData);
  }, [chartData]);

  useEffect(() => {
    setChartData(historyChartData);
  }, [historyChartData]);

  return (
    <div className="lotqc-history">
      <div className="lotqc-history__wrapper">
        <p>Abnormal data history</p>
        <div className="lotqc-history__chart">
          <div id="lotqc-history-chart" />
        </div>
      </div>
    </div>
  );
};

export default LotqcHistoryChart;
