import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import '@fontsource/roboto';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.teal[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider
      theme={theme}
    >
      <div className="App">
      </div>
    </ThemeProvider>
  );
}

export default App;
