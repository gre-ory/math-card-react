import React, { useState } from 'react';
import CollectionCard from './CollectionCard';
import '../styles/SelectionScreen.css';
import Stats from '../types/Stats';

type SelectionScreenProps = {
  stats: Stats,
  onViewStats: () => void,
  onStartQuiz: (numberOfQuestions: number) => void
}

function SelectionScreen({ stats, onViewStats, onStartQuiz }: SelectionScreenProps) {
  return (
    <div className="selection-screen">
      <div className="collections-grid">
        <CollectionCard
          key="math"
          stats={stats}
          onSelect={onStartQuiz}
          onView={onViewStats}
        />
      </div>
    </div>
  );
}

export default SelectionScreen;