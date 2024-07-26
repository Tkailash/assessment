import React, { useState } from 'react';
import axios from 'axios';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const webhookUrl = "http://localhost:8080/https://webhook.site/8192b547-9476-4fa6-b34d-5fe1fc762177";


function Modal({ onClose }) {
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');

  const handleAddSchema = () => {
    if (selectedSchema && !schemas.includes(selectedSchema)) {
      setSchemas([...schemas, selectedSchema]);
      setSelectedSchema('');
    }
  };

  const handleSchemaChange = (index, value) => {
    const newSchemas = [...schemas];
    newSchemas[index] = value;
    setSchemas(newSchemas);
  };

  const handleRemoveSchema = (index) => {
    const newSchemas = [...schemas];
    newSchemas.splice(index, 1);
    setSchemas(newSchemas);
  };

  const handleSubmit = () => {
    const schemaData = schemas.map((schema) => {
      const option = schemaOptions.find((opt) => opt.value === schema);
      return { [schema]: option.label };
    });

    const data = {
      segment_name: segmentName,
      schema: schemaData,
    };

    // Send data to server using Axios
    axios.post(webhookUrl, data)
      .then((response) => {
        console.log('Data successfully sent:', response.data);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });

    onClose();
  };

  const getAvailableOptions = () => {
    return schemaOptions.filter((opt) => !schemas.includes(opt.value));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        
        <div className='bg'>
        <h2>Saving Segment</h2>
        </div>
        <input
          type="text"
          placeholder="Name of the segment"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          className="input"
        />
        <div className="schema-section">
          {schemas.map((schema, index) => {
            const option = schemaOptions.find((opt) => opt.value === schema);
            return (
              <div key={index} className="schema-dropdown">
                <span
                  className={`schema-dot ${index % 2 === 0 ? 'green' : 'red'}`}
                />
                <select
                  value={schema}
                  onChange={(e) => handleSchemaChange(index, e.target.value)}
                  className="select"
                >
                  {schemaOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleRemoveSchema(index)} className="remove-btn">-</button>
              </div>
            );
          })}
        </div>
        <select
          value={selectedSchema}
          onChange={(e) => setSelectedSchema(e.target.value)}
          className="select"
        >
          <option value="">Add schema to segment</option>
          {getAvailableOptions().map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button onClick={handleAddSchema} className="add-schema-btn">+Add new schema</button>
        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSubmit}>Save the Segment</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

