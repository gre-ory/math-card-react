import React, { useState, useEffect } from 'react';
import Stats from '../types/Stats';
import QuestionStats from '../types/QuestionStats';
import { JsonConfig } from '../types/Json';
import '../styles/SettingsView.css';

type SettingsViewProps = {
  config: JsonConfig,
  onUpdate: (JsonConfig) => void,
  onClose: () => void,
}

const MinWeight = 0;
const MaxWeight = 100;
const MinMin = 1;
const MaxMax = 100;

function SettingsView({ config, onUpdate, onClose }: SettingsViewProps) {
  const [studyWeight,setStudyWeight] = useState(config.study.weight);
  const [studyWeightClass,setStudyWeightClass] = useState('');
  const [addWeight,setAddWeight] = useState(config.add.weight);
  const [addWeightClass,setAddWeightClass] = useState('');
  const [addMin,setAddMin] = useState(config.add.min);
  const [addMinClass,setAddMinClass] = useState('');
  const [addMax,setAddMax] = useState(config.add.max);
  const [addMaxClass,setAddMaxClass] = useState('');
  const [substractWeight,setSubstractWeight] = useState(config.substract.weight);
  const [substractWeightClass,setSubstractWeightClass] = useState('');
  const [substractMin,setSubstractMin] = useState(config.substract.min);
  const [substractMinClass,setSubstractMinClass] = useState('');
  const [substractMax,setSubstractMax] = useState(config.substract.max);
  const [substractMaxClass,setSubstractMaxClass] = useState('');
  const [multiplyWeight,setMultiplyWeight] = useState(config.multiply.weight);
  const [multiplyWeightClass,setMultiplyWeightClass] = useState('');
  const [multiplyMin,setMultiplyMin] = useState(config.multiply.min);
  const [multiplyMinClass,setMultiplyMinClass] = useState('');
  const [multiplyMax,setMultiplyMax] = useState(config.multiply.max);
  const [multiplyMaxClass,setMultiplyMaxClass] = useState('');
  const [divideWeight,setDivideWeight] = useState(config.divide.weight);
  const [divideWeightClass,setDivideWeightClass] = useState('');
  const [divideMin,setDivideMin] = useState(config.divide.min);
  const [divideMinClass,setDivideMinClass] = useState('');
  const [divideMax,setDivideMax] = useState(config.divide.max);
  const [divideMaxClass,setDivideMaxClass] = useState('');

  const sanitizeNumber = (value: string, min: number, max: number): number | undefined => {
    const num:number = parseInt(value)
    if ( value !== `${num}` ) {
      return undefined
    }
    if ( isNaN(num) ) {
      return undefined;
    }
    if ( num < min || num > max ) {
      return undefined;
    }
    return num;
  }

  const sanitizeWeight = (value: string): number | undefined => {
    return sanitizeNumber(value, MinWeight, MaxWeight);
  }

  const sanitizeMin = (value: string, max: number): number | undefined => {
    return sanitizeNumber(value, MinMin, max);
  }

  const sanitizeMax = (value: string, min: number): number | undefined => {
    return sanitizeNumber(value, min, MaxMax);
  }

  const onconfig = (newConfig: JsonConfig) => {
    console.log(`[onconfig] newConfig: `, newConfig);
    onUpdate(newConfig);
  }

  const onStudyWeight = (value: string) => {
    console.log(`[setStudyWeight] value: ${value}`);
    setStudyWeight(value);
    const weight = sanitizeWeight(value);
    if ( weight !== undefined ) {
      config.study.weight = weight;
      onconfig(config);
      setStudyWeightClass('');
    } else {
      setStudyWeightClass('error');
    }
  }

  const onAddWeight = (value: string) => {
    console.log(`[setAddWeight] value: ${value}`);
    setAddWeight(value);
    const weight = sanitizeWeight(value);
    if ( weight !== undefined ) {
      config.add.weight = weight;
      onconfig(config);
      setAddWeightClass('');
    } else {
      setAddWeightClass('error');
    }
  }

  const onAddMin = (value: string) => {
    const min = sanitizeMin(value, config.add.max);
    if (min !== undefined) {
      config.add.min = min;
      onconfig(config);
      setAddMinClass('');
    } else {
      setAddMinClass('error');
    }
  }

  const onAddMax = (value: string) => {
    const max = sanitizeMax(value, config.add.min);
    if (max !== undefined) {
      config.add.max = max;
      onconfig(config);
      setAddMaxClass('');
    } else {
      setAddMaxClass('error');
    }
  }

  const onSubstractWeight = (value: string) => {
    const weight = sanitizeWeight(value);
    if (weight !== undefined) {
      config.substract.weight = weight;
      onconfig(config);
      setSubstractWeightClass('');
    } else {
      setSubstractWeightClass('error');
    }
  }

  const onSubstractMin = (value: string) => {
    const min = sanitizeMin(value, config.substract.max);
    if (min !== undefined) {
      config.substract.min = min;
      onconfig(config);
      setSubstractMinClass('');
    } else {
      setSubstractMinClass('error');
    }
  }

  const onSubstractMax = (value: string) => {
    const max = sanitizeMax(value, config.substract.min);
    if (max !== undefined) {
      config.substract.max = max;
      onconfig(config);
      setSubstractMaxClass('');
    } else {
      setSubstractMaxClass('error');
    }
  }

  const onMultiplyWeight = (value: string) => {
    const weight = sanitizeWeight(value);
    if (weight !== undefined) {
      config.multiply.weight = weight;
      onconfig(config);
      setMultiplyWeightClass('');
    } else {
      setMultiplyWeightClass('error');
    }
  }

  const onMultiplyMin = (value: string) => {
    const min = sanitizeMin(value, config.multiply.max);
    if (min !== undefined) {
      config.multiply.min = min;
      onconfig(config);
      setMultiplyMinClass('');
    } else {
      setMultiplyMinClass('error');
    }
  }

  const onMultiplyMax = (value: string) => {
    const max = sanitizeMax(value, config.multiply.min);
    if (max !== undefined) {
      config.multiply.max = max;
      onconfig(config);
      setMultiplyMaxClass('');
    } else {
      setMultiplyMaxClass('error');
    }
  }

  const onDivideWeight = (value: string) => {
    const weight = sanitizeWeight(value);
    if (weight !== undefined) {
      config.divide.weight = weight;
      onconfig(config);
      setDivideWeightClass('');
    } else {
      setDivideWeightClass('error');
    }
  }

  const onDivideMin = (value: string) => {
    const min = sanitizeMin(value, config.divide.max);
    if (min !== undefined) {
      config.divide.min = min;
      onconfig(config);
      setDivideMinClass('');
    } else {
      setDivideMinClass('error');
    }
  }

  const onDivideMax = (value: string) => {
    const max = sanitizeMax(value, config.divide.min);
    if (max !== undefined) {
      config.divide.max = max;
      onconfig(config);
      setDivideMaxClass('');
    } else {
      setDivideMaxClass('error');
    }
  }

  console.log(`[settings-view] config: `, config)

  return (
    <div className="settings-view">
      <div className="settings-header">
        <h2>Settings</h2>
        <button className="button-close" onClick={onClose}>×</button>
      </div>

      <div className="settings-content">
        <fieldset className="settings-row">
          <legend>Study</legend>

          <label htmlFor="study-weight">Weight</label>
          <input
            id="study-weight"
            type="text"
            placeholder="Weight..."
            defaultValue={config.study.weight}
            onChange={(e) => onStudyWeight(e.target.value)}
            className={`weight-input ${studyWeightClass}`}
          />

        </fieldset>
        <fieldset className="settings-row">
          <legend>Add</legend>

          <label htmlFor="add-weight">Weight</label>
          <input
            id="add-weight"
            type="text"
            placeholder="Weight..."
            defaultValue={config.add.weight}
            onChange={(e) => onAddWeight(e.target.value)}
            className={`weight-input ${addWeightClass}`}
          />

          <label htmlFor="add-min">Min</label>
          <input
            id="add-min"
            type="text"
            placeholder="Min..."
            defaultValue={config.add.min}
            onChange={(e) => onAddMin(e.target.value)}
            className={`min-input ${addMinClass}`}
          />

          <label htmlFor="add-max">Max</label>
          <input
            id="add-max"
            type="text"
            placeholder="Max..."
            defaultValue={config.add.max}
            onChange={(e) => onAddMax(e.target.value)}
            className={`max-input ${addMaxClass}`}
          />

        </fieldset>
        <fieldset className="settings-row">
          <legend>Substract</legend>

          <label htmlFor="substract-weight">Weight</label>
          <input
            id="substract-weight"
            type="text"
            placeholder="Weight..."
            defaultValue={config.substract.weight}
            onChange={(e) => onSubstractWeight(e.target.value)}
            className={`weight-input ${substractWeightClass}`}
          />

          <label htmlFor="substract-min">Min</label>
          <input
            id="substract-min"
            type="text"
            placeholder="Min..."
            defaultValue={config.substract.min}
            onChange={(e) => onSubstractMin(e.target.value)}
            className={`min-input ${substractMinClass}`}
          />
          
          <label htmlFor="substract-max">Max</label>
          <input
            id="substract-max"
            type="text"
            placeholder="Max..."
            defaultValue={config.substract.max}
            onChange={(e) => onSubstractMax(e.target.value)}
            className={`max-input ${substractMaxClass}`}
          />

        </fieldset>
        <fieldset className="settings-row">
          <legend>Multiply</legend>

          <label htmlFor="multiply-weight">Weight</label>
          <input
            id="multiply-weight"
            type="text"
            placeholder="Weight..."
            defaultValue={config.multiply.weight}
            onChange={(e) => onMultiplyWeight(e.target.value)}
            className={`weight-input ${multiplyWeightClass}`}
          />

          <label htmlFor="multiply-min">Min</label>
          <input
            id="multiply-min"
            type="text"
            placeholder="Min..."
            defaultValue={config.multiply.min}
            onChange={(e) => onMultiplyMin(e.target.value)}
            className={`min-input ${multiplyMinClass}`}
          />
          
          <label htmlFor="multiply-max">Max</label>
          <input
            id="multiply-max"
            type="text"
            placeholder="Max..."
            defaultValue={config.multiply.max}
            onChange={(e) => onMultiplyMax(e.target.value)}
            className={`max-input ${multiplyMaxClass}`}
          />

        </fieldset>
        <fieldset className="settings-row">
          <legend>Divide</legend>
          
          <label htmlFor="divide-weight">Weight</label>
          <input
            id="divide-weight"
            type="text"
            placeholder="Weight..."
            defaultValue={config.divide.weight}
            onChange={(e) => onDivideWeight(e.target.value)}
            className={`weight-input ${divideWeightClass}`}
          />

          <label htmlFor="divide-min">Min</label>
          <input
            type="text"
            placeholder="Min..."
            defaultValue={config.divide.min}
            onBlur={(e) => onDivideMin(e.target.value)}
            className={`min-input ${divideMinClass}`}
          />

          <label htmlFor="divide-max">Max</label>
          <input
            type="text"
            placeholder="Max..."
            defaultValue={config.divide.max}
            onChange={(e) => onDivideMax(e.target.value)}
            className={`max-input ${divideMaxClass}`}
          />

        </fieldset>
      </div>
    </div>
  );
}

export default SettingsView;