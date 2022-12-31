import React from 'react';
// APP THEME
import {APP_THEME} from './appTheme';
// @MUI
import {ThemeProvider} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Main from './layout/index';


function App() {

	return (
		<ThemeProvider theme={APP_THEME}>
			<Main/>
		</ThemeProvider>
	);
}

export default App;
