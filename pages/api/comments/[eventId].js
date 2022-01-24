// import {MongoClient} from 'mongodb';

import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  // MongoClient.connect();

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();

      return;
    }



    const newComment = {
      //   id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };
    let result;

    try {
      result = await insertDocument(client, "comments", newComment);

      newComment_id = result.insertedId;

      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Insering comment failed!" });
      return;
    }

    // const db = client.db();

    // const result = await db.collection("comments").insertOne(newComment);

    // console.log(result);
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments faied." });
    }
    // const db = client.db();

    // const documents = await db
    //   .collection("comments")
    //   .find()
    //   .sort({ _id: -1 })
    //   .toArray();

    // const dummyList = [
    //   { id: "c1", name: "Gohome", text: "A fisrt comment!" },
    //   { id: "c2", name: "PhatGioi", text: "A second comment!" },
    // ];
  }
  client.close();
}

export default handler;
