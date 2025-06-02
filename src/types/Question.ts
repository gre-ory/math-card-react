import QuestionStats from "./QuestionStats";
import Stats from "./Stats";
import { JsonConfig, JsonAddConfig, JsonSubstractConfig, JsonMultiplyConfig, JsonDivideConfig } from "./Json";

// //////////////////////////////////////////////////
// question

export function NewStudyQuestion(question: string): Question {
  const matchAdd = AddRegex.exec(question)
  if ( matchAdd && matchAdd.groups ) {
    const a = parseInt(matchAdd.groups.a as string);
    const b = parseInt(matchAdd.groups.b as string);
    return NewAddQuestion(a, b);
  }
  const matchSubstract = SubstractRegex.exec(question)
  if ( matchSubstract && matchSubstract.groups ) {
    const a = parseInt(matchSubstract.groups.a as string);
    const b = parseInt(matchSubstract.groups.b as string);
    return NewSubstractQuestion(a, b);
  }
  const matchMultiply = MultiplyRegex.exec(question)
  if ( matchMultiply && matchMultiply.groups ) {
    const a = parseInt(matchMultiply.groups.a as string);
    const b = parseInt(matchMultiply.groups.b as string);
    return NewMultiplyQuestion(a, b);
  }
  const matchDivide = DivideRegex.exec(question)
  if ( matchDivide && matchDivide.groups ) {
    const a = parseInt(matchDivide.groups.a as string);
    const b = parseInt(matchDivide.groups.b as string);
    return NewDivideQuestion(a, b);
  }
  throw new Error(`Unknown question format: ${question}`);
}

export function NewAddQuestionFromConfig(cfg: JsonAddConfig): Question {
  const a = randomNumber(cfg.min, cfg.max);
  const b = randomNumber(cfg.min, cfg.max);
  return NewAddQuestion(a, b);
}

const AddRegex = /^(?<a>\d+) \+ (?<b>\d+)$/;

function NewAddQuestion(a: number, b: number): Question {
  return new Question(`add`, `${a} + ${b}`, (a + b).toString());
}

export function NewSubstractQuestionFromConfig(cfg: JsonSubstractConfig): Question {
  const a = randomNumber(cfg.min + cfg.delta, cfg.max);
  const b = randomNumber(cfg.min, a - cfg.delta);
  return NewSubstractQuestion(a, b);
}

const SubstractRegex = /^(?<a>\d+) \- (?<b>\d+)$/;

function NewSubstractQuestion(a: number, b: number): Question {
  if (a < b) {
    throw new Error(`Invalid substraction: ${a} - ${b}`);
  }
  return new Question(`substract`, `${a} - ${b}`, (a - b).toString());
}

export function NewMultiplyQuestionFromConfig(cfg: JsonMultiplyConfig): Question {
  const a = randomNumber(cfg.min, cfg.max);
  const b = randomNumber(cfg.min, cfg.max);
  return NewMultiplyQuestion(a, b);
}

const MultiplyRegex = /^(?<a>\d+) \* (?<b>\d+)$/;

function NewMultiplyQuestion(a: number, b: number): Question {
  return new Question(`multiply`, `${a} * ${b}`, (a * b).toString());
}

export function NewDivideQuestionFromConfig(cfg: JsonDivideConfig): Question {
  const a = randomNumber(cfg.min, cfg.max);
  const b = randomNumber(cfg.min, cfg.max);
  const multiply = a * b;
  return NewDivideQuestion(multiply, b);
}

const DivideRegex = /^(?<a>\d+) \/ (?<b>\d+)$/;

function NewDivideQuestion(a: number, b: number): Question {
  if (a < b) {
    throw new Error(`Invalid division: ${a} / ${b}`);
  }
  if (b === 0) {
    throw new Error(`Division by zero is not allowed`);
  }
  return new Question(`divide`, `${a} / ${b}`, (a / b).toString());
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