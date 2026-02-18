const express = require("express");
const router = express.Router();
const {
  creditWallet,
  debitWallet
} = require("../controllers/walletController");

router.post("/admin/wallet/credit", creditWallet);
router.post("/admin/wallet/debit", debitWallet);

module.exports = router;
