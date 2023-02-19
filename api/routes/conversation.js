const router = require("express").Router();
const Conven = require("../models/Conversation");
// create conversation
router.post("/new", async (req, res) => {
  const converstions = new Conven({
    members: [req.body.senderId, req.body.reciverId],
  });
try {
    const saveConven = await converstions.save() 
    res.status(200).json(saveConven) 
} catch (error) {
    res.status(200).json(error);
}
});
// get conversation
router.get("/:userId", async (req, res) => {
try {
    const getConven = await Conven?.find({
      members: { $in: [req.params.userId] },
    });
    if (getConven.length !==0) {
      res.status(200).json(getConven);
    } else {
      res.status(403).json("no conversation found");
    }
} catch (error) {
    res.status(403).json(error);
}
});
// get conversation
router.post("/get/:userId", async (req, res) => {
if (req.body.reciverId) {
  let array = [req.params.userId, req.body.reciverId];
  try {
    const getConven = await Conven?.find({
      members: { $in: array },
    });
    if (getConven.length !== 0) {
      res.status(200).json(getConven);
    } else {
      res.status(403).json("no conversation found");
    }
  } catch (error) {
    res.status(403).json(error);
  }
} else {
  res.status(403).json("no reciver found");
}
});
module.exports = router;