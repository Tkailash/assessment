import React, { useState } from 'react';
import Modal from './modal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const webhookUrl = ' https://webhook.site/8192b547-9476-4fa6-b34d-5fe1fc762177'; // Replace with your webhook URL

  return (
    <div className="App">
      <div className='heading'><h4>View Audience</h4></div>
      <button className="save-segment-btn" onClick={() => setIsModalOpen(true)}>
        Save segment
      </button>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} webhookUrl={webhookUrl} />}
    </div>
  );
}

export default App;
