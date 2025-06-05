import React, { useState, useEffect } from 'react';
import '../styles/StatsView.css';
import Stats from '../types/Stats';
import QuestionStats from '../types/QuestionStats';

type StatsViewProps = {
  stats: Stats,
  onClose: () => void
}

function StatsView({ stats, onClose }: StatsViewProps) {
  const [currentOrder, setOrder] = useState('');
  const [currentOrderDirection, setOrderDirection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredKeys, setFilteredKeys] = useState([] as string[]);
  const itemsPerPage = 10;
  
  // Filter items when search term changes
  useEffect(() => {
    const keys = Array.from(stats.stats.keys());
    if (!searchTerm.trim()) {
      setFilteredKeys(keys);
    } else {
      const search = searchTerm.toLowerCase().trim();
      const filtered = keys.filter((key: string) => 
        key.toLowerCase().includes(search) || `${eval(key)}`.includes(search)
      );
      setFilteredKeys(filtered);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, stats.stats]);

  

  // sort current items
  const compareKey = (a: string, b: string): number => {
    return a.localeCompare(b)
  }

  const compareGroup = (a: QuestionStats, b: QuestionStats): number => {
    if ( a.group < b.group ) return -1;
    if ( a.group > b.group ) return 1;
    return 0;
  }

  const compareCorrect = (a: QuestionStats, b: QuestionStats): number => {
    if ( a.correct < b.correct ) return -1;
    if ( a.correct > b.correct ) return 1;
    return 0;
  }

  const compareIncorrect = (a: QuestionStats, b: QuestionStats): number => {
    if ( a.incorrect < b.incorrect ) return -1;
    if ( a.incorrect > b.incorrect ) return 1;
    return 0;
  }

  const compareRate = (a: QuestionStats, b: QuestionStats): number => {
    if ( a.getSuccessRate() < b.getSuccessRate() ) return -1;
    if ( a.getSuccessRate() > b.getSuccessRate() ) return 1;
    return 0;
  }

  const compareAvgTime = (a: QuestionStats, b: QuestionStats): number => {
    if ( a.getAvgTime() < b.getAvgTime() ) return -1;
    if ( a.getAvgTime() > b.getAvgTime() ) return 1;
    return 0;
  }

  const compareWeight = (a: QuestionStats, b: QuestionStats): number => {
    if ( a.getWeight() < b.getWeight() ) return -1;
    if ( a.getWeight() > b.getWeight() ) return 1;
    return 0;
  }

  const compareItem = (keyA: string, keyB: string): number => {
    const a = stats.getStats(keyA);
    const b = stats.getStats(keyB);
    var result: number = 0;
    switch ( currentOrder ) {
      case 'group':
        result = compareGroup(a,b);
        break;
      case 'correct':
        result = compareCorrect(a,b);
        break;
      case 'incorrect':
        result = compareIncorrect(a,b);
        break;
      case 'rate':
        result = compareRate(a,b);
        break;
      case 'time':
        result = compareAvgTime(a,b);
        break;
      case 'weight':
        result = compareWeight(a,b);
        break;
    }
    if ( result === 0 ) {
      result = compareKey(keyA,keyB);
    }
    if ( currentOrderDirection === 'desc' ) {
      result = -1 * result;
    }
    return result;
  }
  
  (filteredKeys as string[]).sort(compareItem);

  // Calculate pagination
  const totalPages = Math.ceil(filteredKeys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredKeys.length);
  const currentKeys = ( filteredKeys as string[] ).slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleOrder = (order: string) => {
    if ( currentOrder === order ) {
      if ( currentOrderDirection === 'asc' ) {
        setOrderDirection('desc');
      } else if ( currentOrderDirection === 'desc' ) {
        setOrder('');
        setOrderDirection('');
      }
    } else {
      setOrder(order);
      setOrderDirection('asc');
    }
  }

  const getThStyle = (order: string): string => {
    if ( currentOrder === order ) {
      if ( currentOrderDirection === 'asc' ) {
        return 'order asc'
      } else if ( currentOrderDirection === 'desc' ) {
        return 'order desc'
      }
    }
    return ''
  }

  return (
    <div className="collection-content">
      <div className="collection-header">
        <h2>Stats</h2>
        <button className="button-close" onClick={onClose}>×</button>
      </div>
      
      <div className="collection-search">
        <input
          type="text"
          placeholder="Search terms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="collection-table-container">
        <table className="collection-table">
          <thead>
            <tr>
              <th 
                className={getThStyle('key')} 
                onClick={() => toggleOrder('key')}>
                  op
              </th>
              <th> 
                  =
              </th>
              <th 
                className={getThStyle('correct')} 
                onClick={() => toggleOrder('correct')}
                title='number of correct answers'>
                  ok
              </th>
              <th 
                className={getThStyle('incorrect')} 
                onClick={() => toggleOrder('incorrect')}
                title='number of incorrect answers'>
                  ko
              </th>
              <th 
                className={getThStyle('rate')} 
                onClick={() => toggleOrder('rate')}
                title='success rate'>
                  %
              </th>
              <th 
                className={getThStyle('time')} 
                onClick={() => toggleOrder('time')}
                title='avg time'>
                  t
              </th>
              <th 
                className={getThStyle('group')} 
                onClick={() => toggleOrder('group')}
                title='group'>
                  gr
              </th>
              <th 
                className={getThStyle('weight')} 
                onClick={() => toggleOrder('weight')}
                title='weight'>
                  w
              </th>
            </tr>
          </thead>
          <tbody>
            {currentKeys.length > 0 ? (
              currentKeys.map((key: string, index: number) => {
                const questionStats = stats.getStats(key);
                return <tr key={`${index}`}>
                  <td align="left">{key}</td>
                  <td align="left">{eval(key)}</td>
                  <td>{questionStats.correct}</td>
                  <td>{questionStats.incorrect}</td>
                  <td>{questionStats.getSuccessRate()}%</td>
                  <td>{questionStats.getAvgTimeSeconds()}s</td>
                  <td>{questionStats.group}</td>
                  <td>{questionStats.getWeight()}</td>
                  {/* <td>{questionStats.getGroupWeight()}</td>
                  <td>{questionStats.getTimeWeight()}</td> */}
                </tr>
              })
            ) : (
              <tr>
                <td colSpan="8" className="no-results">
                  {searchTerm ? 'Not found' : 'Empty'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => goToPage(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &laquo; Prev
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={() => goToPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

export default StatsView;