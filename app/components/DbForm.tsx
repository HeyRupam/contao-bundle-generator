// components/ReplaceForm.tsx
import { FC, useState, FormEvent } from 'react';
import DcaForm from './DcaForm';

interface DbFormProps {
  onSubmit: (tableName: string) => void;
}

const DbForm: FC<DbFormProps> = ({ onSubmit }) => {
  const [tableName, setTableName] = useState('');
  const [loading, setLoading] = useState(false);
  const [addNewField, setAddNewField] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(tableName);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewField = () => {
    setAddNewField(prev => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mt-20 mx-auto border border-gray-300 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Database</h1>
      <div className="mb-5">
        <label htmlFor="table-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Table Name</label>
        <input
          value={tableName}
          onChange={e => setTableName(e.target.value)}
          type="text"
          id="table-name"
          name="table-name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="tl_example"
          required
        />
      </div>
      {[...Array(addNewField)].map((_, index) => (
        <DcaForm key={index} addNewField={index} />
      ))}
      <div className='flex justify-center'>
      <button
        type="button"
        onClick={handleAddNewField}
        className="text-white bg-green-700 hover:bg-green-800 mt-5 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add New Field
      </button>
      </div>
      <button
        type="submit"
        className={`text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
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

export default DbForm;
