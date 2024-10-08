import { useEffect, useState } from 'react';

function ModuleChanger({ onModuleChange }) {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const moduleFiles = import.meta.glob('../../data/*.json');
        const loadedModules = [];

        for (const path in moduleFiles) {
          const moduleData = await moduleFiles[path]();

          if (moduleData?.module?.code && moduleData?.module?.name) {
            loadedModules.push({
              code: moduleData.module.code,
              name: moduleData.module.name,
              data: moduleData
            });
          }
        }

        setModules(loadedModules);
      } catch (error) {
        console.error('Error loading modules:', error);
      }
    };

    loadModules();
  }, []);

  const handleModuleChange = (event) => {
    const selectedModule = modules.find((mod) => mod.code === event.target.value);
    onModuleChange(selectedModule ? selectedModule.data : null);
  };

  return (
    <div className="module-changer">
      <select className="module-select" onChange={handleModuleChange} defaultValue="">
        <option value="" disabled>
          Choose a module...
        </option>
        {modules.length > 0 ? (
          modules.map((mod) => (
            <option key={mod.code} value={mod.code}>
              {mod.name} - {mod.code}
            </option>
          ))
        ) : (
          <option disabled>No modules available</option>
        )}
      </select>
    </div>
  );
}

export default ModuleChanger;
