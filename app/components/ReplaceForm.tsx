import { FC, useState, FormEvent } from 'react';
import ContaoElement from './ContaoElement';

interface ReplaceFormProps {
  onSubmit: (
    name: string, 
    namespace: string, 
    copyright: string, 
    route: boolean, 
    bootstrapCss: boolean, 
    fontAwesomeCss: boolean, 
    fancyboxCss: boolean, 
    bootstrapJs: boolean, 
    fancyboxJs: boolean, 
    jqueryJs: boolean, 
    wowJs: boolean, 
    elementsData: any[]
  ) => void;
}

const ReplaceForm: FC<ReplaceFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [namespace, setNamespace] = useState('');
  const [route, setRoute] = useState(false);
  const [copyright, setCopyright] = useState<string>(
    '* @author    Vrisini Dev Team\n' +
    '* @license   GNU/LGPL\n' +
    '* @copyright Vrisini Infotech 2024 - 2026'
  );
  const [loading, setLoading] = useState(false);
  
  // CSS and JS toggles
  const [bootstrapCss, setBootstrapCss] = useState(false);
  const [fontAwesomeCss, setFontAwesomeCss] = useState(false);
  const [fancyboxCss, setFancyboxCss] = useState(false);
  const [bootstrapJs, setBootstrapJs] = useState(false);
  const [fancyboxJs, setFancyboxJs] = useState(false);
  const [jqueryJs, setJqueryJs] = useState(false);
  const [wowJs, setWowJs] = useState(false);
  
  // Element management
  const [elementsData, setElementsData] = useState<any[]>([]);

  // Handle adding a new element
  const handleAddNewElement = () => {
    setElementsData(prevData => [...prevData, {}]); 
  };

  // Handle changing an element
  const handleElementChange = (index: number, data: any) => {
    console.log(data);
    
    setElementsData(prevData => {
      const newData = [...prevData];
      newData[index] = data;            
      return newData;
    });
    
  };

  // Handle removing an element
  const handleRemoveElement = (index: number) => {
    setElementsData(prevData => prevData.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(name, namespace, copyright, route, bootstrapCss, fontAwesomeCss, fancyboxCss, bootstrapJs, fancyboxJs, jqueryJs, wowJs, elementsData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mt-20 mx-auto border border-gray-300 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Bundle Generator</h1>

      <div className="mb-5">
        <label htmlFor="bundle-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bundle Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          id="bundle-name"
          name="bundle-name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Lorem Ipsum"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="namespace" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Namespace</label>
        <input
          value={namespace}
          onChange={e => setNamespace(e.target.value)}
          type="text"
          id="namespace"
          name="namespace"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Lorem Ipsum"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="copyright" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Copyright</label>
        <textarea
          value={copyright}
          onChange={e => setCopyright(e.target.value)}
          id="copyright"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          required
        ></textarea>
      </div>

      <div className="mb-5">
        <input
          type="checkbox"
          name="route"
          onChange={(e) => setRoute(e.target.checked)}
          checked={route}
        /> 
        <label className='ms-2' htmlFor="route">Use Route</label>
        {route && <h6 className="ms-5 text-gray-500">By default it will be set to Controller</h6>}
      </div>

      {elementsData.map((_, index) => (
        <ContaoElement
          key={index}
          addNewElement={index}
          onChange={handleElementChange}
          onRemove={() => handleRemoveElement(index)}
        />
      ))}

      <div className="flex justify-center mb-5">
        <button
          type="button"
          onClick={handleAddNewElement}
          className="text-white bg-green-700 hover:bg-green-800 mt-5 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {elementsData.length === 0 ? 'Add an Element' : 'Add another Element'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 border border-gray-700 p-2 rounded">
        <h2 className="text-lg col-span-2">Include CSS</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="checkbox"
              id="bootstrapCss"
              name="bootstrapCss"
              onChange={(e) => setBootstrapCss(e.target.checked)}
              checked={bootstrapCss}
            />
            <label htmlFor="bootstrapCss" className="ml-2">bootstrap.min.css</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="fontAwesomeCss"
              name="fontAwesomeCss"
              onChange={(e) => setFontAwesomeCss(e.target.checked)}
              checked={fontAwesomeCss}
            />
            <label htmlFor="fontAwesomeCss" className="ml-2">font-awesome.min.css</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="fancyboxCss"
              name="fancyboxCss"
              onChange={(e) => setFancyboxCss(e.target.checked)}
              checked={fancyboxCss}
            />
            <label htmlFor="fancyboxCss" className="ml-2">jquery.fancybox.min.css</label>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 border border-gray-700 p-2 rounded">
        <h2 className="text-lg col-span-2">Include JS</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="checkbox"
              id="bootstrapJs"
              name="bootstrapJs"
              onChange={(e) => setBootstrapJs(e.target.checked)}
              checked={bootstrapJs}
            />
            <label htmlFor="bootstrapJs" className="ml-2">bootstrap.min.js</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="fancyboxJs"
              name="fancyboxJs"
              onChange={(e) => setFancyboxJs(e.target.checked)}
              checked={fancyboxJs}
            />
            <label htmlFor="fancyboxJs" className="ml-2">jquery.fancybox.min.js</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="jqueryJs"
              name="jqueryJs"
              onChange={(e) => setJqueryJs(e.target.checked)}
              checked={jqueryJs}
            />
            <label htmlFor="jqueryJs" className="ml-2">jquery.min.js</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="wowJs"
              name="wowJs"
              onChange={(e) => setWowJs(e.target.checked)}
              checked={wowJs}
            />
            <label htmlFor="wowJs" className="ml-2">wow.min.js</label>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-5">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Bundle'}
        </button>
      </div>
    </form>
  );
};

export default ReplaceForm;
