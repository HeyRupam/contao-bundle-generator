"use client";
// pages/index.tsx
import ReplaceForm from './components/ReplaceForm';
import { FC } from 'react';

const Home: FC = () => {
  const handleFormSubmit = async (name: string, namespace: string, copyright: string, route: boolean, bootstrapCss: boolean, fontAwesomeCss: boolean, fancyboxCss: boolean, bootstrapJs: boolean, fancyboxJs: boolean, jqueryJs: boolean, wowJs: boolean) => {
    
    try {
      const response = await fetch('/api/bundle-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundleName: name, namespace: namespace, copyright: copyright, route: route, bootstrapCss: bootstrapCss, fontAwesomeCss: fontAwesomeCss, fancyboxCss: fancyboxCss, bootstrapJs: bootstrapJs, fancyboxJs: fancyboxJs, jqueryJs: jqueryJs, wowJs: wowJs }),
      });
      if (response.ok) {
        const bundleName = response.headers.get('X-Bundle-Name') || 'bundle';

        // Create a Blob from the response
        const blob = await response.blob();
        // Create an object URL for the Blob
        const url = window.URL.createObjectURL(blob);
        // Create an anchor element and click it to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${bundleName}.zip`;
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
    <main className="min-h-screen">
      <ReplaceForm onSubmit={handleFormSubmit} />
    </main>
  );
};

export default Home;
