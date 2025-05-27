
import Stats from "./Stats"
import Question, { NewQuestion } from "./Question"
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
  }

  // //////////////////////////////////////////////////
  // get

  selectRandomQuestions() {
    // select count random numbers up to sumWeight
    const selectedQuestions = new Array<Question>();
    for (let i = 0; i < this.nbQuestion; i++) {
      selectedQuestions.push(NewQuestion(this.cfg));
    }
    // shuffle the selected questions
    const shuffledQuestions = [...selectedQuestions].sort(() => Math.random() - 0.5);

    this.questions = shuffledQuestions;
  }
}

export default Quizz; 