import { FmoeContext } from "@/pages/fmoe";
import {
  fmoeCategory,
  fmoeCategoryColor,
  fmoeStatus,
  fmoeStatusColor,
  InnerChartDaTaType,
  OverallSumDataType,
} from "@/types/fmoe";
import { Chart, View } from "@antv/g2";
import { isArray } from "@antv/util";
import React, { useState, useEffect, useContext } from "react";

const demodata = [
  { status: "Done", category: "Man", percent: 10 },
  { status: "Done", category: "Machine", percent: 30 },
  { status: "Done", category: "Method", percent: 31 },
  { status: "Done", category: "Material", percent: 10 },
  { status: "Done", category: "Measurement", percent: 5 },
  { status: "Done", category: "Environment", percent: 5 },
  { status: "In progress", category: "Man", percent: 4 },
  { status: "In progress", category: "Machine", percent: 3 },
  { status: "In progress", category: "Method", percent: 0 },
  { status: "In progress", category: "Material", percent: 0 },
  { status: "In progress", category: "Measurement", percent: 1 },
  { status: "In progress", category: "Environment", percent: 1 },
];

const OverallSum = () => {
  const { product, month } = useContext(FmoeContext);
  const [chart, setChart] = useState<Chart>();
  const [outerChart, setOuterChart] = useState<View>();
  const [chartData, setChartData] = useState<OverallSumDataType[]>([]);

  const createChart = () => {
    const c = new Chart({
      container: "overall-sumchart",
      autoFit: true,
      height: 500,
    });

    setChart(c);
  };

  const addchartProps = () => {
    if (!chart) return;
    console.log("add chart prop");

    // chart.data(chartData);
    // inner chart
    chart.legend(false);
    chart.coordinate("theta", {
      radius: 0.4,
      innerRadius: 0.3,
    });
    chart.tooltip({
      showMarkers: false,
      title: (_, datum) => {
        if (datum.category) {
          // inner, status area
          return `${datum.status} - ${datum.category.split("-")[0]}`;
        }
        // outer, category area
        return datum.status;
      },
    });
    chart
      .interval()
      .adjust("stack")
      .position("percent")
      .color("status", (status) => fmoeStatusColor[status])
      .style({
        stroke: "white",
        lineWidth: 1,
      })
      .label("status", {
        content: (obj) => {
          if (obj.percent < 8) {
            return "";
          }
          if (obj.status.length > 7) {
            return obj.status.slice(0, 7);
          }
          return obj.status;
        },
        offset: -8,
        style: {
          fontSize: 18,
          fill: "#2C3333",
          // shadowBlur: 2,
          // shadowColor: "rgba(0,0,0,0.6)",
        },
      });

    // outer chart
    const outerView = chart.createView();
    setOuterChart(outerView);
    // outerView.data();
    outerView.coordinate("theta", {
      innerRadius: 0.4 / 0.7,
      radius: 0.7,
    });
    outerView
      .interval()
      .adjust("stack")
      .position("percent")
      .color("category", (category) => {
        if (!category || isArray(category)) return "black";
        return fmoeCategoryColor[category.split("-")[0]];
      })
      .style({
        stroke: "white",
        lineWidth: 1,
      })
      .label("category", {
        content: (obj) => {
          if (!obj.category || obj.percent < 3) return "";

          // split
          const cat = obj.category.split("-")[0];
          if (cat === "Measurement") {
            return "Measure";
          } else if (cat === "Environment") {
            return "Envi.";
          }
          return cat;
        },
        offset: -10,
        style: {
          fontSize: 15,
          fill: "white",
          shadowBlur: 2,
          shadowColor: "rgba(0,0,0,0.6)",
        },
      });

    chart.interaction("element-active");
    chart.render();
  };

  useEffect(() => {
    if (chart) return;

    createChart();
  }, []);

  useEffect(() => {
    addchartProps();
  }, [chart]);

  useEffect(() => {
    if (!chart || !outerChart) return;

    // change inner data
    const innerData: InnerChartDaTaType[] = fmoeStatus.map((status) => ({
      status: status,
      percent: chartData
        .filter((data) => data.status === status)
        .reduce((sum, data) => sum + data.percent, 0),
    }));
    chart.changeData(innerData);

    // change outer data
    let outerData: OverallSumDataType[] = [];
    fmoeStatus.forEach((status, idxStatus) =>
      fmoeCategory.forEach((cat, idxCategory) => {
        outerData.push({
          status: status,
          category: cat + "-" + (idxStatus + 1) * (idxCategory + 1),
          percent: chartData
            .filter((data) => data.status === status && data.category === cat)
            .reduce((sum, data) => sum + data.percent, 0),
        });
      })
    );
    outerChart.changeData(outerData);
  }, [chartData]);

  return (
    <div className="overall-sum">
      <button
        onClick={() => setChartData(demodata)}
        style={{ position: "absolute",zIndex:2 }}
      >
        set
      </button>
      <div className="overall-sum__chart">
        <div id="overall-sumchart" />
      </div>
      <div className="overall-sum__data"></div>
    </div>
  );
};

export default OverallSum;
