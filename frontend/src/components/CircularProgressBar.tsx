import React, { useEffect, useState } from "react";

interface CircularProgressBarProps {
  overallScore: number;
  maxScore: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
  showAnimation?: boolean;
  label?: string;
  colorByValue?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  overallScore,
  maxScore,
  size = 150,
  strokeWidth = 12,
  primaryColor = "#00FF00",
  secondaryColor = "#333",
  showAnimation = true,
  label,
  colorByValue = true,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / maxScore) * 100;
  const offset = circumference - (progress / 100) * circumference;
  const gradientId = `gradient-${Math.random().toString(36).substring(2, 9)}`;
  const glowFilterId = `glow-${Math.random().toString(36).substring(2, 9)}`;

  // Dynamically determine color based on score
  const getColorByValue = () => {
    const normalizedScore = (overallScore / maxScore) * 100;
    if (normalizedScore < 40) return "#FF5252"; // Red for low scores
    if (normalizedScore < 70) return "#FFC107"; // Yellow for medium scores
    return "#4CAF50"; // Green for high scores
  };

  const activeColor = colorByValue ? getColorByValue() : primaryColor;

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setAnimatedScore(0);
        let startValue = 0;
        const animateInterval = setInterval(() => {
          startValue += overallScore / 30; // Adjust divisor for animation speed
          if (startValue >= overallScore) {
            clearInterval(animateInterval);
            setAnimatedScore(overallScore);
          } else {
            setAnimatedScore(startValue);
          }
        }, 20);
        return () => clearInterval(animateInterval);
      }, 300); // Delay start for better visual effect
      return () => clearTimeout(timer);
    } else {
      setAnimatedScore(overallScore);
    }
  }, [overallScore, showAnimation]);

  return (
    <div className="circular-progress-container" style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="circular-progress-bar"
        style={{ display: 'block' }} // Ensures no extra space around SVG
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`${activeColor}99`} />
            <stop offset="100%" stopColor={activeColor} />
          </linearGradient>
          <filter id={glowFilterId} height="200%" width="200%" x="-50%" y="-50%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor={activeColor} floodOpacity="0.2" result="coloredBlur" />
            <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
          </filter>
        </defs>
        
        {/* Background pattern (subtle grid) */}
        <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill={`${secondaryColor}33`} />
        </pattern>
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={radius + strokeWidth/4} 
          fill={`url(#pattern-circles)`}
          opacity="0.5"
        />
        
        {/* Base track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray="4,1"
          opacity="0.6"
        />
        
        {/* Progress circle with glowing effect */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
        
        {/* Score text */}
        <text
          x="50%"
          y="46%"
          textAnchor="middle"
          fontSize={size * 0.22}
          fontWeight="bold"
          fill="white"
        >
          {Math.round(animatedScore)}
        </text>
        
        {/* Percentage symbol */}
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          fontSize={size * 0.12}
          fill="rgba(255,255,255,0.8)"
        >
          %
        </text>
      </svg>
      
      {/* Optional label positioned to not affect the circular shape */}
      {label && (
        <div className="text-center text-sm font-medium text-gray-300 mt-2">
          {label}
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
