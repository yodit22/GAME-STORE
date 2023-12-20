const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51O9bWXKDbD86H7I3MmAaQ3Kmt730dnqe3IOuLY6Qrv6ltgHBYjDPvJ93omIflKVQo1UTAMaZr2I4pHXOvNZoUvbT008NusHQzQ"
);

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Checking backend functionality
app.get("/", (req, res) =>
  res.status(200).send("Server is listening on port 3000")
);

app.post("/paymentIntent", async (req, res) => {
  const { total } = req.query;

  //console.log("Total Payment amount: " + total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      payment_method_types: ["card"],
    });

    //console.log(paymentIntent.client_secret);

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// console.error(error);
//     res
//        .status(500)
//       .json({ error: "An error occurred while creating the payment intent." });
