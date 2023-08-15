import sub from '../models/SurveySubmission.js';

export const getAllDataByOperation = async (req, res, operation) => {
  try {
    
    const submissions = await sub.find({ operation });
    const total = await sub.countDocuments({ operation });

    res.status(200).json({
      submissions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
