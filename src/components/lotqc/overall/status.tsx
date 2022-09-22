import { LotQCContext } from "@/pages/lotqc";
import { OverallChartDataType } from "@/types/lotqc";
import { Chart } from "@antv/g2";
import React, { useState, useEffect, useContext } from "react";
import { lotqcStatusColor } from "statics/lotqc/color";

const LotqcOverallStatusChart = () => {
  const { overallChartData } = useContext(LotQCContext);
  const [chart, setChart] = useState<Chart>();
  const [chartData, setChartData] = useState<OverallChartDataType[]>([]);

  const createChart = () => {
    const c = new Chart({
      container: "lotqc-overall-status-chart",
      height: 420,
      width: 420,
      padding: 0,
    });

    setChart(c);
  };

  const addChartProps = () => {
    if (!chart) return;

    chart.coordinate("theta", {
      radius: 0.75,
    });
    chart.legend(false);
    chart.scale("percent", {});
    chart.tooltip({
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
      .position("percent")
      .color("category", (category) => lotqcStatusColor[category])
      .label("percent", {
        content: (data) => {
          return `${data.category}: ${data.percent} %`;
        },
        style: {
          fontSize: 30,
          fontWeight: 600,
        },
      })
      .adjust("stack");
    chart.interaction("element-active");

    const legend = document.getElementById("lotqc-overall-status-legend");
    chart.on("afterchangedata", (e: any) => {
      const elements = e.view.getElements();
      const mappingData = elements.map((e: any) => e.getModel());
      let sum = 0;
      legend!.innerHTML = `
        ${[
          ...mappingData
            .map((datum: any) => {
              const color = datum.color;
              const name = datum.data.category;
              const value = `${datum.data.value} items (${datum.data.percent} %)`;
              sum += datum.data.value;
              return `
            <div class="legend-item">
              <span class="legend-item-marker" style="background-color: ${color}"></span>
              <span class="legend-item-name">${name}</span>
              <span class="legend-item-value">${value}</span>
            </div>
          `;
            })
            .join(""),
          `
          <div class="legend-item-total">
            <span class="legend-item-marker"></span>
            <span class="legend-item-name">Total</span>
            <span class="legend-item-value">${sum} items</span>
          </div>
          `,
        ].join("")}
      `;
    });

    chart.render();
  };

  useEffect(() => {
    if (chart) return;

    createChart();
  }, []);

  useEffect(() => {
    if (!chart) return;

    addChartProps();
  }, [chart]);

  useEffect(() => {
    if (!chart) return;

    chart.changeData(chartData);
  }, [chartData]);

  useEffect(() => {
    setChartData(overallChartData);
  }, [overallChartData]);

  return (
    <div className="lotqc-overall-status">
      <div className="lotqc-overall-status__wrapper custom-scrollbar">
        <p>Overall Control items status</p>
        <div className="lotqc-overall-status__chart">
          <div id="lotqc-overall-status-chart" />
          <div id="lotqc-overall-status-legend" />
        </div>
      </div>
    </div>
  );
};

export default LotqcOverallStatusChart;
