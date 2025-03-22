import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import html2canvas from "html2canvas";
import CircularProgressBar from "./CircularProgressBar.tsx";

interface BasicDetails {
  Name: string;
  SkillsNeeded: string[];
  Vacancy: string;
}

interface InterviewSummary {
  NegativePoints: string;
  PositivePoints: string;
}

interface Scores {
  EducationalBackgroundScore: number;
  Experience: number;
  InterpersonalCommunication: number;
  OverallScore: number;
  TechnicalKnowledge: number;
}

interface DashboardData {
  summary: {
    BasicDetails: BasicDetails;
    InterviewSummary: InterviewSummary;
    Scores: Scores;
  };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const handleDownload = (data: DashboardData) => {
  const element = document.getElementById("dashboard");
  if (element) {
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${data.summary.BasicDetails.Name}_assessment.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboardData`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: { message: DashboardData }) => {
        const dashboardData = data.message;
        setData(dashboardData);
        if (dashboardData.summary.Scores.OverallScore < 10) {
          dashboardData.summary.Scores.OverallScore =
            dashboardData.summary.Scores.OverallScore * 10;
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="w-16 h-16 border-t-2 border-l-2 border-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium">Loading assessment data...</p>
      </div>
    );
  }

  const { BasicDetails, InterviewSummary, Scores } = data.summary;

  return (
    <div
      id="dashboard"
      className="min-h-screen text-gray-200 bg-gradient-to-b from-zinc-900 to-zinc-800 font-sans"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-800 shadow-md">
        <div className="flex items-center gap-2">
          <img
            src="logo2_cropped.jpg"
            alt="logo"
            className="h-8 rounded-md shadow-lg"
          />
          <h1 className="text-2xl font-bold">Assessment Report</h1>
        </div>
        <button
          onClick={() => handleDownload(data)}
          className="px-5 py-2 font-mono font-bold transition-all duration-300 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 text-sm"
        >
          Download Report
        </button>
      </header>

      {/* Main Content */}
      <div className="container p-6 mx-auto">
        {/* Candidate Profile Section */}
        <div className="p-5 mb-8 shadow-xl bg-zinc-800 bg-opacity-70 backdrop-blur-sm rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-1 text-2xl font-semibold text-white">
                {BasicDetails.Name}
              </h2>
              <p className="text-blue-300">{BasicDetails.Vacancy} Position</p>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-zinc-700 rounded-full">
                <span className="mr-2 text-sm text-gray-400">
                  Overall Score:
                </span>
                <span className="text-xl font-bold text-white">
                  {Scores.OverallScore}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-700">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-400">Required Skills:</span>
              {BasicDetails.SkillsNeeded.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-blue-900 bg-opacity-40 text-blue-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Scores Section */}
          <div className="p-6 shadow-xl bg-zinc-800 bg-opacity-70 backdrop-blur-sm rounded-xl">
            <h2 className="mb-6 text-xl font-semibold border-b border-zinc-700 pb-2">
              Candidate Scores
            </h2>

            <div className="space-y-6">
              <ScoreBar
                label="Educational Background"
                score={Scores.EducationalBackgroundScore * 10}
                color="bg-blue-500"
              />

              <ScoreBar
                label="Experience"
                score={Scores.Experience * 10}
                color="bg-indigo-500"
              />

              <ScoreBar
                label="Interpersonal Communication"
                score={Scores.InterpersonalCommunication * 10}
                color="bg-purple-500"
              />

              <ScoreBar
                label="Technical Knowledge"
                score={Scores.TechnicalKnowledge * 10}
                color="bg-green-500"
              />
            </div>

            <div className="flex items-center justify-center mt-32">
              <div className="relative flex flex-col items-center">
                <CircularProgressBar
                  overallScore={Scores.OverallScore}
                  maxScore={100}
                  size={150}
                />
                <p className="mt-4 font-medium text-center">
                  Overall Assessment Score
                </p>
              </div>
            </div>
          </div>

          {/* Chart and Summary Section */}
          <div className="flex flex-col gap-6">
            {/* Chart */}
            <div className="p-6 shadow-xl bg-zinc-800 bg-opacity-70 backdrop-blur-sm rounded-xl">
              <h2 className="mb-4 text-xl font-semibold border-b border-zinc-700 pb-2">
                Score Distribution
              </h2>
              <div className="flex justify-center">
                <PieChart width={400} height={360}>
                  <Pie
                    data={[
                      {
                        name: "Educational Background",
                        value: Scores.EducationalBackgroundScore,
                      },
                      { name: "Experience", value: Scores.Experience },
                      {
                        name: "Interpersonal Communication",
                        value: Scores.InterpersonalCommunication,
                      },
                      {
                        name: "Technical Knowledge",
                        value: Scores.TechnicalKnowledge,
                      },
                    ]}
                    cx={180}
                    cy={120}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={false}
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-3 bg-zinc-800 border border-zinc-700 shadow-lg rounded-lg">
                            <p className="mb-1 text-xs font-medium text-gray-400">
                              CATEGORY
                            </p>
                            <p className="mb-2 text-sm font-medium text-white">
                              {payload[0].name}
                            </p>
                            <p className="text-xs font-medium text-gray-400">
                              SCORE
                            </p>
                            <p className="text-xl font-bold text-white">
                              {payload[0].value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{
                      paddingTop: "30px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </div>
            </div>

            {/* Interview Summary */}
            <div className="p-6 flex-1 shadow-xl bg-zinc-800 bg-opacity-70 backdrop-blur-sm rounded-xl">
              <h2 className="mb-4 text-xl font-semibold border-b border-zinc-700 pb-2">
                Interview Insights
              </h2>

              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-green-400">
                  STRENGTHS
                </h3>
                <div className="p-3 bg-green-900 bg-opacity-20 rounded-lg border-l-2 border-green-400">
                  <p className="text-sm text-gray-300">
                    {InterviewSummary.PositivePoints}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-red-400">
                  AREAS FOR IMPROVEMENT
                </h3>
                <div className="p-3 bg-red-900 bg-opacity-20 rounded-lg border-l-2 border-red-400">
                  <p className="text-sm text-gray-300">
                    {InterviewSummary.NegativePoints}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 text-center text-sm text-gray-400">
          <p>Assessment generated by Int-O-View AI Interview System</p>
        </div>
      </div>
    </div>
  );
};

// Score bar component for better reusability
const ScoreBar = ({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) => {
  return (
    <div className="mb-1">
      <div className="flex justify-between mb-1">
        <p className="text-sm">{label}</p>
        <p className="text-sm font-bold">{score.toFixed(0)}%</p>
      </div>
      <div className="relative h-2 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className={`absolute h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Dashboard;
