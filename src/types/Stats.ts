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
}
export default Stats; 