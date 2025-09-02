import React from 'react';

const BroadcastDemo: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 bg-blue-100 p-3 rounded-lg shadow-lg text-xs max-w-xs">
      <div className="font-semibold text-blue-800 mb-1">🔄 Live Updates Active</div>
      <div className="text-blue-600">
        Open this app in multiple tabs to see real-time cross-tab synchronization!
      </div>
    </div>
  );
};

export default BroadcastDemo;
