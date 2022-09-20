export type OrganizeType = {
  [key: string]: OrganizeChartDataType[];
};

export type OrganizeChartDataType = {
  name: string;
  pic: string;
  row: number;
  role?: string;
};
