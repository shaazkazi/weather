import React from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

function HourlyForecast({ data }) {
  if (!data) return null;

  const chartData = data.map((hour) => ({
    time: new Date(hour.dt * 1000).getHours() + ':00',
    temp: Math.round(hour.main.temp),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="temp">{payload[0].value}°</p>
          <p>{payload[0].payload.time}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Paper className="forecast-card">
      <Typography variant="h6">24h Forecast</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis 
            dataKey="time" 
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#8E8E93', fontSize: 12 }}
          />
          <YAxis 
            hide={true}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotoneX" 
            dataKey="temp" 
            stroke="#0A84FF" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#0A84FF" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default HourlyForecast;
