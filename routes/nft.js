var express = require('express')
const { PrismaClient } = require('@prisma/client')

BigInt.prototype.toJSON = function () {
    return Number.parseInt(this.toString());
}

const prisma = new PrismaClient()

var router = express.Router();

router.get("/list", async (_, res) => {
    let data = null;
    try {
        data = await prisma.nfts.findMany({
            select: {
                id: true,
                city: true,
                zip: true,
                address: true,
                imageList: true,
            }
        })
    } catch {
        data = [{"id":1,"imageList":[{ "nft_image" : "assets/images/nftmarket/01/StreetView.jpg" }],"city":"New York","zip":"92101","address":"123 Grape Street San Diego, CA "},{"id":2,"imageList":[{ "nft_image" :  "assets/images/nftmarket/02/ExteriorfromAlley.jpg" }],"city":"New York","zip":"92101","address":"123 Orange Street San Diego, CA"},{"id":3,"imageList":[{  "nft_image" : "assets/images/nftmarket/03/2ndFloorKitchenandLivingArea2.jpg" }],"city":"New York","zip":"92101","address":"123 Strawberry Street San Diego, CA"},{"id":4,"imageList":[{  "nft_image" : "assets/images/nftmarket/04/2ndFloorDeck2.jpg" }],"city":"New York","zip":"92101","address":"123 Apple Street San Diego, CA"}]
    }
    res.json(data);
});

router.get("/:nftID", async (req, res) => {
    let data;
    try {
    data = await prisma.nfts.findFirst({
        where: {
            id: BigInt(req.params.nftID)
        },
        include: {
            imageList: true
        }
    })
    }
    catch {
        data = {"createdAt":"2022-10-08T10:50:52.000+00:00","updateAt":"2022-10-08T10:50:52.000+00:00","id":1,"ownedBy":"Jaydeep patel","saleEndsDate":"2022-11-10T05:30:00.000+00:00","auctionDate":"2022-11-08T05:30:00.000+00:00","minimumOffer":"TDB","currency":"USDC","addressNumber":15,"address":"123 Grape Street San Diego, CA ","city":"New York","state":"CA","zip":"92101","unitNumber":null,"livingArea":5407.0,"lotSize":8000.0,"bedRooms":5,"bathRooms":4,"stories":"","yearBuilt":2018,"propertyType":"condo","zoning":"R-1:SINGLE FAM_RES","hoaName":"","hoaFee":"","hoaInculdes":"","taxYear":2020,"taxAmount":17000,"propertyInFloodZone":"No","registeredUserEmail":"","thumbnailId":1,"imageList":[{"createdAt":"2022-10-08T10:50:53.000+00:00","updateAt":"2022-10-08T10:50:53.000+00:00","id":2,"nft_image":"assets/images/nftmarket/01/MasterBathroom1.jpg"},{"createdAt":"2022-10-08T10:50:53.000+00:00","updateAt":"2022-10-08T10:50:53.000+00:00","id":3,"nft_image":"assets/images/nftmarket/01/Kitchen.jpg"},{"createdAt":"2022-10-08T10:50:54.000+00:00","updateAt":"2022-10-08T10:50:54.000+00:00","id":7,"nft_image":"assets/images/nftmarket/01/1stFloorBathroom.jpg"},{"createdAt":"2022-10-08T10:50:52.000+00:00","updateAt":"2022-10-08T10:50:52.000+00:00","id":1,"nft_image":"assets/images/nftmarket/01/StreetView.jpg"},{"createdAt":"2022-10-08T10:50:53.000+00:00","updateAt":"2022-10-08T10:50:53.000+00:00","id":4,"nft_image":"assets/images/nftmarket/01/2ndFloorDeck1.jpg"},{"createdAt":"2022-10-08T10:50:53.000+00:00","updateAt":"2022-10-08T10:50:53.000+00:00","id":5,"nft_image":"assets/images/nftmarket/01/1stFloorHallway.jpg"},{"createdAt":"2022-10-08T10:50:54.000+00:00","updateAt":"2022-10-08T10:50:54.000+00:00","id":6,"nft_image":"assets/images/nftmarket/01/1stFloorBedroom1.jpg"}]}
    }

    if (data == null) {
        res.json({error: "Not Found"})
        return;
    }
    res.json(data)
});

router.get("/add-image/:nftID", (_, res) => {

});

router.post("/save", (_, res) => {
});

// White paper requests
router.get("/whitepaperREQ/:nftId", (_, res) => {
});

module.exports = router;
