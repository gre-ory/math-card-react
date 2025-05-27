import React, { useState, useRef, useEffect } from 'react';
import '../styles/QuizCard.css';

type QuizCardProps = {
  question: string,
  answer: string,
  onResult: (boolean, number) => void,
  questionNumber: number,
  nbQuestion: number,
  active: boolean
}

function QuizCard({ question, answer, onResult, questionNumber, nbQuestion, active }: QuizCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(null);  
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const cardRef = useRef(null);

  // Reset card state when it becomes active or inactive
  useEffect(() => {
    if (active) {
      setIsFlipped(false);
      setOffsetX(0);
      setIsAnimatingOut(false);
      setAnimationDirection(null);
      setStartTime(Date.now());
      setEndTime(0);
    }
  }, [active]);

  // Don't handle interactions if card is not active
  if (!active && !isAnimatingOut) {
    return (
      <div className="card-container">
        <div className="quiz-card" style={{ visibility: 'hidden' }}></div>
      </div>
    );
  }

  const answerTime = () => {
    return startTime !== 0 && endTime !== 0 ? endTime - startTime : 0;
  }

  const toSeconds = (ms: number) => {
    return ms !== 0 ? Math.round((ms)/100)/10 : 0;
  }

  const onCardClick = (e) => {
    // prevent click when dragging
    if (!isDragging && !isAnimatingOut) {
      if (!isFlipped && endTime === 0) {
        const currentTime = Date.now();
        setEndTime(currentTime)
      }
      setIsFlipped(!isFlipped);
    }
    // stop event propagation to prevent card flip
    e.stopPropagation();
  };

  const onCorrectClick = (e) => {
    // prevent click when dragging
    if (!isDragging && !isAnimatingOut) {
      animateSwipe(true);
    }
    // stop event propagation to prevent card flip
    e.stopPropagation();
  };

  const onIncorrectClick = (e) => {
    // prevent click when dragging
    if (!isDragging && !isAnimatingOut) {
      animateSwipe(false);
    }
    // stop event propagation to prevent card flip
    e.stopPropagation();
  };

  const onTouchStart = (e) => {
    if (isFlipped && !isAnimatingOut && active) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
    }
  };

  const onMouseDown = (e) => {
    if (isFlipped && !isAnimatingOut && active) {
      setIsDragging(true);
      setStartX(e.clientX);
    }
  };

  const onTouchMove = (e) => {
    if (isDragging && !isAnimatingOut && active) {
      const currentX = e.touches[0].clientX;
      setOffsetX(currentX - startX);
    }
  };

  const onMouseMove = (e) => {
    if (isDragging && !isAnimatingOut && active) {
      const currentX = e.clientX;
      setOffsetX(currentX - startX);
    }
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    if (!active) return;
    if (isAnimatingOut) return;
    
    // Determine if card was swiped far enough to count as a result
    if (offsetX > 100) {
      animateSwipe(true);
    } else if (offsetX < -100) {
      animateSwipe(false);
    } else {
      // Reset position if not swiped far enough
      setOffsetX(0);
    }
  };

  const animateSwipe = (isCorrect: boolean) => {
    // Set animation direction and state
    setAnimationDirection(isCorrect ? 'right' : 'left');
    setIsAnimatingOut(true);
    
    // Animation values
    const targetX = isCorrect ? window.innerWidth : -window.innerWidth;
    
    // Use requestAnimationFrame for smoother animation
    let startTime = null;
    const duration = 300; // Animation duration in ms
    const startOffset = offsetX;
    const diffX = targetX - startOffset;
    
    const animateFrame = (timestamp) => {
      if ( !startTime ) {
        startTime = timestamp;
      } 
      const elapsed = startTime ? timestamp - startTime : 0;
      
      if (elapsed < duration) {
        // Calculate progress with easing
        const progress = elapsed / duration;
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const newOffset = startOffset + diffX * easeOutCubic;
        
        setOffsetX(newOffset);
        requestAnimationFrame(animateFrame);
      } else {
        // Animation complete
        setOffsetX(targetX);
        
        // Notify parent component of result
        setTimeout(() => {
          console.log(`[action] >>> onResult( ${isCorrect}, ${answerTime()} ms )`)
          onResult(isCorrect, answerTime());
        }, 100);
      }
    };
    
    requestAnimationFrame(animateFrame);
  };

  // // Calculate background color, opacity, and transform based on swipe direction
  const getCardStyle = () => {
    // let backgroundColor = 'white';
    let opacity = 1;
    // let transform = `translateX(${offsetX}px) rotateY(${isFlipped ? '180deg' : '0deg'})`;
    let transform = `translateX(${offsetX}px)`;
    let rotate = 0;
    
    // Scale opacity based on swipe distance (fade out as it moves away)
    const maxSwipeDistance = window.innerWidth / 2;
    const absOffset = Math.abs(offsetX);
    
    if (absOffset > 50) {
      // Calculate opacity (1 -> 0 as card moves away)
      opacity = Math.max(1 - (absOffset / maxSwipeDistance), 0.2);
      
      // Add rotation based on swipe direction
      rotate = offsetX * 0.05;
      rotate = Math.max(Math.min(rotate, 10), -10); // Limit rotation to -10 to 10 degrees

      transform = `${transform} rotate(${rotate}deg)`;
    }
    
    // transform = `translateX(${offsetX}px) rotateY(${isFlipped ? '180deg' : '0deg'}) rotate(${rotate}deg)`;
    
    return {
      transform,
      // backgroundColor,
      opacity,
    };
  };

  return (
    <div className="card-container">
      <div 
        className={`quiz-card ${isFlipped ? 'flipped' : ''}`}
        ref={cardRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={onCardClick}
        style={getCardStyle()}
      >
        <div className="card-front"> 
          <div className="card-instruction">
            Question {questionNumber} / {nbQuestion}
          </div>
          <div className="card-content">
            {question}
          </div>
          {/* <div className="card-buttons">
            <button 
              className="incorrect-button" 
              onClick={onIncorrectClick}
            >
              ← Incorrect
            </button>
            <button
              className="correct-button"
              onClick={onCorrectClick}
            >
              Correct →
            </button>
          </div> */}
        </div>
        <div className="card-back">
          <div className="card-instruction">
            Answer {questionNumber} / {nbQuestion}
          </div>
          <div className="card-content">
            {answer}
          </div>
          <div className="card-buttons">
            <button 
              className="incorrect-button" 
              onClick={onIncorrectClick}
            >
              ← Incorrect
            </button>
            <button
              className="correct-button"
              onClick={onCorrectClick}
            >
              Correct →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;