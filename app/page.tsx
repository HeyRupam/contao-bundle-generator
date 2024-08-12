"use client";
// pages/index.tsx
import ReplaceForm from './components/ReplaceForm';
import { FC } from 'react';

const Home: FC = () => {
  const handleFormSubmit = async (name: string, namespace: string, copyright: string, route: boolean) => {
    console.log('Form submitted:', name, namespace, copyright, route);
    
    try {
      const response = await fetch('/api/bundle-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundleName: name, namespace: namespace, copyright: copyright, route: route }),
      });
      if (response.ok) {
        // Create a Blob from the response
        const blob = await response.blob();
        // Create an object URL for the Blob
        const url = window.URL.createObjectURL(blob);
        // Create an anchor element and click it to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-archive.zip';
        document.body.appendChild(a);
        a.click();
        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download ZIP file');
      }
    } catch (error) {
      alert('Error updating files: ' + (error as Error).message);
    }
  };

  return (
    <div>
      <ReplaceForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Home;
