import { FC, useState, useEffect, useRef } from "react";

interface ContaoElementProps {
    addNewElement: number;
    onChange: (index: number, data: any) => void;
    onRemove: (index: number) => void;
}

const ContaoElement: FC<ContaoElementProps> = ({ addNewElement, onChange, onRemove }) => {
    const [element, setElement] = useState('');
    const [elementType, setElementType] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const elementRef = useRef<HTMLDivElement>(null);
    let hideTimeout: ReturnType<typeof setTimeout>;


    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevent the default context menu from appearing

        setButtonPosition({
            x: event.pageX,
            y: event.pageY,
        });

        setShowButton(true);

        // Hide the button after 2 seconds
        hideTimeout = setTimeout(() => {
            setShowButton(false);
        }, 5000);
    };

    const handleRemoveElement = () => {
        onRemove(addNewElement);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
            setShowButton(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // const handleChange = () => {
    //     onChange(addNewElement, {
    //         element,
    //         elementType
    //     });
    // };

    useEffect(() => {
        onChange(addNewElement, {
            element,
            elementType
        });        
    }, [element, elementType]);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setter(e.target.value);
    };
    return (
        <div
            ref={elementRef}
            className="mb-5 grid grid-cols-2 gap-4 border border-gray-700 rounded-lg p-4"
            onContextMenu={handleRightClick}
        >
            <div>
                <label htmlFor={`element_${addNewElement}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Element Name
                </label>
                <input
                    value={element}
                    onChange={handleInputChange(setElement)}
                    type="text"
                    id={`element_${addNewElement}`}
                    name={`element_${addNewElement}`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Element Name"
                    required
                />
            </div>
            <div>
                <label htmlFor={`element_type_${addNewElement}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Element Type
                </label>
                <select
                    id={`element_type_${addNewElement}`}
                    value={elementType}
                    onChange={handleInputChange(setElementType)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
                    <option value="">Select an element</option>
                    <option value="CE">Content Element</option>
                    <option value="FM">Frontend Module</option>
                    <option value="BE">Backend Module</option>
                    <option value="Cron">Cron</option>
                    <option disabled value="Widget">Widget</option>
                </select>
            </div>
            {showButton && (
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full rounded-tl-none"
                    style={{
                        position: 'absolute',
                        top: `${buttonPosition.y}px`,
                        left: `${buttonPosition.x}px`,
                    }}
                    onClick={handleRemoveElement}
                >
                    -
                </button>
            )}
        </div>
    );
};

export default ContaoElement;
