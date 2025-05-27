import React, { useState, useEffect } from 'react';

import SelectionScreen from './SelectionScreen';
import QuizScreen from './QuizScreen';
import StatsView from './StatsView';

import configData from '../config/config.json';

import Quizz from '../types/Quizz';
import Stats from '../types/Stats';

import '../styles/App.css';
import { JsonQuestionStats, JsonStats } from '../types/Json';

const StatsKey = 'math-stats';

function App() {
  const [stats,setStats] = useState(undefined);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [quizz, setQuizz] = useState({} as Quizz);
  const [currentScreen, setCurrentScreen] = useState('selection');
  // const [termStats, setTermStats] = useState({});

  // Load term stats from localStorage on initial load
  useEffect(() => {
    const stats = loadStats();
    setStats(stats);
  }, []);

  const loadStats = () => {
    const stats = new Stats();  
    const rawStats = localStorage.getItem(StatsKey) || '';
    if (rawStats !== '') {
      const jsonStats: JsonStats = JSON.parse(rawStats);
      jsonStats.forEach((jsonQuestionStats: JsonQuestionStats) => {
        const questionStats = stats.getStats(jsonQuestionStats.id);
        questionStats.load(jsonQuestionStats);
      });
    }
    return stats;
  }

  const saveStats = (stats:Stats) => {
    if (stats) {
      localStorage.setItem(StatsKey, JSON.stringify(stats.toJson()));
    } else {
      localStorage.removeItem(StatsKey);
    }
  }

  const onStartQuiz = (questionCount) => {
    const quizz = new Quizz(configData, questionCount, stats);
    quizz.selectRandomQuestions();
    setQuizz(quizz);
    setNumberOfQuestions(questionCount);
    setCurrentScreen('quiz');
  };

  const onCloseQuiz = () => {
    setQuizz(null);
    setNumberOfQuestions(0);
    setCurrentScreen('selection');
  };

  const onCorrectTerm = (question: string, ms: number) => {
    setStats(prev => {
      const questionStats = (prev as Stats).getStats(question);
      questionStats.flagAsCorrect(ms);
      saveStats(prev);
      return prev;
    });
  }

  const onIncorrectTerm = (question: string, ms: number) => {
    setStats(prev => {
      const questionStats = (prev as Stats).getStats(question);
      questionStats.flagAsIncorrect(ms);
      saveStats(prev);
      return prev;
    });
  }

  const onViewStats = () => {
    setCurrentScreen('view');
  };

  const onCloseView = () => {
    setCurrentScreen('selection');
  };

  

  const wrap = (elt:any) => {
    return <div className="App">
      <main>
        {elt}
      </main>
    </div>
  }

  console.log(`[view] current-screen = ${currentScreen}`)

  if (currentScreen === 'quiz') {
    return wrap(
      <QuizScreen 
        quizz={quizz}
        onClose={onCloseQuiz}
      />
    );
  } else if (currentScreen === 'view') {
    return wrap(
      <StatsView 
        stats={stats}
        onClose={onCloseView} 
      />
    );
  } else {
    // default
    return wrap(
      <SelectionScreen 
        onViewStats={onViewStats}
        stats={stats}
        onStartQuiz={onStartQuiz} 
      />
    );
  }
}

export default App;