// src/components/ApiTest.jsx - Test API Connection
import React, { useState } from 'react';
import api from '../services/api';

const ApiTest = () => {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing connection...');
    
    try {
      const result = await api.healthCheck();
      setTestResult(`✅ Success! Backend response: ${result.message}`);
      console.log('Health check result:', result);
    } catch (error) {
      setTestResult(`❌ Failed! Error: ${error.message}`);
      console.error('Health check error:', error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4">API Connection Test</h3>
      
      <button
        onClick={testConnection}
        disabled={isLoading}
        className="btn btn-primary w-full mb-4"
      >
        {isLoading ? 'Testing...' : 'Test Backend Connection'}
      </button>
      
      {testResult && (
        <div className={`p-3 rounded ${
          testResult.includes('✅') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {testResult}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Expected backend URL:</strong> http://localhost:5000</p>
        <p><strong>Test endpoint:</strong> /api/health</p>
      </div>
    </div>
  );
};

export default ApiTest;