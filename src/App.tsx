import React from 'react';
// APP THEME
import {APP_THEME} from './appTheme';
// @MUI
import {ThemeProvider} from '@mui/material/styles';
import Typography from '@mui/material/Typography';


function App() {

	return (
		<ThemeProvider theme={APP_THEME}>
			<p className="test">Welcome to arafatzaman.dev</p>
			<Typography>Welcome to arafatzaman.dev</Typography>
		</ThemeProvider>
	);
}

export default App;
