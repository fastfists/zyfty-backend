const express = require('express');
const ethers = require('ethers');
const { PrismaClient } = require('@prisma/client')
const router = express.Router();
const ZyftyKYC = require('../ZyftyKYC.json')

const prisma = new PrismaClient()

let chainsRPC = {
    97: "https://data-seed-prebsc-1-s1.binance.org:8545" // Binance Test Net
}

let deployments = {
    // Binance
    97: "0x2d94BF44128B5c15570C4370e1e5D5246C6Ce711"
}

router.post("/register", (req, res) => {
    res.json({hi: "world"})
})

router.post("/verification", async (req, res) => {
    let [msg, addr, sig, chainId] = req.body.vendorData.split("-");
    let rec = ethers.utils.verifyMessage(msg, sig)

    let signatureCorrect = rec.toLowerCase() == addr.toLowerCase();
    console.log("Got req")
    if (signatureCorrect) {
        // Send NTT if doesn't already have NTT
        console.log("Looks good")
        let rpcUrl = chainsRPC[chainId];
        let signer = new ethers.Wallet(process.env.WALLET)
                .connect(new ethers.providers.JsonRpcProvider(rpcUrl));

        // TODO export to envrionment
        let addr = deployments[chainId]

        let ntt = new ethers.Contract(addr, ZyftyKYC.abi, signer)
        console.log("minting", rpcUrl, signer)

        // Empty catch in case of reissuance
        try {
            await ntt.mint(rec);
        } catch {
        }
        console.log("minted")
    }

    res.json({hi: "world"})
})

router.put("/verify", (req, res) => {
})

router.put("/forgot-password", (req, res) => {
})

router.put("/new-password", (req, res) => {
})

router.put("/reset-password/:userName", (req, res) => {
})

router.put("/edituser", (req, res) => {
})

module.exports = router;
