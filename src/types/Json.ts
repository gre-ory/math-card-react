
export type JsonConfig = {
  add: JsonAddConfig,
  substract: JsonSubstractConfig,
  multiply: JsonMultiplyConfig,
  divide: JsonDivideConfig
}

export type JsonAddConfig = {
  min: number,
  max: number
}

export type JsonSubstractConfig = {
  min: number,
  max: number
}

export type JsonMultiplyConfig = {
  min: number,
  max: number
}

export type JsonDivideConfig = {
  min: number,
  max: number
}

export type JsonQuestionStats = {
  id: string, // question
  gr: number, // group
  co: number, // correct
  in: number, // incorrect
  ti: number[] // times
}

export type JsonStats = JsonQuestionStats[]
