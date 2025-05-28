import React, { useState } from 'react';
import CollectionCard from './CollectionCard';
import '../styles/SelectionScreen.css';
import Stats from '../types/Stats';

type SelectionScreenProps = {
  stats: Stats,
  onViewSettings: () => void, 
  onViewStats: () => void,
  onStartQuiz: (numberOfQuestions: number) => void
}

function SelectionScreen({ stats, onViewSettings, onViewStats, onStartQuiz }: SelectionScreenProps) {
  return (
    <div className="selection-screen">
      <div className="collections-grid">
        <CollectionCard
          key="math"
          stats={stats}
          onSelect={onStartQuiz}
          onViewSettings={onViewSettings}
          onViewStats={onViewStats}
        />
      </div>
    </div>
  );
}

export default SelectionScreen;