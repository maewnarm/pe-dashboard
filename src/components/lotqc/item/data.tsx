import { LotQCContext } from "@/pages/lotqc";
import { ItemChartDataType, ItemChartType } from "@/types/lotqc";
import { Chart } from "@antv/g2";
import React, { useState, useEffect, useContext } from "react";

const LotqcItemData = () => {
  const { itemChartData } = useContext(LotQCContext);

  return (
    <div className="lotqc-item-data">
      <div className="lotqc-item-data__wrapper">
        <p>Abnormal data details</p>
        <div className="lotqc-item-data__chart__wrapper">
          {itemChartData.map((item, idx) => (
            <ChartItem key={idx} id={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ChartItemProps {
  id: number;
  item: ItemChartType;
}

const ChartItem: React.FC<ChartItemProps> = (props) => {
  const { id, item } = props;
  const { line } = useContext(LotQCContext);
  const [chart, setChart] = useState<Chart>();
  const [chartData, setChartData] = useState<ItemChartDataType[]>([]);

  const createChart = () => {
    const c = new Chart({
      container: `item-chart-${id}`,
      autoFit: true,
      height: 250,
      padding: [20, 20, 30, 40],
    });

    setChart(c);
  };

  const addChartProps = () => {
    if (!chart) return;

    chart.scale({
      index: {
        range: [0, 1],
      },
      value: {
        nice: true,
      },
    });
    chart.axis("index",{
      label: {
        style: {
          fill: 'black'
        }
      }
    })
    chart.axis("value",{
      label: {
        style: {
          fill: 'black'
        }
      }
    })
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });
    chart.line().position("index*value").label("value",{
      style: {
        fontSize: 20
      }
    });
    chart.point().position("index*value");

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
    // if (!chart) return;

    const data: ItemChartDataType[] = [];
    Object.entries(item.data).forEach(([day, dataInDay]) => {
      Object.entries(dataInDay).forEach(([ind, value]) => {
        data.push({
          index: `${day}-${ind}`,
          value: Number(value),
        });
      });
    });
    setChartData(data);
  }, [line, item]);

  useEffect(() => {
    if (!chart) return;

    chart.changeData(chartData);
  }, [line, chartData]);

  return (
    <div className="lotqc-item-chart__element">
      <div className="lotqc-item-chart__element__header">
        <table>
          <tbody>
            <tr>
              <td>Part No. :</td>
              <td>{item.part_no}</td>
            </tr>
            <tr>
              <td>Process :</td>
              <td>{item.process}</td>
            </tr>
            <tr>
              <td>Parameter :</td>
              <td>{item.parameter}</td>
            </tr>
            <tr>
              <td>Limit :</td>
              <td>{`${item.limit.lower_limit}-${item.limit.upper_limit}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id={`item-chart-${id}`} />
    </div>
  );
};

export default LotqcItemData;
