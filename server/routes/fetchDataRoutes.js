// routes/fetchDataRoutes.js
import express from "express";
import { getToolDataByOperation } from "../controllers/getToolData.js";
import { getAllDataByOperation } from "../controllers/getAllData.js";

const router = express.Router();

//broken tools
router.get("/Op230broken", (req, res) => getToolDataByOperation(req, res, "Op230", "broken-tool"));
router.get("/Op120broken", (req, res) => getToolDataByOperation(req, res, "Op120", "broken-tool"));
router.get("/Op150broken", (req, res) => getToolDataByOperation(req, res, "Op150", "broken-tool"));
router.get("/Op220broken", (req, res) => getToolDataByOperation(req, res, "Op220", "broken-tool"));

//other alarms
router.get("/Op230other", (req, res) => getToolDataByOperation(req, res, "Op230", "other-alarms"));
router.get("/Op120other", (req, res) => getToolDataByOperation(req, res, "Op120", "other-alarms"));
router.get("/Op150other", (req, res) => getToolDataByOperation(req, res, "Op150", "other-alarms"));
router.get("/Op220other", (req, res) => getToolDataByOperation(req, res, "Op220", "other-alarms"));

//air check chart
router.get("/Op150air", (req, res) => getToolDataByOperation(req, res, "Op150", "air-check"));

//parts produced
router.get("/Op150parts", (req, res) => getAllDataByOperation(req, res, "Op150"));
router.get("/Op230parts", (req, res) => getAllDataByOperation(req, res, "Op230"));


export default router;

