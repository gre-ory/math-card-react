
// //////////////////////////////////////////////////
// quizz question

class QuizzQuestion {
  question: string;
  answer: string;
  onCorrect: (ms: number) => void;
  onIncorrect: (ms: number) => void;

  // //////////////////////////////////////////////////
  // constructor

  constructor(question: string, answer: string, onCorrect: (ms: number) => void, onIncorrect: (ms: number) => void) {
    this.question = question;
    this.answer = answer;   
    this.onCorrect = onCorrect;
    this.onIncorrect = onIncorrect;
  }
}

export default QuizzQuestion; 