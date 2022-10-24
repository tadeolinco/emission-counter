import { Box, Tab, Tabs } from '@mui/material';

export type GraphTab = 'scope' | 'week';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabOptions: { label: string; value: GraphTab }[] = [
  {
    label: 'By scope',
    value: 'scope',
  },
  {
    label: 'By week',
    value: 'week',
  },
];

interface GraphTabsProps {
  tab: GraphTab;
  onChange: (value: GraphTab) => void;
}

export const GraphTabs = ({ tab, onChange }: GraphTabsProps) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={(e, value) => {
            onChange(value);
          }}
          aria-label="Graph tabs"
        >
          {tabOptions.map((option, index) => (
            <Tab key={option.value} {...option} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
    </>
  );
};
