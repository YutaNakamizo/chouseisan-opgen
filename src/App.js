import {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import '@fontsource/roboto';

import { Header } from '~/components/Header';
import { Main } from '~/components/Main';
import { StepDate } from '~/components/StepDate';
import { StepPresets } from '~/components/StepPresets';
import { OutputArea } from '~/components/OutputArea';

const saveDailyOptions = options => {
  const _options = [];
  for(const option of options) {
    _options.push({
      ...option,
      startTime: option.startTime.getTime(),
      endTime: option.endTime.getTime(),
    });
  }
  window.localStorage.setItem(
    'app.ggtk.chouseisan-opgen/daily_options',
    JSON.stringify(_options)
  );
};

const loadDailyOptions = () => {
  const localDailyOptionsStr = window.localStorage.getItem('app.ggtk.chouseisan-opgen/daily_options');
  if(!localDailyOptionsStr) {
    const defaultOptions = [
      {
        startTime: new Date(1970, 0, 1, 10, 30),
        endTime: new Date(1970, 0, 1, 12, 0),
        enabled: true,
      }, {
        startTime: new Date(1970, 0, 1, 13, 30),
        endTime: new Date(1970, 0, 1, 15, 0),
        enabled: true,
      }, {
        startTime: new Date(1970, 0, 1, 15, 10),
        endTime: new Date(1970, 0, 1, 16, 40),
        enabled: true,
      }, {
        startTime: new Date(1970, 0, 1, 16, 50),
        endTime: new Date(1970, 0, 1, 18, 20),
        enabled: true,
      }, {
        startTime: new Date(1970, 0, 1, 18, 30),
        endTime: new Date(1970, 0, 1, 20, 0),
        enabled: true,
      }
    ];
    saveDailyOptions(defaultOptions);
    return defaultOptions;
  }

  const localDailyOptionsParse = JSON.parse(localDailyOptionsStr.split(','));
  const _options = [];
  for(const option of localDailyOptionsParse) {
    _options.push({
      ...option,
      startTime: new Date(option.startTime),
      endTime: new Date(option.endTime),
    });
  }
  return _options;
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.teal[500],
    },
  },
});

function App() {
  const [ dailyOptions, setDailyOptions ] = useState();
  useEffect(() => {
    const _options = loadDailyOptions();
    setDailyOptions(_options);
  }, []);

  const [ text, setText ] = useState('');

  const handleDailyOptionChange = options => {
    options.sort((a, b) => {
      return a.startTime.getTime() - b.startTime.getTime();
    });
    console.log(options);
    setDailyOptions(options);
    saveDailyOptions(options);
  };

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
          <StepPresets
            options={dailyOptions}
            onChange={handleDailyOptionChange}
          />

          <StepDate
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
