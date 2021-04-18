import React, {
  useRef,
} from 'react';
import {
  makeStyles,
} from '@material-ui/core/styles';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format";
import jaLocale from "date-fns/locale/ja";

const useStyles = makeStyles(theme => ({
  timeWrap: {
    position: 'relative',
    display: 'inline-block',
  },
  timePicker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: -1,
    visibility: 'hidden',
  },
}));

class ExDateFnsUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy 年 M 月", { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, "M 月 d 日", { locale: this.locale });
  }
};

const formatDate2Time = date => {
  return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
};

export const StepPresetsOption = ({
  startTime,
  endTime,
  enabled,
  onStartTimeChange = function() {},
  onEndTimeChange = function() {},
  onChange = function() {},
  ...props
}) => {
  const startTimePickerRef = useRef();
  const endTimePickerRef = useRef();

  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider
      utils={ExDateFnsUtils}
      locale={jaLocale}
    >
      <ListItem
      >
        <ListItemIcon
        >
          <Checkbox
            edge="start"
            checked={enabled}
            onClick={e => {
              onChange(!enabled);
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={(
            <>
              <Box
                className={classes.timeWrap}
              >
                <Button
                  variant="text"
                  onClick={() => {
                    startTimePickerRef.current.click();
                  }}
                >
                  <Typography
                    variant="body1"
                  >
                    {formatDate2Time(startTime)}
                  </Typography>
                </Button>
                <TimePicker
                  value={startTime}
                  okLabel="決定"
                  cancelLabel="キャンセル"
                  variant="inline"
                  format="HH:mm"
                  ampm={false}
                  onChange={date => {
                    onStartTimeChange(new Date(1970, 0, 1, date.getHours(), date.getMinutes()));
                  }}
                  variant="inline"
                  InputProps={{
                    ref: startTimePickerRef,
                  }}
                  className={classes.timePicker}
                />
              </Box>
              〜
              <Box
                className={classes.timeWrap}
              >
                <Button
                  variant="text"
                  onClick={() => {
                    endTimePickerRef.current.click();
                  }}
                >
                  <Typography
                    variant="body1"
                  >
                    {formatDate2Time(endTime)}
                  </Typography>
                </Button>
                <TimePicker
                  value={endTime}
                  okLabel="決定"
                  cancelLabel="キャンセル"
                  variant="inline"
                  format="HH:mm"
                  ampm={false}
                  onChange={date => {
                    onEndTimeChange(new Date(1970, 0, 1, date.getHours(), date.getMinutes()));
                  }}
                  variant="inline"
                  InputProps={{
                    ref: endTimePickerRef,
                  }}
                  className={classes.timePicker}
                />
              </Box>
            </>
          )}
        />
        <ListItemSecondaryAction
        >
          <IconButton
            edge="end"
          >
            <DeleteOutlineIcon
            />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </MuiPickersUtilsProvider>
  );
};

