const router = require("express").Router();
const Message = require("../models/Message");
// send message
router.post("/new", async (req, res) => {
  const message = new Message(req.body);
  try {
    const saveMessage = await message.save();
    res.status(200).json(saveMessage);
  } catch (error) {
    res.status(403).json(error);
  }
});
// get message
router.get("/:conversationId", async (req, res) => {
  try {
    const getMessage = await Message.find({
      conversationId: req.params.conversationId,
    });
    if (getMessage.length !== 0) {
      res.status(200).json(getMessage);
    } else {
      res.status(403).json("no message found");
    }
  } catch (error) {
    res.status(403).json(error);
  }
});

module.exports = router;
