"use client"

import { useState } from 'react';
import Select, { SingleValue } from 'react-select';

// Define the type for the options
interface OptionType {
    value: string;
    label: string;
}

const options = [
    { value: 'checkbox', label: 'checkbox' },
    { value: 'checkboxWizard', label: 'checkboxWizard' },
    { value: 'chmod', label: 'chmod' },
    { value: 'fileTree', label: 'fileTree' },
    { value: 'imageSize', label: 'imageSize' },
    { value: 'inputUnit', label: 'inputUnit' },
    { value: 'keyValueWizard', label: 'keyValueWizard' },
    { value: 'listWizard', label: 'listWizard' },
    { value: 'metaWizard', label: 'metaWizard' },
    { value: 'moduleWizard', label: 'moduleWizard' },
    { value: 'optionWizard', label: 'optionWizard' },
    { value: 'pageTree', label: 'pageTree' },
    { value: 'password', label: 'password' },
    { value: 'picker', label: 'picker' },
    { value: 'radio', label: 'radio' },
    { value: 'radioTable', label: 'radioTable' },
    { value: 'sectionWizard', label: 'sectionWizard' },
    { value: 'select', label: 'select' },
    { value: 'serpPreview', label: 'serpPreview' },
    { value: 'tableWizard', label: 'tableWizard' },
    { value: 'text', label: 'text' },
    { value: 'textStore', label: 'textStore' },
    { value: 'textarea', label: 'textarea' },
    { value: 'timePeriod', label: 'timePeriod' },
    { value: 'trbl', label: 'trbl' },
];

interface DcaFormProps {
    addNewField: number;
}

