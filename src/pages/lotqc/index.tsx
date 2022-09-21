import DropdownSelector from "@/components/selector/dropdown";
import { DropdownType } from "@/types/common";
import { OptionType } from "@/types/lotqc";
import React, { createContext, useEffect, useMemo, useState } from "react";

const defaultLotQcContext = {
  product: {} as DropdownType,
  line: {} as DropdownType,
  month: "",
};

export const LotQCContext = createContext(defaultLotQcContext);

const LotQualityCheck = () => {
  const [productList, setProductList] = useState<OptionType[]>([]);
  const [lineList, setlineList] = useState<OptionType[]>([]);
  const [product, setProduct] = useState<DropdownType>({ name: "", value: "" });
  const [line, setLine] = useState<DropdownType>({ name: "", value: "" });
  const [month, setMonth] = useState("");
  const context = useMemo(
    () => ({
      product: product,
      line: line,
      month: month,
    }),
    [product, line, month]
  );

  async function getProductList() {
    await fetch(`/api/json/get?filePath=json_product.json`).then(
      async (res) => {
        const data = await res.json();
        setProductList(JSON.parse(data));
      }
    );
  }

  useEffect(() => {
    // get product list
    getProductList();
  }, []);

  return (
    <LotQCContext.Provider value={context}>
      <div className="lqc">
        <div className="lqc__selector">
          <DropdownSelector
            placeholder="Select product"
            options={productList}
            value={product.value}
            set={setProduct}
          />
          <DropdownSelector
            placeholder="Select line"
            options={lineList}
            value={line.value}
            set={setLine}
          />
        </div>
        <div className="lqc__main">
          <div className="lqc__overall"></div>
          <div className="lqc__history"></div>
          <div className="lqc__abnormal-item"></div>
        </div>
      </div>
    </LotQCContext.Provider>
  );
};

export default LotQualityCheck;
