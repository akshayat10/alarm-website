import sub from '../models/SurveySubmission.js';

  export const getToolDataByOperation = async (req, res, operation, reason) => {
    try {

      const submissions = await sub
        .find({ operation, reason })
    
      const total = await sub.countDocuments({ operation, reason });
 
      res.status(200).json({
        submissions,
        total,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };



  