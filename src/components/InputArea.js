import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format";
import jaLocale from "date-fns/locale/ja";

class ExDateFnsUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy 年 M 月", { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, "M 月 d 日", { locale: this.locale });
  }
};

export const InputArea = ({
  onSDateChange = function() {},
  onEDateChange = function() {},
  ...props
}) => {
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());

  const handleSDateChange = date => {
    setStartDate(date);
    onSDateChange(date);
  };

  const handleEDateChange = date => {
    setEndDate(date);
    onEDateChange(date);
  };

  useEffect(() => {
    handleSDateChange(new Date());
    handleEDateChange(new Date());
  }, []);

  return (
    <MuiPickersUtilsProvider
      utils={ExDateFnsUtils}
      locale={jaLocale}
    >
      <Box
      >
        <Box
        >
          <Typography
          >
            開始日
          </Typography>
          <KeyboardDatePicker
            value={startDate}
            okLabel="決定"
            cancelLabel="キャンセル"
            variant="inline"
            format="yyyy/MM/dd"
            onChange={date => {
              setStartDate(date);
              onSDateChange(date);
            }}
          />
        </Box>

        <Box
        >
          <Typography
          >
            終了日
          </Typography>
          <KeyboardDatePicker
            value={endDate}
            okLabel="決定"
            cancelLabel="キャンセル"
            variant="inline"
            format="yyyy/MM/dd"
            onChange={date => {
              setEndDate(date);
              onEDateChange(date);
            }}
          />
        </Box>
      </Box>
    </MuiPickersUtilsProvider>
  );
};
        


