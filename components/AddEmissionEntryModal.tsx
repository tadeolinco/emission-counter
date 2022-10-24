import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import {
  AddEmissionDto,
  useAddEmissionEntry,
} from 'api/hooks/useAddEmissionEntry';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface AddEmissionEntryModalProps {
  open: boolean;
  handleClose: () => void;
}

const scopeOptions = [1, 2, 3];

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  scope: Yup.string().required('Required'),
  emission: Yup.number().required('Required'),
  date: Yup.date().required('Required'),
});

interface AddEmissionFormValue {
  name: string;
  scope: string;
  emission: number;
  date: string;
}

export const AddEmissionEntryModal = ({
  open,
  handleClose,
}: AddEmissionEntryModalProps) => {
  const { register, handleSubmit, formState, reset } =
    useForm<AddEmissionFormValue>({
      defaultValues: {
        name: '',
        emission: 0,
        scope: '1',
        date: format(new Date(), 'yyyy-MM-dd'),
      },
      resolver: yupResolver(validationSchema),
    });

  const onClose = () => {
    if (isAddingEmissionEntry) return;
    reset();
    handleClose();
  };

  const {
    mutateAsync: handleAddEmissionEntry,
    isLoading: isAddingEmissionEntry,
  } = useAddEmissionEntry();

  const onSubmit = async (values: AddEmissionFormValue) => {
    try {
      const data: AddEmissionDto = {
        ...values,
        date: new Date(values.date),
        scope: +values.scope,
      };
      await handleAddEmissionEntry(data);
      onClose();
      setSnack('success');
    } catch (err) {
      setSnack('error');
    }
  };

  const [snack, setSnack] = useState<'success' | 'error' | null>(null);

  const handleCloseSnack = () => setSnack(null);

  const renderError = (key: keyof AddEmissionDto) => {
    return (
      !!formState.errors[key] && (
        <Typography color={'red'}>{formState.errors[key]?.message}</Typography>
      )
    );
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Emission Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add an emission entry from your business operations. This will be
              reflected in graphs and charts.
            </DialogContentText>
            <Box mt={2}>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                fullWidth
                required
                {...register('name')}
                error={!!formState.errors.name}
              />
              {renderError('name')}
            </Box>
            <Box mt={2}>
              <FormControl fullWidth required>
                <InputLabel id="select-label-scope">Scope</InputLabel>
                <Select
                  labelId="select-label-scope"
                  label="Scope"
                  placeholder="Scope"
                  {...register('scope')}
                  error={!!formState.errors.scope}
                >
                  {scopeOptions.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                    >{`Scope ${option}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {renderError('scope')}
            </Box>
            <Box mt={2}>
              <TextField
                margin="dense"
                label="Emission"
                type="number"
                fullWidth
                required
                {...register('emission', { valueAsNumber: true })}
                error={!!formState.errors.emission}
              />
              {renderError('emission')}
            </Box>
            <Box mt={2}>
              <TextField
                margin="dense"
                label="Date"
                type="date"
                fullWidth
                required
                {...register('date')}
                error={!!formState.errors.date}
              />
              {renderError('date')}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={isAddingEmissionEntry}>
              Cancel
            </Button>
            <Button type="submit" disabled={isAddingEmissionEntry}>
              <span>Add</span>
              {isAddingEmissionEntry && (
                <CircularProgress style={{ marginLeft: 4 }} size={16} />
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snack !== null}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        {snack !== null ? (
          <Alert
            onClose={handleCloseSnack}
            severity={snack}
            sx={{ width: '100%' }}
          >
            {snack === 'success'
              ? 'Successfully added emission entry!'
              : 'Something went wrong while adding emission entry.'}
          </Alert>
        ) : (
          <span></span>
        )}
      </Snackbar>
    </>
  );
};
