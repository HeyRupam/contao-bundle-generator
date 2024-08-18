"use client";

import { FC, useState, useRef } from "react";
import DbForm from "../components/DbForm";

const Home: FC = () => {
  const [entity, setEntity] = useState('');
  const [repository, setRepository] = useState('');
  const [dca, setDca] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormSubmit = async (tableName: string, defaultFields: any[], dcaFormsData: any[]) => {
    try {
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableName, defaultFields, dcaFormsData }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEntity(data.entityContent);
        setRepository(data.repositoryContent);
        setDca(data.dcaContent);

        // Scroll to textarea
        if (textareaRef.current) {
          textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    catch (error) {
      alert('Error updating files: ' + (error as Error).message);
    }
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000); // Disable the button for 2 seconds
    }).catch((error) => {
      alert('Failed to copy: ' + error.message);
    });
  }

  return (
    <main className="min-h-screen">
      <DbForm onSubmit={handleFormSubmit} />
      {entity &&
        <div className="relative border border-gray-300 p-4 text-center">
          <button
            onClick={() => handleCopy(entity, 'entity')}
            disabled={copied === 'entity'}
            className={`absolute top-2 right-2 px-4 py-2 text-white rounded-lg ${copied === 'entity' ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {copied === 'entity' ? 'Copied' : 'Copy'}
          </button>
          <label htmlFor="entity">Entity Content</label>
          <textarea
            name="entity"
            ref={textareaRef}
            rows={20}
            value={entity}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="entity"
            readOnly
          />
        </div>
      }
      {repository &&
        <div className="relative border border-gray-300 p-4 text-center">
          <button
            onClick={() => handleCopy(repository, 'repository')}
            disabled={copied === 'repository'}
            className={`absolute top-2 right-2 px-4 py-2 text-white rounded-lg ${copied === 'repository' ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {copied === 'repository' ? 'Copied' : 'Copy'}
          </button>
          <label htmlFor="repository">Repository Content</label>
          <textarea
            name="repository"
            rows={20}
            value={repository}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="repository"
            readOnly
          />
        </div>
      }
      {dca &&
        <div className="relative border border-gray-300 p-4 text-center">
          <button
            onClick={() => handleCopy(dca, 'dca')}
            disabled={copied === 'dca'}
            className={`absolute top-2 right-2 px-4 py-2 text-white rounded-lg ${copied === 'dca' ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {copied === 'dca' ? 'Copied' : 'Copy'}
          </button>
          <label htmlFor="dca">Dca Content</label>
          <textarea
            name="dca"
            rows={20}
            value={dca}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="dca"
            readOnly
          />
        </div>
      }
    </main>
  );
};

export default Home;
