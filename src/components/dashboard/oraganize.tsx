import { MainDashboardContext } from "@/pages/main";
import { OrganizeChartDataType } from "@/types/maindashboard";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { OrganizeByProduct, OrganizeRow } from "statics/organize/product";

const OrganizeChart = () => {
  const { product } = useContext(MainDashboardContext);
  const [organize, setOrganize] = useState<OrganizeChartDataType[][]>([]);
  const [organizeTableBody, setOrganizeTableBody] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!product) return;
    const organizeData = OrganizeByProduct[product.value];
    if (!organizeData) {
      setOrganize([]);
      return;
    }

    const maxRowSpan = OrganizeRow[product.value] || 0;

    const data: OrganizeChartDataType[][] = [];
    for (let i = 0; i < maxRowSpan; i++) {
      data.push([]);
    }
    Object.entries(organizeData).forEach(([role, keyData]) => {
      let lastRow = 0;
      keyData.forEach((element) => {
        data[lastRow].push({ ...element, role: role });
        lastRow += element.row;
      });
    });
    console.log(data);
    setOrganize(data);
  }, [product]);

  useEffect(() => {
    if (!organize) return;

    let body = organize.map((rowData, idxRowData) => (
      <tr key={idxRowData}>
        {rowData.map((data, idxData) => {
          const role = data.role;
          const cls = role || "";
          const size = role === "assy" || role === "fm" ? 180 : 70;
          return (
            <td key={idxData} rowSpan={data.row} className={cls}>
              <div className="organize-table__cell">
                <Image
                  height={size}
                  width={size}
                  src={data.pic}
                  alt="picture"
                  loading="eager"
                  layout="fixed"
                />
                <span>{data.name}</span>
              </div>
            </td>
          );
        })}
      </tr>
    ));

    console.log(body);
    setOrganizeTableBody(body);
  }, [organize]);

  return (
    <div className="organize">
      <div className="organize__wrapper">
        <p>{product.name && `${product.name} Organization`}</p>
        <div className="organize__table__wrapper custom-scrollbar">
          <table>
            <thead>
              <tr>
                <th>Sub Assy</th>
                <th>Assy</th>
                <th>Factory Manager (FM)</th>
                <th>Manager (MGR)</th>
                <th>Team Leader (TL)</th>
              </tr>
            </thead>
            <tbody>{organizeTableBody}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizeChart;
