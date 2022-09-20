import { OverallSumTotalByCategoryChartDataType } from "@/types/fmoe";
import { Chart } from "@antv/g2";
import React, { useState, useEffect, useContext } from "react";
import { fmoeStatusColor } from "statics/fmoe/color";

interface SubCategoryProps {
  id: number;
  data: { [status: string]: number };
  sqcd: string;
}

const SubCategoryChart: React.FC<SubCategoryProps> = (props) => {
  const { id, data, sqcd } = props;
  const [chart, setChart] = useState<Chart>();
  const [chartData, setChartData] = useState<
    OverallSumTotalByCategoryChartDataType[]
  >([]);

  const creatChart = () => {
    const c = new Chart({
      container: `sub-category-chart-${id}`,
      autoFit: true,
      height: 180,
      padding: 0,
    });

    setChart(c);
  };

  const addChartProps = () => {
    if (!chart) return;

    chart.scale("percent", {
      formatter: (val) => {
        val = Math.round(val * 100) / 100;
        return val;
      },
    });
    chart.coordinate("theta", {
      radius: 0.75,
      innerRadius: 0.6,
    });
    chart.legend(false);
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl:
        '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });
    chart.annotation().text({
      position: ["50%", "50%"],
      content: sqcd,
      style: {
        fontSize: 20,
        fontWeight: 600,
        textAlign: "center",
      },
    });
    chart
      .interval()
      .adjust("stack")
      .position("percent")
      .color(
        "status",
        Object.values(fmoeStatusColor).map((color) => color)
      )
      .label("percent", (percent) => {
        return {
          content: (data) => {
            return `${Math.round(percent * 100) / 100} %`;
          },
          style: {
            fontSize: 10,
            shadowBlur: 2,
            shadowColor: "rgba(0,0,0,0.6)",
          },
          offset: 0,
        };
      })
      .tooltip("status*percent*value", (status, percent, value) => {
        percent = Math.round(percent * 100) / 100;
        return {
          name: status,
          value: `${value} items (${percent} %)`,
        };
      });
    chart.interaction("element-active");

    chart.render();
  };

  useEffect(() => {
    if (chart) return;

    creatChart();
  }, []);

  useEffect(() => {
    if (!chart) return;

    addChartProps();
  }, [chart]);

  useEffect(() => {
    if (!data) return;

    const sum = Object.values(data).reduce((sum, cur) => sum + cur, 0);
    let d = Object.entries(data).map(([status, value]) => ({
      status: status,
      value: value,
      percent: (value / sum) * 100,
    }));

    setChartData(d);
  }, [data]);

  useEffect(() => {
    if (!chart) return;

    chart.changeData(chartData);
  }, [chartData]);

  return (
    <div className="sub-category">
      <div className="sub-category__wrapper">
        <div id={`sub-category-chart-${id}`} />
      </div>
    </div>
  );
};

export default SubCategoryChart;
