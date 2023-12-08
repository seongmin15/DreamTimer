const express = require("express");
const Global = require("../global");
const userRouter = express.Router();

(async () => {
    userRepository = await Global.getUserRepository();
})();

userRouter.get("/serial/:serial", async (req, res) => {
    const serial = req.params.serial;

    res.json(await userRepository.getUserByDeviceSerial(serial));
    return;
});

userRouter.get("/id/:id", async (req, res) => {
    const id = req.params.id;

    res.json(await userRepository.getUserById(id));
    return;
});

userRouter.get("/email/:email", async (req, res) => {
  const email = req.params.email;

  res.json(await userRepository.getUserByEmail(email));
  return;
})

module.exports = userRouter;