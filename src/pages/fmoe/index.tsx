import HistoryLine from "@/components/fmoe/history/line";
import IndicatorLine from "@/components/fmoe/indicator/line";
import OverallData from "@/components/fmoe/overall/data";
import OverallSum from "@/components/fmoe/overall/sum";
import RaceChart from "@/components/fmoe/top/race";
import DropdownSelector from "@/components/selector/dropdown";
import { DropdownType, OptionType } from "@/types/common";
import {
  OverallLineDataType,
  OverallSumValueDataType,
  OverallSumPercentDataType,
  TotalByLineDataType,
} from "@/types/fmoe";
import { DatePicker, DatePickerProps } from "antd";
import React, { useState, useEffect, useMemo, createContext } from "react";
import {
  demoHistoryLineData,
  demoHistoryTotalByLineData,
  demoOverallSumPercentData,
  demoOverallSumValueData,
} from "statics/demo/fmoe";
import moment from "moment";

const defaultFmoeContext = {
  productList: [] as OptionType[],
  lineList: [] as OptionType[],
  product: {} as DropdownType,
  line: "",
  month: "",
  overallSumValueData: [] as OverallSumValueDataType[],
  overallSumPercentData: [] as OverallSumPercentDataType[],
  historyLineData: [] as OverallLineDataType[],
  historyTotalByLineData: [] as TotalByLineDataType[],
};

export const FmoeContext = createContext(defaultFmoeContext);

const FMOE = () => {
  const [productList, setProductList] = useState<OptionType[]>([]);
  const [lineList, setLineList] = useState<OptionType[]>([]);
  const [product, setProduct] = useState<DropdownType>({} as DropdownType);
  const [line, setLine] = useState("");
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [overallSumValueData, setOverallSumValueData] = useState<
    OverallSumValueDataType[]
  >([]);
  const [overallSumPercentData, setOverallSumPercentData] = useState<
    OverallSumPercentDataType[]
  >([]);
  const [historyLineData, setHistoryLineData] = useState<OverallLineDataType[]>(
    []
  );
  const [historyTotalByLineData, setHistoryTotalByLineData] = useState<
    TotalByLineDataType[]
  >([]);
  const context = useMemo(
    () => ({
      productList: productList || [],
      lineList: lineList || [],
      product: product,
      line: line,
      month: month,
      overallSumValueData: overallSumValueData,
      overallSumPercentData: overallSumPercentData,
      historyLineData: historyLineData,
      historyTotalByLineData: historyTotalByLineData,
    }),
    [
      productList,
      lineList,
      product,
      line,
      month,
      overallSumValueData,
      overallSumPercentData,
      historyLineData,
      historyTotalByLineData,
    ]
  );

  const setDemoData = () => {
    setOverallSumValueData(demoOverallSumValueData);
    setOverallSumPercentData(demoOverallSumPercentData);
    setHistoryLineData(demoHistoryLineData);
    setHistoryTotalByLineData(demoHistoryTotalByLineData);
  };

  const getProductData = async () => {
    await fetch(`/api/json/get?filePath=json_product.json`).then(
      async (res) => {
        const data = await res.json();
        setProductList(JSON.parse(data));
      }
    );
  };

  const getLineData = async () => {
    await fetch(`/api/json/get?filePath=json_line.json`).then(async (res) => {
      const data = await res.json();
      setLineList(JSON.parse(data)[product.value]);
    });
  };

  const onDatePickerChange: DatePickerProps["onChange"] = (_, dateString) => {
    setMonth(dateString);
  };

  useEffect(() => {
    // set demo data
    setDemoData();
    // get product data
    getProductData();
  }, []);

  useEffect(() => {
    // get line data
    getLineData();
  }, [product]);

  return (
    <FmoeContext.Provider value={context}>
      <div className="fmoe">
        <div className="fmoe__selector">
          <DropdownSelector
            placeholder="Select product"
            options={productList}
            popupClassName="fmoe__selector-dropdown"
            value={product.value}
            set={setProduct}
          />
          <DatePicker
            picker="month"
            onChange={onDatePickerChange}
            value={moment(month, "YYYY-MM")}
          />
        </div>
        <div className="fmoe__main">
          {/* <button
            onClick={() => setDemoData()}
            style={{ position: "absolute", zIndex: 2 }}
          >
            set
          </button> */}
          <div className="fmoe__amount">
            <div className="fmoe__amount__overall">
              <div className="fmoe__amount__overall__sum">
                <OverallSum />
              </div>
              <div className="fmoe__amount__overall__data">
                <OverallData />
              </div>
            </div>
            <div className="fmoe__amount__history">
              <HistoryLine />
            </div>
          </div>
          <div className="fmoe__indicator">
            <div className="fmoe__indicator__line">
              <IndicatorLine />
            </div>
            <div className="fmoe__indicator__chart">
              <RaceChart />
            </div>
          </div>
        </div>
      </div>
    </FmoeContext.Provider>
  );
};

export default FMOE;
