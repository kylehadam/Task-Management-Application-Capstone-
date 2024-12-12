import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Stats {
  completedTasks: number;
  pendingTasks: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/analytics/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(data);
      setError(null);
    } catch {
      setError('Failed to fetch analytics. Please try again.');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const COLORS = ['#0088FE', '#FFBB28'];

  const chartData = stats
    ? [
        { name: 'Completed Tasks', value: stats.completedTasks },
        { name: 'Pending Tasks', value: stats.pendingTasks },
      ]
    : [];

  return (
    <div>
      <h2>Task Analytics</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {stats ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

export default Dashboard;
