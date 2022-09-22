export type OverallChartDataType = {
  category: string
  value: number
  percent: number
}

export type HistoryChartDataType = {
  date: string
  type: string
  value: number
}

export type ItemChartDataType = {
  process: string
  part_no: string
  parameter: string
  limit: string
  data: ItemDataType
}

export type ItemDataType = {
  [day: string]: {
    [index: string]: number | string
  }
}