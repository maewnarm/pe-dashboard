import HistoryLine from "@/components/fmoe/history/line";
import OverallLine from "@/components/fmoe/history/line";
import OverallSum from "@/components/fmoe/overall/sum";
import DropdownSelector from "@/components/selector/dropdown";
import { OptionType } from "@/types/lotqc";
import React, { useState, useEffect, useMemo, createContext } from "react";

const defaultFmoeContext = {
  product: "",
  month: "",
};

export const FmoeContext = createContext(defaultFmoeContext);

const FMOE = () => {
  const [productList, setProductList] = useState<OptionType[]>([]);
  const [product, setProduct] = useState("");
  const [line, setLine] = useState("");
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
    <FmoeContext.Provider value={context}>
      <div className="fmoe">
        <div className="fmoe__selector">
          <DropdownSelector
            placeholder="Select product"
            options={productList}
            popupClassName="fmoe__selector-dropdown"
            set={setProduct}
          />
        </div>
        <div className="fmoe__main">
          <div className="fmoe__amount">
            <div className="fmoe__amount__overall">
              <div className="fmoe__amount__overall__sum">
                <OverallSum />
              </div>
              <div className="fmoe__amount__overall__data">
                
              </div>
            </div>
            <div className="fmoe__amount__history"><HistoryLine /></div>
          </div>
          <div className="fmoe__indicator">
            <div className="fmoe__indicator__line"></div>
            <div className="fmoe__indicator__chart"></div>
          </div>
        </div>
      </div>
    </FmoeContext.Provider>
  );
};

export default FMOE;
