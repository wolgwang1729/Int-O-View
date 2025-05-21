import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from "recharts";
import html2canvas from "html2canvas";
import CircularProgressBar from "./CircularProgressBar.tsx";

// Updated interfaces to include new features
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

interface TechnicalSkill {
  skill: string;
  proficiency: number;
}

interface LearningPath {
  area: string;
  resources: string[];
}

interface CultureFitAnalysis {
  TeamworkScore: number;
  AdaptabilityScore: number;
  Summary: string;
}

interface DetailedAssessment {
  RecommendationStatus: string;
  ConfidenceLevel: number;
  SkillMatchPercentage: number;
  PersonalityTraits: string[];
  TechnicalSkillsBreakdown: TechnicalSkill[];
  InterviewDuration: number; 
}

interface DashboardData {
  summary: {
    BasicDetails: BasicDetails;
    InterviewSummary: InterviewSummary;
    Scores: Scores;
    DetailedAssessment?: DetailedAssessment;
    RecommendedLearningPaths?: LearningPath[];
    CultureFitAnalysis?: CultureFitAnalysis;
  };
}

// Helper function to safely multiply scores without exceeding 100
const safeMultiply = (value: number, multiplier: number = 10): number => {
  // Only multiply if the result won't exceed 100
  if (value * multiplier <= 100) {
    return value * multiplier;
  }
  return value;
};

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
        
        // Apply safe multiplication to all scores
        dashboardData.summary.Scores.OverallScore = safeMultiply(
          dashboardData.summary.Scores.OverallScore
        );
        
        setData(dashboardData);
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

  const {
    BasicDetails,
    InterviewSummary,
    Scores,
    DetailedAssessment,
    RecommendedLearningPaths,
    CultureFitAnalysis,
  } = data.summary;

  // Prepare data for radar chart
  const radarData = [
    { subject: "Education", A: safeMultiply(Scores.EducationalBackgroundScore) },
    { subject: "Experience", A: safeMultiply(Scores.Experience) },
    { subject: "Communication", A: safeMultiply(Scores.InterpersonalCommunication) },
    { subject: "Technical", A: safeMultiply(Scores.TechnicalKnowledge) },
  ];

  if (CultureFitAnalysis) {
    radarData.push({
      subject: "Teamwork",
      A: CultureFitAnalysis.TeamworkScore,
    });
    radarData.push({
      subject: "Adaptability",
      A: CultureFitAnalysis.AdaptabilityScore,
    });
  }

  // Helper function to get recommendation status color
  const getRecommendationColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "recommended":
        return "bg-green-500";
      case "not recommended":
        return "bg-red-500";
      case "consider":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

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

          {/* Add recommendation status badge */}
          {DetailedAssessment && (
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-400 mr-2">Status:</span>
              <span
                className={`px-4 py-1 text-sm font-bold rounded-full text-white ${getRecommendationColor(
                  DetailedAssessment.RecommendationStatus
                )}`}
              >
                {DetailedAssessment.RecommendationStatus}
              </span>
              <span className="ml-20 text-sm text-gray-400 mr-2">Interview Duration:</span>
              <span
                className={`px-2 py-1 text-sm rounded-full text-white flex gap-2 `}
              >
                {DetailedAssessment.InterviewDuration}
                <div>seconds</div>
              </span>

              <div className="ml-auto flex items-center">
                <span className="text-sm text-gray-400 mr-2">Skill Match:</span>
                <div className="w-32 bg-zinc-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${DetailedAssessment.SkillMatchPercentage}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-bold">
                  {DetailedAssessment.SkillMatchPercentage}%
                </span>
              </div>
            </div>
          )}
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
                score={safeMultiply(Scores.EducationalBackgroundScore)}
                color="bg-blue-500"
              />

              <ScoreBar
                label="Experience"
                score={safeMultiply(Scores.Experience)}
                color="bg-indigo-500"
              />

              <ScoreBar
                label="Interpersonal Communication"
                score={safeMultiply(Scores.InterpersonalCommunication)}
                color="bg-purple-500"
              />

              <ScoreBar
                label="Technical Knowledge"
                score={safeMultiply(Scores.TechnicalKnowledge)}
                color="bg-green-500"
              />
            </div>

            <div className="flex items-center justify-center mt-32">
              <div className="relative flex flex-col items-center">
                <CircularProgressBar
                  overallScore={Scores.OverallScore}
                  maxScore={100}
                  size={180}
                  showAnimation={true}
                  label="Overall Assessment"
                  colorByValue={true}
                />
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
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Educational Background",
                          value: safeMultiply(Scores.EducationalBackgroundScore),
                        },
                        { name: "Experience", value: safeMultiply(Scores.Experience) },
                        {
                          name: "Interpersonal Communication",
                          value: safeMultiply(Scores.InterpersonalCommunication),
                        },
                        {
                          name: "Technical Knowledge",
                          value: safeMultiply(Scores.TechnicalKnowledge),
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      animationDuration={1000}
                      animationEasing="ease-out"
                    >
                      {COLORS.map((color, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={color} 
                          stroke="#2d2d2d"
                          strokeWidth={1}
                        />
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
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      iconType="circle"
                      iconSize={10}
                      wrapperStyle={{
                        paddingLeft: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
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

        {/* New Section: Detailed Assessment */}
        {DetailedAssessment && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Technical Skills Breakdown */}
            <div className="p-6 shadow-xl bg-zinc-800 bg-opacity-70 backdrop-blur-sm rounded-xl">
              <h2 className="mb-6 text-xl font-semibold border-b border-zinc-700 pb-2">
                Technical Skills Assessment
              </h2>
              <div className="space-y-4">
                {DetailedAssessment.TechnicalSkillsBreakdown.map(
                  (skill, index) => (
                    <ScoreBar
                      key={index}
                      label={skill.skill}
                      score={skill.proficiency}
                      color="bg-purple-600"
                    />
                  )
                )}
              </div>

              {/* Confidence Level */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="relative h-32 w-32"> {/* Increased from h-24 w-24 to accommodate size 120 */}
                    <CircularProgressBar
                      overallScore={DetailedAssessment.ConfidenceLevel}
                      maxScore={100}
                      size={120}
                      colorByValue={true}
                      label="Confidence"
                    />
                  </div>
                </div>
              </div>
              {/* Add bottom padding to ensure content doesn't overflow */}
              <div className="pb-4"></div>
            </div>

            {/* Personality Traits and Radar Chart */}
            <div className="p-6 shadow-xl bg-zinc-800 bg-opacity-70 backdrop-blur-sm rounded-xl">
              <h2 className="mb-6 text-xl font-semibold border-b border-zinc-700 pb-2">
                Candidate Profile Analysis
              </h2>

              {/* Personality Traits */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-400">
                  PERSONALITY TRAITS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {DetailedAssessment.PersonalityTraits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-indigo-900 bg-opacity-40 text-indigo-300 rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Radar Chart */}
              <div className="flex justify-center">
                <RadarChart
                  outerRadius={80}
                  width={350}
                  height={300}
                  data={radarData}
                  margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                >
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ 
                      fill: "#999",
                      fontSize: 12,
                      dy: 3 
                    }}
                    tickSize={5}
                    style={{
                      fontSize: '11px',
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "#999" }}
                  />
                  <Radar
                    name="Candidate"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </div>
            </div>
          </div>
        )}

        {/* New Section: Learning Paths and Culture Fit */}
        {(RecommendedLearningPaths || CultureFitAnalysis) && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Learning Paths */}
            {RecommendedLearningPaths &&
              RecommendedLearningPaths.length > 0 && (
                <div className="p-6 shadow-xl bg-zinc-800 bg-opacity-70 backdrop-blur-sm rounded-xl">
                  <h2 className="mb-6 text-xl font-semibold border-b border-zinc-700 pb-2">
                    Recommended Learning Paths
                  </h2>
                  <div className="space-y-4">
                    {RecommendedLearningPaths.map((path, index) => (
                      <div
                        key={index}
                        className="p-4 bg-zinc-700 bg-opacity-50 rounded-lg"
                      >
                        <h3 className="mb-2 text-md font-semibold text-blue-300">
                          {path.area}
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                          {path.resources.map((resource, idx) => (
                            <li key={idx} className="text-sm text-gray-300">
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Culture Fit Analysis */}
            {CultureFitAnalysis && (
              <div className="p-6 shadow-xl bg-zinc-800 bg-opacity-70 backdrop-blur-sm rounded-xl">
                <h2 className="mb-6 text-xl font-semibold border-b border-zinc-700 pb-2">
                  Culture Fit Analysis
                </h2>

                <div className="space-y-4">
                  <ScoreBar
                    label="Teamwork"
                    score={CultureFitAnalysis.TeamworkScore}
                    color="bg-green-500"
                  />
                  <ScoreBar
                    label="Adaptability"
                    score={CultureFitAnalysis.AdaptabilityScore}
                    color="bg-yellow-500"
                  />
                </div>

                <div className="mt-6 p-4 bg-zinc-700 bg-opacity-40 rounded-lg">
                  <p className="text-sm text-gray-300">
                    {CultureFitAnalysis.Summary}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

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
