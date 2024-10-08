import { useState } from 'react';
import QuestionBox from './components/QuestionBox';
import ModuleChanger from './components/ModuleChanger';

function App() {
  const [moduleData, setModuleData] = useState(null);
  const [conversationKey, setConversationKey] = useState(0);

  const handleModuleChange = (selectedModule) => {
    setModuleData(selectedModule);
    setConversationKey(conversationKey + 1);
  };

  return (
    <div className="App">
      <h1>{moduleData ? `${moduleData.module.name} - Virtual Tutor` : 'Virtual Tutor'}</h1>
      <div className="module-changer">
        <ModuleChanger onModuleChange={handleModuleChange} />
      </div>
      {moduleData && (
        <QuestionBox key={conversationKey} moduleData={moduleData} />
      )}
    </div>
  );
}

export default App;
