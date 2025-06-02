
export type JsonConfig = {
  study: JsonStudyConfig,
  add: JsonAddConfig,
  substract: JsonSubstractConfig,
  multiply: JsonMultiplyConfig,
  divide: JsonDivideConfig
}

export type JsonStudyConfig = {
  weight: number
}

export type JsonAddConfig = {
  weight: number,
  min: number,
  max: number
}

export type JsonSubstractConfig = {
  weight: number,
  min: number,
  max: number,
  delta: number // minimum difference between a and b
}

export type JsonMultiplyConfig = {
  weight: number,
  min: number,
  max: number
}

export type JsonDivideConfig = {
  weight: number,
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
