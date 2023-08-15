import express from 'express';
import sub from '../models/SurveySubmission.js';

const router = express.Router();

router.post('/', (req, res) => {
  // Retrieve the survey form data from the request body
  const {
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
  } = req.body;

  // Create a new instance of the SurveySubmission model
  const newSurveySubmission = new sub({
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
  });

  // Save the survey submission to the MongoDB database
  newSurveySubmission
    .save()
    .then(() => {
      // Return a success response
      res.status(200).json({ message: 'Survey submission saved successfully' });
    })
    .catch((error) => {
      // Return an error response
      console.error('Error while saving survey submission:', error);
      res.status(500).json({ error: 'Failed to save survey submission' });
    });
});

export default router;




