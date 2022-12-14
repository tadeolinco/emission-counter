import { Alert, AlertTitle, Box, Skeleton, Typography } from '@mui/material';
import { useEmissionGraph } from 'api/hooks/useEmissionGraph';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export const ScopePieGraph = () => {
  const { isLoading, data, error } = useEmissionGraph({
    type: 'scope',
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
    let fill = 'rgb(248 113 113)';
    if (key === '2') fill = 'rgb(96 165 250)';
    if (key === '3') fill = 'rgb(74 222 128)';

    total += value as number;

    graphData.push({ name: `Scope ${key}`, fill, value: value as number });
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
      <PieChart margin={{ top: 40, left: 40, bottom: 40, right: 40 }}>
        <Pie dataKey="value" nameKey="name" data={graphData} label />
        <Legend></Legend>
        <Tooltip></Tooltip>
      </PieChart>
    </ResponsiveContainer>
  );
};
