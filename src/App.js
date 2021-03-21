import {
  useState,
  useRef,
} from 'react';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import '@fontsource/roboto';

import { Header } from '~/components/Header';
import { Main } from '~/components/Main';
import { InputArea } from '~/components/InputArea';
import { OutputArea } from '~/components/OutputArea';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.teal[500],
    },
  },
});

function App() {
  const [ text, setText ] = useState('');

  const startDateRef = useRef();
  const handleSDateChange = date => {
    startDateRef.current = date;
  };
  const endDateRef = useRef();
  const handleEDateChange = date => {
    endDateRef.current = date;
  };

  const generate = () => {
    if(!startDateRef.current || !endDateRef.current) return;

    const startDate = new Date(
      startDateRef.current.getFullYear(),
      startDateRef.current.getMonth(),
      startDateRef.current.getDate()
    );
    const endDate = new Date(
      endDateRef.current.getFullYear(),
      endDateRef.current.getMonth(),
      endDateRef.current.getDate()
    );

    const bucketTimes = [
      '10:30 - 12:00',
      '13:30 - 15:00',
      '15:10 - 16:40',
      '16:50 - 18:20',
      '18:30 - 20:00',
    ];

    const buckets = [];
    const numDays = (endDate - startDate) / 86400000 + 1;

    for(let i = 0; i < numDays; i++) {
      const date = new Date(startDate.getTime() + 86400000 * i);
      for(const timeLabel of bucketTimes) {
        buckets.push(
          ('0' + (date.getMonth() + 1)).slice(-2)
          + `/${('0' + date.getDate()).slice(-2)}`
          + ` (${[ '日', '月', '火', '水', '木', '金', '土' ][date.getDay()]})`
          + ` ${timeLabel}`
        );
      };
    };

    const result = buckets.join('\n');

    setText(result);
    copy(result);
  };

  const copy = text => {
    const listener = e => {
      e.clipboardData.setData('text/plain' , text);    
      e.preventDefault();
      document.removeEventListener('copy', listener);
    };
    document.addEventListener('copy' , listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  };

  return (
    <ThemeProvider
      theme={theme}
    >
      <div className="App">
        <Header
          onGenerateClick={generate}
        />

        <Main
        >
          <InputArea
            onSDateChange={handleSDateChange}
            onEDateChange={handleEDateChange}
          />

          <OutputArea
            text={text}
          />
        </Main>
      </div>
    </ThemeProvider>
  );
}

export default App;
