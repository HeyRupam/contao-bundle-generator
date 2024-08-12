"use client"
// components/ReplaceForm.tsx
import { FC, useState, FormEvent } from 'react';

interface ReplaceFormProps {
  onSubmit: (name: string, namespace: string, copyright: string, route: boolean) => void;
}

const ReplaceForm: FC<ReplaceFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [namespace, setNamespace] = useState('');
  const [route, setRoute] = useState(false);
  const [copyright, setCopyright] = useState<string>(
    '* @author    Vrisini Dev Team\n' +
    '* @license   GNU/LGPL\n' +
    '* @copyright Vrisini Infotech 2022 - 2026'
  );
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(name, namespace, copyright, route);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mt-20 mx-auto border border-gray-300 p-4 rounded-lg">
    <h1 className="text-2xl font-bold mb-5 text-center">Bundle Generator</h1>
    <div className="mb-5">
      <label htmlFor="bundle-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bundle Name</label>
      <input value={name} onChange={e => setName(e.target.value)} type="text" id="bundle-name" name="bundle-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lorem Ipsum" required />
    </div>
    <div className="mb-5">
      <label htmlFor="namespace" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Namespace</label>
      <input value={namespace} onChange={e => setNamespace(e.target.value)} type="text" id="namespace" name="namespace" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lorem Ipsum" required />
    </div>
    <div className="mb-5">
      <label htmlFor="copyright" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Copyright</label>
      <textarea value={copyright} onChange={e => setCopyright(e.target.value)} id="copyright" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." required></textarea>
    </div>
    <div className="mb-5">
      <input type='checkbox' name='route' onChange={(e) => setRoute(e.target.checked)} checked={route} /> <label htmlFor='route'>Use Route</label>
    </div>
    <button 
        type="submit" 
        className={`text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.29-4.29L20 12l-2.71 2.71A8 8 0 014 12z"></path>
            </svg>
            <span>Generating...</span>
          </div>
        ) : (
          'Submit'
        )}
      </button>  
    </form>
  );
};

export default ReplaceForm;
