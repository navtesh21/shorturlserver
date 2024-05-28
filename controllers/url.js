const URL = require("../models/url");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();

async function handleCreateUrl(req, res) {
  if (!req.user) return res.send("please  login");
  console.log(req.user.id, "yo");
  const body = req.body;
  if (body) {
    const entry = await URL.create({
      shortId: uid.rnd(),
      url: body.url,
      history: [],
      createdBy: req.user.id,
    });
    res.send(entry);
  }
}

async function handleGetUrl(req, res) {
  id = req.params.shortId;
  console.log(id);
  const entry = await URL.findOneAndUpdate(
    { shortId: id },
    { $push: { history: { timestamp: Date.now() } } }
  );

  res.redirect(entry.url);
}

async function handleAnalytics(req, res) {
  id = req.params.shortId;
  console.log(id);
  const entry = await URL.findOne({ shortId: id });

  res.send({ totalClicks: entry.history.length, data: entry.history });
}

async function getUrls(req, res) {
  if (!req.user) return res.send("please  login");
  const entry = await URL.find({ createdBy: req.user.id });
  console.log(entry, "hehe");
  res.send(entry);
}

module.exports = { handleAnalytics, handleCreateUrl, handleGetUrl, getUrls };
