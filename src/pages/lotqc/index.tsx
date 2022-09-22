import LotqcOverallChart from "@/components/lotqc/overall/status";
import LotqcHistoryChart from "@/components/lotqc/overall/history";
import DropdownSelector from "@/components/selector/dropdown";
import { DropdownType, OptionType } from "@/types/common";
import { HistoryChartDataType, OverallChartDataType } from "@/types/lotqc";
import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  demoLotqcHistoryChartData,
  demoLotqcOverallChartData,
} from "statics/demo/lotqc";
import LotqcItemData from "@/components/lotqc/item/data";

const defaultLotQcContext = {
  product: {} as DropdownType,
  line: {} as DropdownType,
  month: "",
  overallChartData: [] as OverallChartDataType[],
  historyChartData: [] as HistoryChartDataType[],
};

export const LotQCContext = createContext(defaultLotQcContext);

const LotQualityCheck = () => {
  const [productList, setProductList] = useState<OptionType[]>([]);
  const [lineList, setlineList] = useState<OptionType[]>([]);
  const [product, setProduct] = useState<DropdownType>({} as DropdownType);
  const [line, setLine] = useState<DropdownType>({} as DropdownType);
  const [month, setMonth] = useState("");
  const [overallChartData, setOverallChartData] = useState<
    OverallChartDataType[]
  >([]);
  const [historyChartData, setHistoryChartData] = useState<
    HistoryChartDataType[]
  >([]);
  const context = useMemo(
    () => ({
      product: product,
      line: line,
      month: month,
      overallChartData: overallChartData,
      historyChartData: historyChartData,
    }),
    [product, line, month, overallChartData]
  );

  async function getProductList() {
    await fetch(`/api/json/get?filePath=json_product.json`).then(
      async (res) => {
        const data = await res.json();
        setProductList(JSON.parse(data));
      }
    );
  }

  const getLineList = async () => {
    await fetch(`/api/json/get?filePath=json_line.json`).then(async (res) => {
      const data = await res.json();
      setlineList(JSON.parse(data)[product.value] || []);
    });
  };

  useEffect(() => {
    // get product list
    getProductList();
  }, []);

  useEffect(() => {
    if (!product) return;

    // get line list
    getLineList();
  }, [product]);

  useEffect(() => {
    if (!line.value) return;

    setOverallChartData(demoLotqcOverallChartData);
    setHistoryChartData(demoLotqcHistoryChartData);
  }, [line]);

  return (
    <LotQCContext.Provider value={context}>
      <div className="lqc">
        <div className="lqc__selector">
          <DropdownSelector
            placeholder="Select product"
            options={productList}
            popupClassName="lqc__selector-dropdown"
            value={product.value}
            set={setProduct}
          />
          <DropdownSelector
            placeholder="Select line"
            options={lineList}
            popupClassName="lqc__selector-dropdown"
            value={line.value}
            set={setLine}
          />
        </div>
        <div className="lqc__main">
          <div className="lqc__total">
            <div className="lqc__total__overall">
              <div className="lqc__total__overall__chart">
                <LotqcOverallChart />
              </div>
            </div>
            <div className="lqc__total__history">
              <LotqcHistoryChart />
            </div>
          </div>
          <div className="lqc__abnormal">
            <LotqcItemData />
          </div>
        </div>
      </div>
    </LotQCContext.Provider>
  );
};

export default LotQualityCheck;
