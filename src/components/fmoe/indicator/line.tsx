import { FmoeContext } from "@/pages/fmoe";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";

const IndicatorLine = () => {
  const { lineList } = useContext(FmoeContext);

  return (
    <div className="indicator-line">
      <p>Line status</p>
      <div className="indicator-line__wrapper custom-scrollbar">
        {lineList.map((line, idx) => (
          <div key={idx} className="indicator-line__wrapper__element">
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
        ))}
      </div>
    </div>
  );
};

export default IndicatorLine;
