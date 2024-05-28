const express = require("express");
const router = express.Router();
const { checkLogin } = require("../middlewares/user");

const {
  handleAnalytics,
  handleCreateUrl,
  handleGetUrl,
  getUrls,
} = require("../controllers/url");

router.post("/", checkLogin, handleCreateUrl);

router.get("/:shortId", handleGetUrl);

router.get("/analytics/:shortId", handleAnalytics);
router.get("/", checkLogin, getUrls);

module.exports = router;
