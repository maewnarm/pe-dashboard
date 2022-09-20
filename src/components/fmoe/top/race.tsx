import DropdownSelector from "@/components/selector/dropdown";
import { FmoeContext } from "@/pages/fmoe";
import { DropdownType } from "@/types/common";
import { HistoryTotalByLineChartDataType } from "@/types/fmoe";
import { Chart } from "@antv/g2";
import { Select } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { fmoeCountCategory } from "statics/fmoe/category";
import { fmoeStatusColor } from "statics/fmoe/color";

const { Option } = Select;

const RaceChart = () => {
  const { historyTotalByLineData } = useContext(FmoeContext);
  const [chart, setChart] = useState<Chart>();
  const [chartData, setChartData] = useState<HistoryTotalByLineChartDataType[]>(
    []
  );
  const [sortingKey, setSortingKey] = useState<DropdownType>({
    name: "Total",
    value: "Total",
  });

  const createChart = () => {
    const c = new Chart({
      container: "top-race-chart",
      autoFit: true,
      height: 380,
      padding: [70, 20, 30, 50],
    });

    setChart(c);
  };

  const addChartProps = () => {
    if (!chart) return;

    chart.scale({
      value: {
        nice: true,
        min: 0,
      },
    });
    chart.axis("line", {
      tickLine: null,
      line: null,
      label: {
        style: {
          fontSize: 20
        }
      }
    });
    chart.axis("value", {
      label: {
        style: {
          fontSize: 20,
        },
      },
    });
    chart.legend(false);
    chart
      .interval()
      .position("line*value")
      .size(60)
      .color("color", (color) => color)
      .label("value", {
        style: {
          fontSize: 20,
          fontWeight: 600,
          fill: "#555555",
        },
        offset: 10,
      })
      .animate(false)
    chart.interaction("element-active");

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
    if (!historyTotalByLineData) return;

    // sorting min to max
    console.log(sortingKey);
    const data = historyTotalByLineData
      .sort(
        // @ts-ignore
        (a, b) => b[sortingKey.value] - a[sortingKey.value]
      )
      .map((data) => ({
        line: data.line,
        // @ts-ignore
        value: data[sortingKey.value],
        color: fmoeStatusColor[sortingKey.value],
      }));
    setChartData(data);
  }, [historyTotalByLineData, sortingKey]);

  return (
    <div className="top-race">
      <div className="top-race__wrapper">
        <p>History Top chart by status</p>
        <div className="top-race__sorter">
          <DropdownSelector
            placeholder="Sort by"
            options={fmoeCountCategory.map((cat) => ({
              text: cat,
              value: cat,
            }))}
            popupClassName="fmoe__selector-dropdown"
            value={sortingKey.value}
            set={setSortingKey}
          />
        </div>
        <div id="top-race-chart" />
      </div>
    </div>
  );
};

export default RaceChart;
