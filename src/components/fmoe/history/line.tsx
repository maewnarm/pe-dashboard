import { FmoeContext } from "@/pages/fmoe";
import { OverallLineDataType } from "@/types/fmoe";
import { Chart } from "@antv/g2";
import React, { useContext, useEffect, useState } from "react";

const demoChartData = [
  { date: "01-09-2022", line: "Line 1", value: 3 },
  { date: "02-09-2022", line: "Line 1", value: 5 },
  { date: "03-09-2022", line: "Line 1", value: 1 },
  { date: "04-09-2022", line: "Line 1", value: 3 },
  { date: "05-09-2022", line: "Line 1", value: 0 },
  { date: "01-09-2022", line: "Line 2", value: 6 },
  { date: "02-09-2022", line: "Line 2", value: 3 },
  { date: "03-09-2022", line: "Line 2", value: 7 },
  { date: "04-09-2022", line: "Line 2", value: 0 },
  { date: "05-09-2022", line: "Line 2", value: 3 },
  { date: "01-09-2022", line: "Line 3", value: 1 },
  { date: "02-09-2022", line: "Line 3", value: 2 },
  { date: "03-09-2022", line: "Line 3", value: 6 },
  { date: "04-09-2022", line: "Line 3", value: 3 },
  { date: "05-09-2022", line: "Line 3", value: 6 },
];

const HistoryLine = () => {
  const { product, month } = useContext(FmoeContext);
  const [chart, setChart] = useState<Chart>();
  const [chartData, setChartData] = useState<OverallLineDataType[]>([]);

  const createChart = () => {
    const c = new Chart({
      container: "history-linechart",
      autoFit: true,
      height: 400,
    });

    setChart(c);
  };

  const addChartProps = () => {
    if (!chart) return;

    chart.scale("value", {
      nice: true,
    });
    chart.tooltip({
      shared: true,
      showMarkers: false,
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
    addChartProps()
  },[chart])

  useEffect(() => {
    if (!chart) return;

    chart.changeData(chartData);
  }, [chartData]);

  return (
    <div className="history-line">
      <div className="history-line__chart">
        <button
          onClick={() => setChartData(demoChartData)}
          style={{ position: "absolute", zIndex: 2 }}
        >
          set
        </button>
        <div id="history-linechart" />
      </div>
    </div>
  );
};

export default HistoryLine;
