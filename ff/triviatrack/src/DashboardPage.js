import React from 'react';
import './Dashboard.css';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const DashboardPage = () => {
    const lineChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Weekly Active Users',
                data: [200, 400, 450, 600, 700, 800, 1000],
                fill: true,
                backgroundColor: 'rgba(123, 104, 238, 0.2)',
                borderColor: '#6a5acd',
                tension: 0.4,
            },
        ],
    };

    const doughnutChartData = {
        labels: ['Trivia Games Played', 'Users Online', 'New Sign-Ups'],
        datasets: [
            {
                label: 'Today’s Activities',
                data: [120, 90, 45],
                backgroundColor: [
                    '#f72585',
                    '#7209b7',
                    '#480ca8'
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="dashboard-page">
            <div className="sidebar">
                <div className="sidebar-item active">
                    <i className="fas fa-home"></i>
                </div>
                <div className="sidebar-item">
                    <i className="fas fa-calendar"></i>
                </div>
                <div className="sidebar-item">
                    <i className="fas fa-chart-bar"></i>
                </div>
                <div className="sidebar-item">
                    <i className="fas fa-table"></i>
                </div>
            </div>

            <div className="main-content">
                <div className="header compact-header">
                    <div className="date-info">
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div className="user-info">
                        <img src="https://via.placeholder.com/40" alt="User" />
                        <span>Admin User</span>
                    </div>
                </div>

                <div className="dashboard-content move-down">
                    <div className="left-column">
                        <div className="dashboard-summary spaced-section">
                            <div className="summary-card">
                                <h3>Total Users</h3>
                                <p>10,450 <span className="increase">+12%</span></p>
                            </div>
                            <div className="summary-card">
                                <h3>Trivia Games Played</h3>
                                <p>52,125 <span className="increase">+8%</span></p>
                            </div>
                            <div className="summary-card">
                                <h3>Active Users Today</h3>
                                <p>1,216 <span className="increase">+5%</span></p>
                            </div>
                            <div className="summary-card">
                                <h3>New Sign-Ups</h3>
                                <p>125 <span className="increase">+7%</span></p>
                            </div>
                        </div>

                        <div className="overview-statistics spaced-section">
                            <h3>Weekly Overview Statistics</h3>
                            <div className="statistics-details">
                                <p>Total Games Played: 3,500</p>
                                <p>Daily Average Active Users: 700</p>
                            </div>
                            <div className="chart">
                                <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>

                    <div className="right-column">
                        <div className="orders-today spaced-section padded-right">
                            <h3>Today's Activities</h3>
                            <div className="order-details">
                                <p>Games Played: 120</p>
                                <ul>
                                    <li>Trivia Games Played - 120</li>
                                    <li>Users Online - 90</li>
                                    <li>New Sign-Ups - 45</li>
                                </ul>
                            </div>
                            <div className="order-chart padded-chart">
                                <Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
