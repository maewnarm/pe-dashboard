import { FmoeContext } from "@/pages/fmoe";
import { TotalDataByLineType } from "@/types/fmoe";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { demoHistoryTotalByLineData } from "statics/demo/fmoe";

const IndicatorLine = () => {
  const { lineList } = useContext(FmoeContext);
  const [lineData, setLineData] = useState<TotalDataByLineType>({});

  useEffect(() => {
    const dataByLine: TotalDataByLineType = {};
    demoHistoryTotalByLineData.forEach((data) => {
      dataByLine[data.line] = {
        Total: data.Total,
        "In progress": data["In progress"],
        Done: data.Done,
      };
    });
    setLineData(dataByLine);
  }, []);

  return (
    <div className="indicator-line">
      <p>Line status</p>
      <div className="indicator-line__wrapper custom-scrollbar">
        {lineList.map((line, idx) => {
          let inProgress = false;
          const data = lineData[line.value];
          if (data) {
            inProgress = data["In progress"] > 0;
          }
          const cls = inProgress ? "in-progress" : "done";
          return (
            <div
              key={idx}
              className={`indicator-line__wrapper__element ${cls}`}
            >
              <Image
                height={90}
                width={90}
                src={`/parts/${line.value}.png`}
                alt="part"
                loading="eager"
                layout="fixed"
              />
              <span>{line.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndicatorLine;
