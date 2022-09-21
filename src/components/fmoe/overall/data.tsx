import { FmoeContext } from "@/pages/fmoe";
import {
  OverallSumTotalByCategoryDataType,
  OverallSumTotalDataType,
} from "@/types/fmoe";
import React, { useState, useEffect, useContext } from "react";
import { fmoeCatgory, fmoeSQCD, fmoeStatus } from "statics/fmoe/category";
import { fmoeStatusColor } from "statics/fmoe/color";
import SubCategoryChart from "./category";

const OverallData = () => {
  const { overallSumValueData } = useContext(FmoeContext);
  const [totalData, setTotalData] = useState<OverallSumTotalDataType[]>([]);
  const [categoryData, setCategoryData] =
    useState<OverallSumTotalByCategoryDataType>({});

  useEffect(() => {
    // group by status
    let sum = 0;
    let data: OverallSumTotalDataType[] = fmoeStatus.map((status) => {
      const sumStatus = overallSumValueData
        .filter((data) => data.status === status)
        .reduce((sum, cur) => sum + cur.value, 0);
      sum += sumStatus;
      return {
        name: status,
        value: sumStatus,
      };
    });
    data.push({
      name: "Total",
      value: sum,
    });
    setTotalData(data);

    // group by category
    let dataCat: OverallSumTotalByCategoryDataType = {};
    fmoeSQCD.forEach((sqcd) => {
      const val: { [key: string]: number } = {};
      fmoeStatus.forEach((status) => {
        val[status] = overallSumValueData
          .filter((data) => data.sqcd === sqcd && data.status === status)
          .map((data) => data.value)
          .reduce((sum, cur) => sum + cur, 0);
      });
      dataCat[sqcd] = val;
    });

    setCategoryData(dataCat);
    // let a: any[] = [];
    // fmoeStatus.forEach((status) => {
    //   fmoeCatgory.forEach((cat) => {
    //     fmoeSQCD.forEach((sqcd) => {
    //       a.push({
    //         status: status,
    //         category: cat,
    //         sqcd: sqcd,
    //         value: Math.ceil(Math.random() * 30),
    //       });
    //     });
    //   });
    // });
    // console.log(a);
  }, [overallSumValueData]);

  return (
    <div className="overall-data">
      <div className="overall-data__total">
        <p>Summary</p>
        <div className="overall-data__total__table">
          <table>
            <tbody>
              {totalData.map((data, idx) => (
                <tr key={idx}>
                  <td>{data.name}</td>
                  <td style={{ backgroundColor: fmoeStatusColor[data.name] }}>
                    {data.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="overall-data__sub">
        <div className="overall-data__sub__wrapper">
          <p>By SQCD Category</p>
          <div className="overall-data__sub__category">
            {fmoeSQCD.map((sqcd, idx) => (
              <SubCategoryChart
                id={idx}
                key={sqcd}
                data={categoryData[sqcd]}
                sqcd={sqcd}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallData;
