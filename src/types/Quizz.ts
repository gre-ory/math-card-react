
import Stats from "./Stats"
import Question, { NewAddQuestionFromConfig, NewSubstractQuestionFromConfig, NewDivideQuestionFromConfig, NewMultiplyQuestionFromConfig, NewStudyQuestion } from "./Question"
import { JsonConfig } from "./Json";

// //////////////////////////////////////////////////
// quizz

class Quizz {
  cfg: JsonConfig;
  nbQuestion: number;
  questions: Array<Question>;
  stats: Stats;

  // //////////////////////////////////////////////////
  // constructor

  constructor(cfg: JsonConfig, nbQuestion: number, stats: Stats) {
    this.cfg = cfg;
    this.nbQuestion = nbQuestion;
    this.questions = new Array<Question>();
    this.stats = stats;
    this.selectRandomQuestions();
  }

  // //////////////////////////////////////////////////
  // get

  selectRandomQuestions() {
    console.log(` ###### select ${this.nbQuestion} random questions`)
    const selectors = new Array<(count: number, selected: Question[]) => Question[]>();
    const selectorWeights = new Array<number>();
    const selectorCounts = new Array<number>();

    console.log(` (+) add: weight=${this.cfg.add.weight}`)
    selectors.push(this.selectAddQuestions.bind(this));
    selectorWeights.push(this.cfg.add.weight);
    selectorCounts.push(0);

    console.log(` (+) substract: weight=${this.cfg.substract.weight}`)
    selectors.push(this.selectSubstractQuestions.bind(this));
    selectorWeights.push(this.cfg.substract.weight);
    selectorCounts.push(0);

    console.log(` (+) multiply: weight=${this.cfg.multiply.weight}`)
    selectors.push(this.selectMultiplyQuestions.bind(this));
    selectorWeights.push(this.cfg.multiply.weight);
    selectorCounts.push(0);

    console.log(` (+) divide: weight=${this.cfg.divide.weight}`)
    selectors.push(this.selectDivideQuestions.bind(this));
    selectorWeights.push(this.cfg.divide.weight);
    selectorCounts.push(0);

    // add it at the end to select studied questions not already selected
    if (this.stats.stats.size > this.nbQuestion) {
      console.log(` (+) study: weight=${this.cfg.study.weight}`)
      selectors.push(this.selectStudyQuestions.bind(this));
      selectorWeights.push(this.cfg.study.weight);
      selectorCounts.push(0);
    }

    var totalWeight = 0;
    for (let i = 0; i < selectorWeights.length; i++) {
      totalWeight += selectorWeights[i];
    }

    // select count random numbers up to sumWeight
    for (let i = 0; i < this.nbQuestion; i++) {
      var random = Math.floor(Math.random() * (totalWeight - 1)) + 1;
      // find the first weight that is greater than the random number
      var selectorIndex: number = 0;
      var sumWeight: number = 0;
      while (selectorIndex < selectorWeights.length && random > sumWeight + selectorWeights[selectorIndex]) {
        sumWeight += selectorWeights[selectorIndex];
        selectorIndex++;
      }
      // add the term to the selected terms
      if (selectorIndex < selectorCounts.length) {
        selectorCounts[selectorIndex] = selectorCounts[selectorIndex] + 1;
        // console.log(` (>) random: ${random} / selectorIndex: ${selectorIndex} / sumWeight: ${sumWeight} >>> ${selectorCounts[selectorIndex]}`)
      } else {
        throw new Error(`random selector failed: ${random} / ${totalWeight} / ${selectorWeights.length}`);
      }
    }

    const selectedQuestions = new Array<Question>();
    for (let i = 0; i < selectorCounts.length; i++) {
      const selectorCount = selectorCounts[i];
      if (selectorCount > 0) {
        const selector = selectors[i];
        const questions = selector(selectorCount, selectedQuestions);
        selectedQuestions.push(...questions);
      }
    }

    // shuffle the selected questions
    this.questions = [...selectedQuestions].sort(() => Math.random() - 0.5);

    console.log(` >>> ${this.questions.length} questions selected`)
  }

  selectStudyQuestions(count: number, selecteds: Question[]): Question[] {
    console.log(` ### ${count} study questions`)
    const values = this.stats.selectRandomQuestions(count, selecteds);
    const questions: Question[] = [];
    for (const value of values) {
      const question = NewStudyQuestion(value);
      // console.log(` (+) study: ${value} >>> ${question.question}`)
      questions.push(question);
    }
    return questions;
  }

  selectAddQuestions(count: number, selecteds: Question[]): Question[] {
    console.log(` ### ${count} add questions`)
    const questions: Question[] = [];
    var tryCount: number = 0;
    while (questions.length < count && tryCount < 250) {
      tryCount++;
      const created = NewAddQuestionFromConfig(this.cfg.add);
      if ( this.isUnique(created, questions) && this.isUnique(created, selecteds) ) {
        console.log(` (+) add >>> ${created.question}`)
        questions.push(created);
      }
    }
    return questions;
  }

  selectSubstractQuestions(count: number, selecteds: Question[]): Question[] {
    console.log(` ### ${count} substract questions`)
    const questions: Question[] = [];
    var tryCount: number = 0;
    while (questions.length < count && tryCount < 250) {
      tryCount++;
      const created = NewSubstractQuestionFromConfig(this.cfg.substract);
      if ( this.isUnique(created, questions) && this.isUnique(created, selecteds) ) {
        console.log(` (+) substract >>> ${created.question}`)
        questions.push(created);
      }
    }
    return questions;
  }

  selectMultiplyQuestions(count: number, selecteds: Question[]): Question[] {
    console.log(` ### ${count} multiply questions`)
    const questions: Question[] = [];
    var tryCount: number = 0;
    while (questions.length < count && tryCount < 250) {
      tryCount++;
      const created = NewMultiplyQuestionFromConfig(this.cfg.multiply);
      if ( this.isUnique(created, questions) && this.isUnique(created, selecteds) ) {
        console.log(` (+) multiply >>> ${created.question}`)
        questions.push(created);
      }
    }
    return questions;
  }

  selectDivideQuestions(count: number, selecteds: Question[]): Question[] {
    console.log(` ### ${count} divide questions`)
    const questions: Question[] = [];
    var tryCount: number = 0;
    while (questions.length < count && tryCount < 250) {
      tryCount++;
      const created = NewDivideQuestionFromConfig(this.cfg.divide);
      if ( this.isUnique(created, questions) && this.isUnique(created, selecteds) ) {
        console.log(` (+) divide >>> ${created.question}`)
        questions.push(created);
      }
    }
    return questions;
  }

  isUnique(question: Question, others: Question[]): boolean {
    const found = others.find((other: Question) => other.question === question.question);
    return !found;
  }

}

export default Quizz; 