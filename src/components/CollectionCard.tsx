import React from 'react';

import Stats from '../types/Stats';

import '../styles/CollectionCard.css';

type CollectionCardProps = {
  key: string,
  stats: Stats,
  onSelect: (count: number) => void,
  onViewStats: () => void,
  onViewSettings: () => void
}

function CollectionCard({ stats, onSelect, onViewStats, onViewSettings }: CollectionCardProps) {

  // Available question count options
  const questionOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  
  return (
    <div className="collection-card">
      <div className="collection-card-header">
        <h3>Math</h3>

        <button 
          className="view-button settings"
          onClick={() => onViewSettings()}
        >
          &#x1F4C1;
        </button>

        <button 
          className="view-button stats"
          onClick={() => onViewStats()}
        >
          &#x1F441;
        </button>
      </div>
      
      <div className="collection-card-content">
        
        <div className="collection-boxes">
        {[1,2,3,4,5].map(group => {
          var count = stats ? Array.from(stats.stats.values()).filter(questionStats => {
            const questionGroup = questionStats.group;
            return group === questionGroup;
          }).length : 0;
          return <div key={group} className={`collection-box box-${group}`}>
            {count}
          </div>
        })}
        </div>

        <div className="question-count-options">
          {questionOptions.map(count => (
            <button 
              key={count} 
              className="question-count-button"
              onClick={() => onSelect(count)}
            >
              {count}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}

export default CollectionCard;