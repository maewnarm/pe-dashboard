export const fmoeStatus = ["In progress", "Done"];
export const fmoeCategory = [
  "Man",
  "Machine",
  "Method",
  "Material",
  "Measurement",
  "Environment",
];
export const fmoeStatusColor: { [status: string]: string } = {
  "In progress": "#F7A76C",
  Done: "#59CE8F",
};
export const fmoeCategoryColor: {[cat:string] : string} = {
  "Man": "#367E18",
  "Machine": "#967E76",
  "Method": "#ECC5FB",
  "Material": "#5F6F94",
  "Measurement": "#704F4F",
  "Environment": "#90B77D",
}

export type OverallSumDataType = {
  status: string;
  category: string;
  percent: number;
};

export type InnerChartDaTaType = {
  status: string
  percent: number
}

export type OverallLineDataType = {

}