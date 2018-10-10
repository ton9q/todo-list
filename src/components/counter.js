import React from 'react';
import './counter.css';

export const Counter = (props) => (
  <div>
    <span className="count">{props.Counter.count}</span>
    <br/>
    <button className="btn" onClick={() => props.increment()}>Increment</button>
    <button className="btn" onClick={() => props.decrement()}>Decrement</button>
  </div>
)