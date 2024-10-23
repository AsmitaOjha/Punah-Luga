import React, { useState, useEffect, useRef } from 'react';
import '../Styles/CircularProgress.css'; 

function CircularProgress({ percentage }) {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false); // New state to track if animation is done
  const progressRef = useRef(null);

  const radius = 95; // Circle radius
  const stroke = 20; // Stroke width
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          let start = 0;
          const animationDuration = 1000; // Animation duration in milliseconds
          const increment = percentage / (animationDuration / 10);

          const animateProgress = () => {
            if (start < percentage) {
              start += increment;
              setCurrentPercentage(Math.min(start, percentage)); // Ensure it doesn't exceed the percentage
            } else {
              clearInterval(interval);
              setHasAnimated(true); // Set the animation as completed
            }
          };

          const interval = setInterval(animateProgress, 10);
        }
      },
      { threshold: 0.5 } // Start when 50% of the component is visible
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, [percentage, hasAnimated]); // Include hasAnimated as a dependency to prevent repeat animations

  return (
    <div className="circular-progress" ref={progressRef}>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#4caf50"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
           strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="percentage">{Math.round(currentPercentage)}%</div>
    </div>
  );
}

export default CircularProgress;
