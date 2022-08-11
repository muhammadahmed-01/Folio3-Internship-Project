import Appointment from "../../../models/Appointment"
import connectToMongo from "../../../utils/db"

export default async (req, res) => {
  try {
    await connectToMongo()

    if (req.method === "GET") {
      const appointments = await Appointment.find({}).sort("-date").limit(5)
      return res.status(200).send(JSON.stringify(appointments))
    }
  }
  catch (err){
    console.error(err)
    return res.status(500).send("Internal server error occurred")
  }
};