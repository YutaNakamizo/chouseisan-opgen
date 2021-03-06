import {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  Box,
  Typography,
  Button,
  Link,
} from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import '@fontsource/roboto';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import { Header } from '~/components/Header';
import { Main } from '~/components/Main';
import { StepDate } from '~/components/StepDate';
import { StepPresets } from '~/components/StepPresets';
import { OutputArea } from '~/components/OutputArea';
import { Footer } from '~/components/Footer';
import { CopyNotif } from '~/components/CopyNotif';

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

const formatDate2Time = date => {
  return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
};

const getIsMobile = () => {
  return document.body.clientWidth < 896;
};

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

    const bucketTimes = [];
    for(const option of dailyOptions) {
      if(!option.enabled) continue;
      bucketTimes.push(
        `${formatDate2Time(option.startTime)} - ${formatDate2Time(option.endTime)}`
      );
    }

    const buckets = [];
    const numDays = (endDate - startDate) / 86400000 + 1;

    for(let i = 0; i < numDays; i++) {
      const date = new Date(startDate.getTime() + 86400000 * i);
      for(const timeLabel of bucketTimes) {
        buckets.push(
          ('0' + (date.getMonth() + 1)).slice(-2)
          + `/${('0' + date.getDate()).slice(-2)}`
          + ` (${[ '???', '???', '???', '???', '???', '???', '???' ][date.getDay()]})`
          + ` ${timeLabel}`
        );
      };
    };

    const result = buckets.join('\n');

    setText(result);
    copy(result);
  };

  const [ copyNotifOpen, setCopyNotifOpen ] = useState(false);
  const copy = text => {
    const listener = e => {
      e.clipboardData.setData('text/plain' , text);    
      e.preventDefault();
      document.removeEventListener('copy', listener);
    };
    document.addEventListener('copy' , listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
    setCopyNotifOpen(true);
  };
  const handleCopyNotifClose = () => {
    setCopyNotifOpen(false);
  };


  // Switch UI for mobile
  const [ isMobile, setIsMobile ] = useState(
    document.body.clientWidth <= 768
  );

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <ThemeProvider
      theme={theme}
    >
      <div className="App">
        <Header
        />

        <Main
        >
          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent={isMobile ? 'flex-start' : 'center'}
            alignItems={isMobile ? 'center' : 'flex-start'}
            mt={2}
            mb={6}
          >
            <Box
              flexGrow={1}
              width={isMobile ? '100%' : 'auto'}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                width="100%"
              >
                <Typography
                  variant="h6"
                  component="h2"
                >
                  ??????????????????
                </Typography>
                <StepPresets
                  options={dailyOptions}
                  onChange={handleDailyOptionChange}
                />
              </Box>

              <Box
                mt={2}
                mb={2}
                style={{
                  display: isMobile ? 'inherit' : 'none',
                }}
              >
                <ExpandMoreIcon
                />
              </Box>


            </Box>

            <Box
              flexGrow={1}
              display="flex"
              flexDirection={isMobile ? 'column' : 'row'}
              justifyContent="center"
              alignItems="center"
              width={isMobile ? '100%' : 'auto'}
            >
              <Box
                ml={2}
                mr={2}
                style={{
                  display: isMobile ? 'none' : 'inherit',
                }}
              >
                <ChevronRightIcon
                />
              </Box>

              <Box
                flexGrow={1}
                width={isMobile ? '100%' : 'auto'}
              >
                <Typography
                  variant="h6"
                  component="h2"
                >
                  ???????????????
                </Typography>
                <StepDate
                  onSDateChange={handleSDateChange}
                  onEDateChange={handleEDateChange}
                />
              </Box>

              <Box
                ml={isMobile ? 0 : 2}
                mr={isMobile ? 0 : 2}
                mt={isMobile ? 2 : 0}
                mb={isMobile ? 2 : 0}
              >
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={
                    isMobile ? (
                      <ExpandMoreIcon
                      />
                    ) : (
                      <ChevronRightIcon
                      />
                    )
                  }
                  onClick={generate}
                >
                  {isMobile ? '???????????????' : '??????'}
                </Button>
              </Box>
            </Box>

            <Box
              flexGrow={1}
              width={isMobile ? '100%' : 'auto'}
              display="flex"
              flexDirection={isMobile ? 'row' : 'column'}
            >
              <Box
                flexGrow={1}
              >
                <Typography
                  variant="h6"
                  component="h2"
                >
                  ??????????????????
                </Typography>
                <OutputArea
                  text={text}
                  rows={10}
                />
              </Box>

              <Box
                mt={isMobile ? 0 : 2}
                ml={isMobile ? 2 : 0}
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  startIcon={(
                    <FileCopyOutlinedIcon
                    />
                  )}
                  onClick={() => {
                    copy(text);
                  }}
                >
                  ?????????
                </Button>
              </Box>
            </Box>
          </Box>

          <Footer
          >
            <Box
            >
              <Typography
                variant="caption"
              >
                &copy; {(new Date()).getFullYear()}&nbsp;
                <Link
                  href="https://ggtk.app"
                  target="_blanK"
                  color="inherit"
                >
                  Stardust Sorcery
                </Link>
                &nbsp;/&nbsp;
                <Link
                  href="https://ggtk.dev"
                  target="_blanK"
                  color="inherit"
                >
                  Yuta NAKAMIZO
                </Link>
              </Typography>
            </Box>
            
            <Box
            >
              <Typography
                variant="caption"
              >
                <Link
                  href="https://chouseisan.com"
                  target="_blanK"
                >
                  ????????????
                </Link>
                &nbsp;|&nbsp;
                <Link
                  href="https://github.com/YutaNakamizo/chouseisan-opgen"
                  target="_blanK"
                >
                  GitHub
                </Link>
              </Typography>
            </Box>
          </Footer>
        </Main>
      </div>

      <CopyNotif
        open={copyNotifOpen}
        onClose={handleCopyNotifClose}
      />
    </ThemeProvider>
  );
}

export default App;
