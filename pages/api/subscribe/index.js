/* ================================API Route for handling SUBSCRIBE POST REQUESTS TO MAIL CHIMP API===========================  */
//import mail chimp module
import mailchimp from "@mailchimp/mailchimp_marketing";

//config mail chimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});


//call mailList module
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await mailList(req, res);
      break;
  }
};



export const mailList = async (req, res) => {
  //email from client
  const { email } = req.body;

  //user has to provide email
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }


  try {
    //mail chimp API request
    //use addListMember method to subscribe user to mailing list & describe status
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });
    //success
    return res.status(200).json({ msg: "Great! Thank you for subscribing!" });
  } catch (error) {
    //error
    return res.status(500).json({
      err:
        "User already exists!, Please try another email." || error.toString(),
    });
  }
};
