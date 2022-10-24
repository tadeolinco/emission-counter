import { Alert, AlertTitle, Box, Skeleton, Typography } from '@mui/material';
import { useEmissionGraph } from 'api/hooks/useEmissionGraph';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const WeeklyBarGraph = () => {
  const { isLoading, data, error } = useEmissionGraph({
    type: 'week',
  });

  if (isLoading) return <Skeleton />;
  if (error)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Could not load graph data
      </Alert>
    );

  const graphData: { name: string; value: number; fill: string }[] = [];

  let total = 0;

  for (const [key, value] of Object.entries(data?.data || {})) {
    let fill = '#f87171';
    if (key === '1') fill = '#fb923c';
    if (key === '2') fill = '#a3e635';
    if (key === '3') fill = '#2dd4bf';
    if (key === '4') fill = '#22d3ee';
    if (key === '5') fill = '#818cf8';
    if (key === '6') fill = '#e879f9';

    total += value as number;

    graphData.push({ name: days[+key], fill, value: value as number });
  }

  const noData = total === 0;

  if (noData)
    return (
      <Box
        display={'flex'}
        alignItems="center"
        justifyContent={'center'}
        py={6}
      >
        <Typography>No data yet</Typography>
      </Box>
    );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={graphData}
        margin={{ top: 40, left: 40, bottom: 40, right: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </ResponsiveContainer>
  );
};
