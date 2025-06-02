import QuestionStats from "./QuestionStats";
import { JsonStats } from "./Json";

class Stats {
  stats: Map<string,QuestionStats>

  // //////////////////////////////////////////////////
  // constructor

  constructor() {
    this.stats = new Map();
  }
    
  // //////////////////////////////////////////////////
  // json
  
  toJson(): JsonStats {
    const jsonStats: JsonStats = [];
    Array.from(this.stats.entries()).forEach(([question,questionStats]) => {
      jsonStats.push(questionStats.toJson(question));
    });
    return jsonStats
  }

  // //////////////////////////////////////////////////
  // getter

  getStats(question:string): QuestionStats {
    var stat = this.stats.get(question);
    if ( stat === undefined ) {
      stat = new QuestionStats();
      this.stats.set(question, stat);
    }
    return stat;
  }

  // //////////////////////////////////////////////////
  // setter

  reset() {
    this.stats = new Map();
  }

  flagAsCorrect(question:string, ms: number) {
    this.getStats(question).flagAsCorrect(ms);
  }

  flagAsIncorrect(question:string, ms: number) {
    this.getStats(question).flagAsIncorrect(ms);
  }

  // //////////////////////////////////////////////////
  // select

  selectRandomQuestions(count: number): string[] {
    const questions = new Array<string>();
    const weights = new Array<number>();
    var totalWeight: number = 0;
    // loop on map
    for (const [question, questionStats] of this.stats.entries()) {
      const questionWeight = questionStats.getWeight();
      totalWeight += questionWeight;
      // console.log(`[prepare] (+) question ${question} / questionWeight ${questionWeight} / totalWeight ${totalWeight}`);
      questions.push(question);
      weights.push(questionWeight);
    };
    // console.log(`[prepare] totalWeight: ${totalWeight}`);
    // select count random numbers up to sumWeight
    const selectedQuestions = new Array<string>();
    for (let i = 0; i < count; i++) {
      var random = Math.floor(Math.random() * (totalWeight - 1)) + 1;
      // find the first weight that is greater than the random number
      var questionIndex: number = 0;
      var sumWeight: number = 0;
      while (questionIndex < weights.length && random > sumWeight + weights[questionIndex]) {
        sumWeight += weights[questionIndex];
        questionIndex++;
      }
      // console.log(`[prepare] (>) random ${random} / questionIndex ${questionIndex} / sumWeight ${sumWeight}`);
      // add the term to the selected terms
      if (questionIndex < questions.length) {
        const question = questions[questionIndex];
        const questionWeight = weights[questionIndex];
        // console.log(`[random] >>> termIndex ${termIndex} / term ${term.key} / weight ${termWeight}`);
        console.log(` (+) question ${question} ( weight: ${questionWeight} )`);
        selectedQuestions.push(question);
        // avoid duplicates
        weights[questionIndex] = 0;
        totalWeight -= questionWeight;
      } else {
        throw new Error(`random term selection failed: ${random} / ${totalWeight} / ${weights.length}`);
      }
    }
    // shuffle the selected terms
    const shuffledTerms = [...selectedQuestions].sort(() => Math.random() - 0.5);

    return shuffledTerms;
  }
}
export default Stats; 