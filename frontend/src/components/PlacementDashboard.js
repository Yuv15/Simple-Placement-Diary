import React from 'react';

// This component will calculate and display placement statistics
function PlacementDashboard({ students }) {
    if (!students || students.length === 0) {
        return null; // Don't show if there's no data
    }

    const totalStudents = students.length;
    const placedStudents = students.filter(s => 
        (s.status || '').toLowerCase().includes('placed')
    ).length;

    const placementRate = totalStudents > 0 
        ? ((placedStudents / totalStudents) * 100).toFixed(1) 
        : 0;

    const notPlaced = totalStudents - placedStudents;
    
    // Determine the color for the progress bar
    const barColor = placementRate >= 75 ? 'bg-green-600' : 
                     placementRate >= 50 ? 'bg-yellow-500' : 'bg-red-600';

    return (
        <div className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl transition duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Placement Overview
            </h2>
            
            <div className="space-y-4">
                {/* 1. Placement Rate Card */}
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Overall Placement Rate</p>
                    <div className="flex justify-between items-end mt-1">
                        <span className="text-4xl font-extrabold text-blue-600">
                            {placementRate}%
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {placedStudents} Placed / {totalStudents} Total
                        </span>
                    </div>

                    {/* Progress Bar Visualization */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 dark:bg-gray-700">
                        <div 
                            className={`h-2.5 rounded-full ${barColor}`} 
                            style={{ width: `${placementRate}%` }}
                        ></div>
                    </div>
                </div>

                {/* 2. Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <MetricCard title="Total Students" value={totalStudents} color="text-indigo-500" />
                    <MetricCard title="Placed" value={placedStudents} color="text-green-500" />
                    <MetricCard title="Not Placed/Interviewing" value={notPlaced} color="text-red-500" />
                    <MetricCard title="Average CGPA" value="TBD" color="text-yellow-500" /> {/* Placeholder */}
                </div>
            </div>
        </div>
    );
}

// Simple component for displaying a metric
const MetricCard = ({ title, value, color }) => (
    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
        <p className={`text-xl font-bold mt-1 ${color}`}>
            {value}
        </p>
    </div>
);

export default PlacementDashboard;