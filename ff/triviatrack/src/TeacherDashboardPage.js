import React from 'react';
import './TeacherDashboard.css';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const TeacherDashboardPage = () => {
    const barChartData = {
        labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
        datasets: [
            {
                label: 'Average Score (%)',
                data: [85, 78, 90, 70, 88],
                backgroundColor: '#6a5acd',
                borderColor: '#483d8b',
                borderWidth: 1,
            },
        ],
    };

    const doughnutChartData = {
        labels: ['Completed Quizzes', 'Pending Quizzes', 'Upcoming Quizzes'],
        datasets: [
            {
                label: 'Quizzes Status',
                data: [20, 5, 3],
                backgroundColor: ['#f72585', '#7209b7', '#480ca8'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="teacher-dashboard-page">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-item active">
                    <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <div className="sidebar-item">
                    <i className="fas fa-tasks"></i>
                </div>
                <div className="sidebar-item">
                    <i className="fas fa-users"></i>
                </div>
                <div className="sidebar-item">
                    <i className="fas fa-chart-line"></i>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="header compact-header">
                    <div className="dashboard-title">
                        <h1>Teacher Dashboard</h1>
                    </div>
                    <div className="user-info">
                        <img src="https://via.placeholder.com/40" alt="Teacher" />
                        <span>Teacher Name</span>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="dashboard-content move-down">
                    {/* Left Column */}
                    <div className="left-column">
                        <div className="teacher-summary spaced-section">
                            <div className="summary-card">
                                <h2>Total Students</h2>
                                <p>150 <span className="increase">+5%</span></p>
                            </div>
                            <div className="summary-card">
                                <h2>Quizzes Created</h2>
                                <p>25 <span className="increase">+10%</span></p>
                            </div>
                            <div className="summary-card">
                                <h2>Average Quiz Score</h2>
                                <p>85% <span className="increase">+3%</span></p>
                            </div>
                        </div>

                        <div className="quiz-performance spaced-section">
                            <h3>Quiz Performance Overview</h3>
                            <div className="chart">
                                <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="right-column">
                        <div className="quiz-status spaced-section padded-right">
                            <h3>Quiz Status</h3>
                            <div className="quiz-details">
                                <p>Overall Quizzes Summary:</p>
                                <ul>
                                    <li>Completed Quizzes - 20</li>
                                    <li>Pending Quizzes - 5</li>
                                    <li>Upcoming Quizzes - 3</li>
                                </ul>
                            </div>
                            <div className="quiz-chart padded-chart">
                                <Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboardPage;
