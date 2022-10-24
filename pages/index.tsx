import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { AddEmissionEntryModal } from 'components/AddEmissionEntryModal';
import { GraphTab, GraphTabs } from 'components/GraphsTabs';
import { ScopePieGraph } from 'components/ScopePieGraph';
import { WeeklyBarGraph } from 'components/WeeklyBarGraph';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage = () => {
  const [tab, setTab] = useState<GraphTab>('scope');
  const [isAddEmissionEntryModalOpen, setIsAddEmissionEntryModalOpen] =
    useState(false);

  return (
    <>
      <Head>
        <title>Emission Counter</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Emission Counter
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                setIsAddEmissionEntryModalOpen(true);
              }}
            >
              Add emission entry
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <GraphTabs tab={tab} onChange={setTab} />
      {tab === 'scope' && <ScopePieGraph />}
      {tab === 'week' && <WeeklyBarGraph />}
      <AddEmissionEntryModal
        open={isAddEmissionEntryModalOpen}
        handleClose={() => setIsAddEmissionEntryModalOpen(false)}
      />
    </>
  );
};

export default Home;