export default function DcaForm({ addNewField }: DcaFormProps) {

    const [field, setField] = useState('');
    const [evals, setEvals] = useState('');
    const [optionsValue, setOptionsValue] = useState('');
    const [fieldType, setFieldType] = useState('');
    const [sqlType, setSqlType] = useState('');
    const [sqlLength, setSqlLength] = useState('');
    const [sqlDefault, setSqlDefault] = useState('');
    const [sqlNullable, setSqlNullable] = useState(false);
    const [sqlUnsigned, setSqlUnsinged] = useState(false);
    const [sqlAutoIncrement, setSqlAutoIncrement] = useState(false);
    const [otherExclude, setOtherExclude] = useState(true);
    const [otherToggle, setOtherToggle] = useState(false);
    const [otherSearch, setOtherSearch] = useState(false);
    const [otherSorting, setOtherSorting] = useState(false);
    const [otherFilter, setOtherFilter] = useState(false);

    // Handler for select change
    const handleSelectChange = (selectedOption: SingleValue<OptionType>) => {
        setFieldType(selectedOption ? selectedOption.value : '');
    };

    // Custom styles for react-select
    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: '#1f2937', // Tailwind's bg-gray-800
            borderColor: '#4b5563',     // Tailwind's border-gray-600
            color: '#f9fafb',           // Tailwind's text-white
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#60a5fa', // Tailwind's border-blue-400
            }
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: '#1f2937', // Tailwind's bg-gray-800
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#4b5563' : '#1f2937', // Tailwind's bg-gray-700
            color: '#f9fafb',  // Tailwind's text-white
            '&:hover': {
                backgroundColor: '#3b82f6', // Tailwind's bg-blue-500
            }
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#f9fafb', // Tailwind's text-white
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: '#f9fafb', // Tailwind's text-white
        }),
        input: (provided: any) => ({
            ...provided,
            color: '#f9fafb', // Tailwind's text-white
        }),
    };

    return (
        <div className="grid grid-cols-2 gap-4 border border-gray-700 p-2 rounded my-5">
            <div className="mb-5">
                <label htmlFor={`field_${addNewField}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field Name</label>
                <input value={field} onChange={e => setField(e.target.value)} type="text" id={`field_${addNewField}`} name={`field_${addNewField}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="fields" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field Type</label>
                <Select
                    id="fields"
                    name="fields"
                    options={options}
                    onChange={handleSelectChange}
                    className="basic-single"
                    styles={customStyles}
                    classNamePrefix="select"
                />
            </div>
            <div className="mb-5">
                <label htmlFor={`evals_${addNewField}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Evals</label>
                <input value={evals} onChange={e => setEvals(e.target.value)} type="text" id={`evals_${addNewField}`} name={`evals_${addNewField}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            {fieldType === 'select' && (
                <div className="mb-5">
                    <label htmlFor={`options_${addNewField}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Options</label>
                    <input value={optionsValue} onChange={e => setOptionsValue(e.target.value)} type="text" id={`options_${addNewField}`} name={`options_${addNewField}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
            )}
            <h3 className='text-lg col-span-2 text-center'>SQL</h3>
            <hr className='col-span-2 border-gray-700' />
            <div className="mb-5">
                <label htmlFor={`sql_type_${addNewField}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                <input value={sqlType} onChange={e => setSqlType(e.target.value)} type="text" id={`sql_type_${addNewField}`} name={`sql_type_${addNewField}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor={`sql_length_${addNewField}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Length</label>
                <input value={sqlLength} onChange={e => setSqlLength(e.target.value)} type="number" id={`sql_length_${addNewField}`} name={`sql_length_${addNewField}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor={`sql_default_${addNewField}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default</label>
                <input value={sqlDefault} onChange={e => setSqlDefault(e.target.value)} type="text" id={`sql_default_${addNewField}`} name={`sql_default_${addNewField}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className='grid grid-cols-3 align-middle'>
                <div className="mb-5">
                    <input type='checkbox' name={`sql_nullable_${addNewField}`} id={`sql_nullable_${addNewField}`} onChange={(e) => setSqlNullable(e.target.checked)} checked={sqlNullable} /> <label htmlFor={`sql_nullable_${addNewField}`}>Nullable</label>
                </div>
                <div className="mb-5">
                    <input type='checkbox' name={`sql_unsinged_${addNewField}`} id={`sql_unsinged_${addNewField}`} onChange={(e) => setSqlUnsinged(e.target.checked)} checked={sqlUnsigned} /> <label htmlFor={`sql_unsinged_${addNewField}`}>Unsigned</label>
                </div>
                <div className="mb-5">
                    <input type='checkbox' name={`sql_autoincrement_${addNewField}`} id={`sql_autoincrement_${addNewField}`} onChange={(e) => setSqlAutoIncrement(e.target.checked)} checked={sqlAutoIncrement} /> <label htmlFor={`sql_autoincrement_${addNewField}`}>Auto Incremnt</label>
                </div>
            </div>
            <h3 className='text-lg col-span-2 text-center'>Others</h3>
            <hr className='col-span-2 border-gray-700' />
            <div className='grid grid-cols-5 col-span-2 align-middle'>
                <div className="mb-5">
                    <input type='checkbox' name={`others_exclude_${addNewField}`} id={`others_exclude_${addNewField}`} onChange={(e) => setOtherExclude(e.target.checked)} checked={otherExclude} /> <label htmlFor={`others_exclude_${addNewField}`}>Exclude</label>
                </div>
                <div className="mb-5">
                    <input type='checkbox' name={`others_toggle_${addNewField}`} id={`others_toggle_${addNewField}`} onChange={(e) => setOtherToggle(e.target.checked)} checked={otherToggle} /> <label htmlFor={`others_toggle_${addNewField}`}>Toggle</label>
                </div>
                <div className="mb-5">
                    <input type='checkbox' name={`others_search_${addNewField}`} id={`others_search_${addNewField}`} onChange={(e) => setOtherSearch(e.target.checked)} checked={otherSearch} /> <label htmlFor={`others_search_${addNewField}`}>Search</label>
                </div>
                <div className="mb-5">
                    <input type='checkbox' name={`others_sorting_${addNewField}`} id={`others_sorting_${addNewField}`} onChange={(e) => setOtherSorting(e.target.checked)} checked={otherSorting} /> <label htmlFor={`others_sorting_${addNewField}`}>Sorting</label>
                </div>
                <div className="mb-5">
                    <input type='checkbox' name={`others_filter_${addNewField}`} id={`others_filter_${addNewField}`} onChange={(e) => setOtherFilter(e.target.checked)} checked={otherFilter} /> <label htmlFor={`others_filter_${addNewField}`}>Filter</label>
                </div>
            </div>
        </div>
    );
}
