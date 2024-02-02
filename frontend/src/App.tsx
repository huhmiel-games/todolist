import React from 'react';
import { List } from './components/List';

function App() {
  return (
    <div className='p-2'>
      <header>
        <h1 className='text-center'>
          TODO LIST
        </h1>
        <List />
      </header>
    </div>
  );
}

export default App;
