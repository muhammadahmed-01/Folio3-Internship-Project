import Person from "../../../models/Person"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method == "POST"){
    try {
      const person = Person(req.body);
      await person.save();
      res.send(req.body);
    }
    catch (err){
      console.error(err);
      res.status(500).send("Internal server error occurred");
    }
  }
};