// /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://Meetup-Website:meetupwebsite@cluster0.oqnin.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollectins = db.collection("meetups");

    const result = await meetupsCollectins.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ msg: "meetup inserted" });
  }
}

export default handler;
