import DashboardMenu from "@/components/dashboard/menu";
import OrganizeChart from "@/components/dashboard/oraganize";
import DropdownSelector from "@/components/selector/dropdown";
import { DropdownType } from "@/types/common";
import { OptionType } from "@/types/lotqc";
import React, { useState, useMemo, createContext, useEffect } from "react";

const defaultMainDashboardContext = {
  product: {} as DropdownType,
};

export const MainDashboardContext = createContext(defaultMainDashboardContext);

const MainDashboard = () => {
  const [productList, setProductList] = useState<OptionType[]>([]);
  const [product, setProduct] = useState<DropdownType>({} as DropdownType);
  const context = useMemo(
    () => ({
      product: product,
    }),
    [product]
  );

  const getProductData = async () => {
    await fetch(`/api/json/get?filePath=json_product.json`).then(
      async (res) => {
        const data = await res.json();
        setProductList(JSON.parse(data));
      }
    );
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <MainDashboardContext.Provider value={context}>
      <div className="main-dashboard">
        {/* <div className="main-dashboard__wrapper"> */}
        <div className="main-dashboard__header">
          <p>Center Dashboard</p>
          <span>Product : </span>
          <div className="main-dashboard__header__selector">
            <DropdownSelector
              placeholder="Select product"
              options={productList}
              popupClassName="fmoe__selector-dropdown"
              value={product.value}
              set={setProduct}
            />
          </div>
        </div>
        <div className="main-dashboard__main">
          <div className="main-dashboard__main__organize">
            <OrganizeChart />
          </div>
          <div className="main-dashboard__main__menu">
            <DashboardMenu />
          </div>
        </div>
        {/* </div> */}
      </div>
    </MainDashboardContext.Provider>
  );
};

export default MainDashboard;
