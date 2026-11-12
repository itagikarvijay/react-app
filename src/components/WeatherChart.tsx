import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Bar,
} from 'recharts';

interface WeatherData {
  time: string;
  date: string;
  temp: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
}

const WeatherChart: React.FC = () => {
  const [data, setData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('Belagavi');
  const [searchInput, setSearchInput] = useState('Belagavi');

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = '8240e5f140b8eaf97efb5da187a93837'; // Replace with your API key
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`,
      );

      const chartData: WeatherData[] = res.data.list.slice(0, 12).map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temp: Math.round(item.main.temp),
        tempMax: Math.round(item.main.temp_max),
        tempMin: Math.round(item.main.temp_min),
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: Math.round(item.wind.speed * 10) / 10,
        description: item.weather[0].main,
      }));

      setData(chartData);
      setCity(cityName);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Failed to fetch weather data'
        : 'An error occurred while fetching data';
      setError(errorMessage);
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Weather Forecast Chart</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name..."
          style={{
            padding: '10px 15px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            minWidth: '200px',
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            fontSize: '14px',
          }}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {/* Current City Display */}
      {!error && (
        <p style={{ marginBottom: '15px', color: '#666' }}>
          City: <strong>{city}</strong>
        </p>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb',
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Loading weather data...
        </div>
      ) : data.length > 0 ? (
        <>
          {/* Temperature Chart */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#333' }}>
              Temperature & Humidity
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={data}>
                <CartesianGrid stroke="#eee" />
                <XAxis
                  dataKey="time"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  yAxisId="left"
                  label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temp"
                  stroke="#ff7300"
                  strokeWidth={2}
                  name="Temperature (°C)"
                  dot={{ r: 4 }}
                />
                <Bar
                  yAxisId="right"
                  dataKey="humidity"
                  fill="#8884d8"
                  name="Humidity (%)"
                  opacity={0.6}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Wind Speed & Pressure Chart */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#333' }}>
              Wind Speed & Pressure
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid stroke="#eee" />
                <XAxis
                  dataKey="time"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  yAxisId="left"
                  label={{ value: 'Wind Speed (m/s)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: 'Pressure (hPa)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="windSpeed"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Wind Speed (m/s)"
                  dot={{ r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="pressure"
                  stroke="#ffc658"
                  strokeWidth={2}
                  name="Pressure (hPa)"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Weather Details Table */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#333' }}>
              Weather Details
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: '#f9f9f9' }}>
                    <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>
                      Time
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>
                      Temp (°C)
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>
                      Max/Min (°C)
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>
                      Humidity (%)
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>
                      Wind (m/s)
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>
                      Condition
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                      <td style={{ border: '1px solid #ddd', padding: '10px' }}>{item.time}</td>
                      <td style={{ border: '1px solid #ddd', padding: '10px' }}>{item.temp}</td>
                      <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                        {item.tempMax} / {item.tempMin}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '10px' }}>{item.humidity}</td>
                      <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                        {item.windSpeed}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : !error ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No weather data available
        </div>
      ) : null}
    </div>
  );
};

export default WeatherChart;
