import QuestionStats from "./QuestionStats";
import Stats from "./Stats";
import { JsonConfig, JsonAddConfig, JsonSubstractConfig, JsonMultiplyConfig, JsonDivideConfig } from "./Json";

// //////////////////////////////////////////////////
// helper

export function NewQuestion(cfg: JsonConfig): Question {
  switch (randomNumber(1,4)) {
    case 1:
      return NewAddQuestion(cfg.add);
    case 2:
      return NewSubstractQuestion(cfg.substract);
    case 3:
      return NewMultiplyQuestion(cfg.multiply);
    default:
      return NewDivideQuestion(cfg.divide);
  }
}

export function NewAddQuestion(cfg: JsonAddConfig): Question {
  const a = randomNumber(cfg.min, cfg.max);
  const b = randomNumber(cfg.min, cfg.max);
  const term = new Question(`add`, `${a} + ${b}`, (a + b).toString());
  return term;
}

export function NewSubstractQuestion(cfg: JsonSubstractConfig): Question {
  const a = randomNumber(cfg.min, cfg.max);
  const b = randomNumber(cfg.min, cfg.max);
  if (b > a) {
    const term = new Question(`substract`, `${b} - ${a}`, (b - a).toString());
    return term;
  }
  const term = new Question(`substract`, `${a} - ${b}`, (a - b).toString());
  return term;
}

export function NewMultiplyQuestion(cfg: JsonMultiplyConfig): Question {
  const a = randomNumber(cfg.min, cfg.max);
  const b = randomNumber(cfg.min, cfg.max);
  const term = new Question(`multiply`, `${a} * ${b}`, (a * b).toString());
  return term;
}

export function NewDivideQuestion(cfg: JsonDivideConfig): Question {
  const a = randomNumber(cfg.min, cfg.max);
  const b = randomNumber(cfg.min, cfg.max);
  const multiply = a * b;
  const term = new Question(`divide`, `${multiply} / ${a}`, (b).toString());
  return term;
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// //////////////////////////////////////////////////
// question

class Question {
  category: string;
  question: string;
  answer: string;

  // //////////////////////////////////////////////////
  // constructor

  constructor(category: string, question:string, answer:string) {
    this.category = category;
    this.question = question;
    this.answer = answer;
  }

  // //////////////////////////////////////////////////
  // getter

  getStats(stats: Stats): QuestionStats {
    return stats.getStats(this.question);
  }

  // //////////////////////////////////////////////////
  // callback

  onCorrect(stats: Stats, ms: number) {
    stats.flagAsCorrect(this.question, ms);
  }

  onIncorrect(stats: Stats, ms: number) {
    stats.flagAsIncorrect(this.question, ms);
  }
}

export default Question;