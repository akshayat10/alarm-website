import mongoose from 'mongoose';

const submitSurvey = new mongoose.Schema({
  operation: { type: String, required: true },
  machine: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  shift: { type: String, required: true },
  partsProduced: {type: Number},
  reason: { type: String },
  toolNumber: { type: String },
  toolLife: { type: String },
  alarmDetails: { type: String },
  palletNumber: { type: String },
  issue: { type: String },
  otherReason: { type: String },
});

const sub = mongoose.model('sub', submitSurvey);

export default sub;
