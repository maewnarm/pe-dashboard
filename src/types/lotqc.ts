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

export type ItemChartType = {
  process: string
  part_no: string
  parameter: string
  limit: LimitDataType
  data: ItemDataType
}

export type ItemChartDataType = {
  index: string
  value: number
}

export type ItemDataType = {
  [day: string]: {
    [index: string]: number | string
  }
}

export type LimitDataType = {
  upper_limit: string
  lower_limit: string
}