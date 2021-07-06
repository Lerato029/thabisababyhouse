import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await mailList(req, res);
      break;
  }
};

export const mailList = async (req, res) => {
  
  
  
  const { email } = req.body;
  console.log(email);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });

    return res.status(201).json({ error: "" });
  } catch (error) {
    return res.status(500).json({
      error:
        "User already exists!, Please try another email." || error.toString(),
    });
  }
};
