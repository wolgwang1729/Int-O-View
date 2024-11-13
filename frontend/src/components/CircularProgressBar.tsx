import React from "react";

interface CircularProgressBarProps {
  overallScore: number;
  maxScore: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  overallScore,
  maxScore,
  size = 150, // Increased size for better visibility
  strokeWidth = 12, // Increased stroke width for better visibility
  primaryColor = "#00FF00",
  secondaryColor = "#333",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (overallScore / maxScore) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="circular-progress-bar"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: "stroke-dashoffset 0.5s ease",
        }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize={size * 0.2} // Adjust font size proportionally
        fill={primaryColor}
      >
        {overallScore}
      </text>
    </svg>
  );
};

export default CircularProgressBar;