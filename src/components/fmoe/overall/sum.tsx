import { FmoeContext } from "@/pages/fmoe";
import {
  OverallSumInnerChartDaTaType,
  OverallSumOuterChartDataType,
  OverallSumPercentDataType,
} from "@/types/fmoe";
import { Chart, View } from "@antv/g2";
import { LegendItem } from "@antv/g2/lib/interface";
import { isArray } from "@antv/util";
import React, { useState, useEffect, useContext } from "react";
import { fmoeCatgory, fmoeStatus } from "statics/fmoe/category";
import { fmoeCategoryColor, fmoeStatusColor } from "statics/fmoe/color";

const OverallSum = () => {
  const { product, month, overallSumPercentData } = useContext(FmoeContext);
  const [chart, setChart] = useState<Chart>();
  const [outerChart, setOuterChart] = useState<View>();

  const createChart = () => {
    const c = new Chart({
      container: "overall-sumchart",
      autoFit: true,
      width: 500,
      padding: [0, 0, 0, 0],
    });

    setChart(c);
  };

  const addchartProps = () => {
    if (!chart) return;

    // inner chart
    chart.legend({
      position: "bottom-right",
      custom: true,
      flipPage: false,
      items: Object.entries(fmoeStatusColor).map(
        ([status, color]) =>
          ({
            name: status,
            id: status,
            value: "status",
            marker: {
              symbol: "circle",
              style: { r: 4, fill: color },
            },
          } as LegendItem)
      ),
      itemName: {
        style: {
          fontSize: 20,
        },
      },
    });
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
      customItems: (items) =>
        items.map((item) => ({
          ...item,
          name: item.name.split("-")[0],
          value: `${item.value} items`,
        })),
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
          shadowBlur: 2,
          shadowColor: "rgba(0,0,0,0.6)",
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
    outerView.legend({
      position: "bottom-right",
      custom: true,
      flipPage: false,
      items: Object.entries(fmoeCategoryColor).map(
        ([category, color]) =>
          ({
            name: category,
            id: category,
            value: "category",
            marker: {
              symbol: "circle",
              style: { r: 4, fill: color },
            },
          } as LegendItem)
      ),

      itemName: {
        style: {
          fontSize: 20,
        },
      },
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
    const innerData: OverallSumInnerChartDaTaType[] = fmoeStatus.map(
      (status) => ({
        status: status,
        percent: overallSumPercentData
          .filter((data) => data.status === status)
          .reduce((sum, data) => sum + data.percent, 0),
      })
    );
    chart.changeData(innerData);

    // change outer data
    let outerData: OverallSumOuterChartDataType[] = [];
    fmoeStatus.forEach((status, idxStatus) =>
      fmoeCatgory.forEach((cat, idxCategory) => {
        outerData.push({
          status: status,
          category: cat + "-" + (idxStatus + 1) * (idxCategory + 1),
          percent: overallSumPercentData
            .filter((data) => data.status === status && data.category === cat)
            .reduce((sum, data) => sum + data.percent, 0),
        });
      })
    );
    outerChart.changeData(outerData);
  }, [chart, outerChart, overallSumPercentData]);

  return (
    <div className="overall-sum">
      <div className="overall-sum__wrapper">
        <p>Overall of {product.name}</p>
        <div className="overall-sum__chart">
          <div id="overall-sumchart" />
        </div>
      </div>
    </div>
  );
};

export default OverallSum;
