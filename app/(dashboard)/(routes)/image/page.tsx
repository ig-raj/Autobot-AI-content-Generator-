'use client'; // Add this to make it a Client Component 

import React, { useState } from 'react';
import axios from 'axios';

const ImagePage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const apiToken: string = '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';

  const generateImage = async () => {
    setLoading(true);
    setError('');
    setImage(null);

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer', // For binary data (image)
        }
      );

      // Convert binary data to base64 to display the image
      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      setImage(`data:image/png;base64,${base64Image}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.error || 'Error generating image. Please try again.');
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <h1 style={{ textAlign: 'center', fontSize: "40px", marginBottom: '10px' }}>Image Generator</h1>
      <textarea
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: '80%',
          height: '80px',
          marginBottom: '20px',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={generateImage}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
      {image && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Generated Image:</h2>
          <img
            src={image}
            alt="Generated"
            style={{
              maxWidth: '80%',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              borderRadius: '100px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImagePage;
