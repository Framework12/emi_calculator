import { Switch, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../contexts/Theme';
import { useContext } from 'react';

export const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
      <Switch
        checked={theme.palette.mode === 'dark'}
        onChange={toggleTheme}
        color="default"
        inputProps={{ 'aria-label': 'toggle theme' }}
      />
    </Box>
  );
};