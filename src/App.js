import React from 'react';
import './App.css'
import ImageUploader from './components/ImageUploader'

class App extends React.Component {
  render() {
    return (
      <div className="content">
        <ImageUploader />
      </div>
    );
  }
}

export default App;