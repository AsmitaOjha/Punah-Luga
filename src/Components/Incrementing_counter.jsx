import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(1000000); // Start at 1 million tons

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount < 92000000) {
          return prevCount + 1000000; // Increment by 1000 tons
        } else {
          clearInterval(interval);
          return prevCount; // Return the final count
        }
      });
    }, 50); // Update every 100 milliseconds

    return () => clearInterval(interval);
  }, []);

  // Helper function to format the count
  const formatCount = (num) => {
    return (num / 1000000).toFixed(1) + ' Million'; // Convert to million and format
  };

  return (
    <div>
      <h2>{formatCount(count)} tons</h2> {/* Format number with "M" */}
    </div>
  );
}

export default Counter;
