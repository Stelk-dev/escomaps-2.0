/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(
  "sk_test_51MZYfBGRBlPIb5Y4cLttU9qTxPc6JNxwDv7BDv1o7H6abDqSi4donPsY6D5rXXzboBcWQcU3qalgX1ibBHQn3P6P00pWs6jRRM"
);
// functions.config().stripe.secret

exports.createStripeCheckout = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    cors(request, response, async () => {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: request.body["description"],
                  metadata: { totalCredits: request.body["totalCredits"] },
                },
                unit_amount: request.body["price"],
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url:
            "https://escomaps.web.app/buy-credits/buy-success?session_id={CHECKOUT_SESSION_ID}",
          cancel_url: "https://escomaps.web.app/buy-credits",
        });

        response.status(200).send({ sessionId: session.id });
      } catch (error) {
        console.error("Stripe error:", error);
        response.status(500).send({ error: error.message });
      }
    });
  });

exports.checkoutSession = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    cors(request, response, async () => {
      try {
        const sessionId = request.body["sessionId"];
        const lineItems = await stripe.checkout.sessions.listLineItems(
          sessionId
        );

        if (
          lineItems.data === undefined ||
          lineItems.data === null ||
          lineItems.data.length === 0
        ) {
          response.status(404).send({
            error: "No item found",
          });

          return;
        }

        const product = await stripe.products.retrieve(
          lineItems.data[0].price.product
        );

        response.status(200).send({
          totalCredits: +product.metadata.totalCredits,
        });
      } catch (error) {
        console.error("Stripe error:", error);
        response.status(500).send({ error: error.message });
      }
    });
  });
