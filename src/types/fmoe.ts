export type OverallSumValueDataType = {
  status: string;
  category?: string;
  sqcd?: string;
  value: number;
};

export type OverallSumPercentDataType = {
  status: string;
  category?: string;
  sqcd?: string;
  percent: number;
};

export type OverallSumOuterChartDataType = {
  status: string;
  category: string;
  percent: number;
};

export type OverallSumInnerChartDaTaType = {
  status: string;
  percent: number;
};

export type OverallLineDataType = {
  date: string;
  line: string;
  value: number;
};

export type OverallSumTotalDataType = {
  name: string;
  value: number;
};

export type OverallSumTotalByCategoryDataType = {
  [category: string]: {
    [status: string]: number;
  };
};

export type OverallSumTotalByCategoryChartDataType = {
  status: string;
  value: number;
  percent: number;
};

export type LineDataType = {
  text: string;
  value: string;
};

export type TotalByLineDataType = {
  line: string;
  Total: number;
  "In progress": number;
  Done: number;
};

export type HistoryTotalByLineChartDataType = {
  line: string;
  value: number;
  color: string;
};

export type TotalDataByLineType = {
  [line: string]: {
    Total: number;
    "In progress": number;
    Done: number;
  };
};
