import React, { useState } from 'react';
import { TextField, Button, Container, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSubmitSurveyMutation } from 'state/api';

const SurveyForm = () => {
  const [operation, setOperation] = useState('');
  const [machine, setMachine] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [shift, setShift] = useState('');
  const [partsProduced, setPartsProduced] = useState('');
  const [reason, setReason] = useState('');
  const [toolNumber, setToolNumber] = useState('');
  const [toolLife, setToolLife] = useState('');
  const [alarmDetails, setAlarmDetails] = useState('');
  const [palletNumber, setPalletNumber] = useState('');
  const [issue, setIssue] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const navigate = useNavigate();

  function toggleFields() {
    const reasonValue = reason;
    // toggle fields for specific reason
    if (reasonValue === 'broken-tool') {
      setToolNumber('');
      setToolLife('');
    } else if (reasonValue === 'other-alarms') {
      setAlarmDetails('');
    } else if (reasonValue === 'air-check') {
      setPalletNumber('');
      setIssue('');
    } else if (reasonValue === 'other-reasons') {
      setOtherReason('');
    }
  }

  const [submitSurvey, { isLoading, isError, error }] = useSubmitSurveyMutation();

  function handleSubmit(event) {
    event.preventDefault();
    // Call the API mutation to submit the survey data
    submitSurvey({
      operation,
      machine,
      date,
      time,
      shift,
      partsProduced,
      reason,
      toolNumber,
      toolLife,
      alarmDetails,
      palletNumber,
      issue,
      otherReason,
    })
      .unwrap() 
      .then((data) => {
        console.log(data);
        showAlert('Survey submission successful!');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function showAlert(message) {
    window.alert(message);
  }


  return (
    <Container>
        <h2 align="center">Daily Production Card</h2>
      <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel id="operation-label">Operation</InputLabel>
            <Select
              labelId="operation-label"
              id="operation"
              value={operation}
              label="Operation"
              onChange={(e) => setOperation(e.target.value)}
              sx={{mb: 4}}
            >
              <MenuItem value="">Select Operation</MenuItem>
              <MenuItem value="Op150">Op150</MenuItem>
              <MenuItem value="Op230">Op230</MenuItem>
              <MenuItem value="Op120">Op120</MenuItem>
              <MenuItem value="Op220">Op220</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel id="machine-label">Machine</InputLabel>
            <Select
              labelId="machine-label"
              id="machine"
              value={machine}
              label="Machine"
              onChange={(e) => setMachine(e.target.value)}
              sx={{mb: 4}}
            >
              <MenuItem value="">Select Machine</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="All">All</MenuItem>
            </Select>
          </FormControl>
          <InputLabel
            htmlFor="date"
            sx={{ marginBottom: '8px' }} 
          >
            Date
          </InputLabel>
        <TextField
          type="date"
          variant="outlined"
          color="secondary"
          
          onChange={(e) => setDate(e.target.value)}
          value={date}
          required
          fullWidth
          sx={{mb: 4}}
        />
         <InputLabel
            htmlFor="time"
            sx={{ marginBottom: '8px' }} 
          >
            Time
          </InputLabel>
        <TextField
          type="time"
          variant="outlined"
          color="secondary"
          
          onChange={(e) => setTime(e.target.value)}
          value={time}
          required
          fullWidth
          sx={{mb: 4}}
          InputLabelProps={{
            style: { marginBottom: '8px' }, 
          }}
        />
        <FormControl variant="outlined" fullWidth required>
          <InputLabel id="shift-label">Shift</InputLabel>
          <Select
            labelId="shift-label"
            id="shift"
            value={shift}
            label="Shift"
            onChange={(e) => setShift(e.target.value)}
            sx={{mb: 4}}
          >
            <MenuItem value="">Select Shift</MenuItem>
            <MenuItem value="Day">Day</MenuItem>
            <MenuItem value="Afternoon">Afternoon</MenuItem>
            <MenuItem value="Night">Night</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="Parts Produced"
          onChange={(e) => setPartsProduced(e.target.value)}
          value={partsProduced}
          fullWidth
          sx={{mb: 4}}
        />
        <FormControl variant="outlined" fullWidth >
          <InputLabel id="reason-label">Reason for Downtime</InputLabel>
          <Select
            labelId="reason-label"
            id="reason"
            value={reason}
            label="Reason for Downtime"
            onChange={(e) => setReason(e.target.value)}
            onBlur={toggleFields}
            sx={{mb: 4}}
            
          >
            <MenuItem value="">Select Reason</MenuItem>
            <MenuItem value="broken-tool">Broken Tool</MenuItem>
            <MenuItem value="air-check">Air Check</MenuItem>
            <MenuItem value="other-alarms">Other Alarms</MenuItem>
            <MenuItem value="other-reasons">Other Reasons</MenuItem>
          </Select>
        </FormControl>
        {reason === 'broken-tool' && (
          <Stack spacing={2} sx={{mb: 4}}>
            <TextField
              type="text"
              variant="outlined" 
              label="Tool Number"
              onChange={(e) => setToolNumber(e.target.value)}
              value={toolNumber} 
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Tool Life"
              onChange={(e) => setToolLife(e.target.value)}
              value={toolLife}
            />
          </Stack>
        )}
        {reason === 'other-alarms' && (
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Alarm Details"
            onChange={(e) => setAlarmDetails(e.target.value)}
            value={alarmDetails}
            fullWidth
            sx={{mb: 4}}
          />
        )}
        {reason === 'air-check' && (
          <Stack spacing={2} sx={{mb: 4}}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Pallet Number"
              onChange={(e) => setPalletNumber(e.target.value)}
              value={palletNumber} 
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Issue/Comments"
              onChange={(e) => setIssue(e.target.value)}
              value={issue}
            />
          </Stack>
          
        )}
        {reason === 'other-reasons' && (
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Describe Issue"
            onChange={(e) => setOtherReason(e.target.value)}
            value={otherReason}
            fullWidth
            sx={{mb: 4}}
            
          />
        )}
        <Button variant="outlined" color="secondary" type="submit" fullWidth sx={{mb: 4}}>
         Submit
        </Button>
      </form>
    </Container>
  );
};

export default SurveyForm;



