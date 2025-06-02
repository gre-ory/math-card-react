import React, { useState, useEffect } from 'react';

import SelectionScreen from './SelectionScreen';
import QuizScreen from './QuizScreen';
import StatsView from './StatsView';

import configData from '../config/config.json';

import Quizz from '../types/Quizz';
import Stats from '../types/Stats';

import '../styles/App.css';
import { JsonConfig, JsonQuestionStats, JsonStats } from '../types/Json';
import SettingsView from './SettingsView';

const StatsKey = 'math-stats';
const ConfigKey = 'math-config';

function App() {
  const [stats,setStats] = useState(undefined);
  const [config,setConfig] = useState(configData);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [quizz, setQuizz] = useState({} as Quizz);
  const [currentScreen, setCurrentScreen] = useState('selection');
  // const [termStats, setTermStats] = useState({});

  // Load term stats from localStorage on initial load
  useEffect(() => {
    setStats(loadStats());
    setConfig(loadConfig());
  }, []);

  const loadStats = () => {
    const stats = new Stats();  
    const rawStats = localStorage.getItem(StatsKey) || '';
    // console.log(`[loadStats] rawStats = `, rawStats);
    if (rawStats !== '') {
      const jsonStats: JsonStats = JSON.parse(rawStats);
      // console.log(`[loadStats] jsonStats = `, jsonStats);
      jsonStats.forEach((jsonQuestionStats: JsonQuestionStats) => {
        const questionStats = stats.getStats(jsonQuestionStats.id);
        questionStats.load(jsonQuestionStats);
      });
    }
    // console.log(`[loadStats] stats = `, stats);
    saveStats(stats); // Ensure stats are saved to localStorage
    return stats;
  }
  
  const loadConfig = () => {
    const rawConfig = localStorage.getItem(ConfigKey) || '';
    if (rawConfig !== '') {
      const jsonConfig: JsonConfig = JSON.parse(rawConfig);
      return jsonConfig;
    }
    return configData;
  }

  // // save stats to localStorage whenever they change
  // useEffect(() => {
  //   saveStats(stats);
  // }, [stats]);

  const saveStats = (stats:Stats) => {
    // console.log(`[saveStats] stats = `, stats)
    if (stats) {
      localStorage.setItem(StatsKey, JSON.stringify(stats.toJson()));
    } else {
      localStorage.removeItem(StatsKey);
    }
  }

  const saveConfig = (config:JsonConfig) => {
    // console.log(`[saveConfig] config = `, config)
    if (config) {
      localStorage.setItem(ConfigKey, JSON.stringify(config));
    } else {
      localStorage.removeItem(ConfigKey);
    }
  }

  const onStartQuiz = (questionCount) => {
    const quizz = new Quizz(config, questionCount, stats);
    setQuizz(quizz);
    setNumberOfQuestions(questionCount);
    setCurrentScreen('quiz');
  };

  const onCloseQuiz = () => {
    setQuizz(null);
    setNumberOfQuestions(0);
    setCurrentScreen('selection');
  };

  const onViewSettings = () => {
    setCurrentScreen('settings');
  };

  const onConfigUpdate = (newConfig) => {
    console.log(`[onConfigUpdate] onConfigUpdate = `, newConfig)
    saveConfig(newConfig);
    setConfig(newConfig);
  }

  const onViewStats = () => {
    setCurrentScreen('stats');
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
        onStats={saveStats}
        onClose={onCloseQuiz}
      />
    );
  } else if (currentScreen === 'stats') {
    return wrap(
      <StatsView 
        stats={stats}
        onClose={onCloseView} 
      />
    );
  } else if (currentScreen === 'settings') {
    console.log(`[settings] config: `, config)
    return wrap(
      <SettingsView 
        config={config}
        onUpdate={onConfigUpdate}
        onClose={onCloseView} 
      />
    );
  } else {
    // default
    return wrap(
      <SelectionScreen 
        onViewSettings={onViewSettings}
        onViewStats={onViewStats}
        stats={stats}
        onStartQuiz={onStartQuiz} 
      />
    );
  }
}

export default App;