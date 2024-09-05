import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import CircularProgressBar from './CircularProgressBar.tsx';

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const handleDownload = (data: DashboardData) => {
  const element = document.getElementById('dashboard');
  if (element) {
    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.download = `${data.summary.BasicDetails.Name}_assessment.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/predict')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: DashboardData) => {
        setData(data);
        if(data.summary.Scores.OverallScore<10) data.summary.Scores.OverallScore = data.summary.Scores.OverallScore * 10;
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-gray-900">
        <div className="w-24 h-24 border-t-2 border-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  const { BasicDetails, InterviewSummary, Scores } = data.summary;

  // const overallScoreDegree = (Scores.OverallScore / 100) * 360;

  return (
    <div
      id="dashboard"
      className="w-full min-h-screen p-6 overflow-y-auto text-white bg-neutral-800"
    >
      <h1 className="mb-8 text-3xl font-bold text-center">Candidate Skill Assessment</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-6 shadow-lg bg-neutral-900 rounded-xl">
          <h2 className="mb-4 text-xl font-semibold">Basic Details</h2>
          <p>Name: {BasicDetails.Name}</p>
          <p>Vacancy: {BasicDetails.Vacancy}</p>
          <p>Skills Needed: {BasicDetails.SkillsNeeded.join(', ')}</p>
        </div>
        <div className="p-6 shadow-lg bg-neutral-900 rounded-xl">
          <h2 className="mb-4 text-xl font-semibold">Interview Summary</h2>
          <p className="text-red-400">Negative Points: {InterviewSummary.NegativePoints}</p>
          <p className="mt-2 text-green-400">Positive Points: {InterviewSummary.PositivePoints}</p>
        </div>
        <div className="p-6 shadow-lg bg-neutral-900 rounded-xl">
          <h2 className="mb-4 text-xl font-semibold">Scores</h2>
          <div className="mb-4">
            <p>Educational Background</p>
            <br/>
            <div className="relative h-2 bg-gray-700 rounded-full">
              <div
                className="absolute h-full bg-blue-500 rounded-full"
                style={{ width: `${Scores.EducationalBackgroundScore * 10}%` }}
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <p>Experience</p>
            <br/>
            <div className="relative h-2 bg-gray-700 rounded-full">
              <div
                className="absolute h-full bg-indigo-500 rounded-full"
                style={{ width: `${Scores.Experience * 10}%` }}
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <p>Interpersonal Communication</p>
            <br/>
            <div className="relative h-2 bg-gray-700 rounded-full">
              <div
                className="absolute h-full bg-purple-500 rounded-full"
                style={{ width: `${Scores.InterpersonalCommunication * 10}%` }}
              ></div>
            </div>
          </div>
          <div className="mb-6">
            <p>Technical Knowledge</p>
            <br/>
            <div className="relative h-2 bg-gray-700 rounded-full">
              <div
                className="absolute h-full bg-green-500 rounded-full"
                style={{ width: `${Scores.TechnicalKnowledge * 10}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-xl font-bold">Overall Score</h1>
            <br/>
            <div className="relative inline-flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
              <CircularProgressBar overallScore={Scores.OverallScore} maxScore={100} size={150} />
            </div>
          </div>

        </div>
        <div className="items-center justify-center p-6 shadow-lg bg-neutral-900 rounded-xl">
          <h2 className="mb-4 text-xl font-semibold">Score Distribution</h2>
          <PieChart width={600} height={300}>
            <Pie
              data={[
                { name: 'Educational Background', value: Scores.EducationalBackgroundScore },
                { name: 'Experience', value: Scores.Experience },
                { name: 'Interpersonal Communication', value: Scores.InterpersonalCommunication },
                { name: 'Technical Knowledge', value: Scores.TechnicalKnowledge },
              ]}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
            
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ paddingTop: '20px', fontSize: '18px' }}
            />
          </PieChart>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={() => handleDownload(data)}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Dashboard;