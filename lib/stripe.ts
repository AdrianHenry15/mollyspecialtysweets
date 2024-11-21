// Might be extra step in this code block using a helper function by nextjs...
// ...that prevents your server variable from being exposed

import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia", // Use the latest API version
})

export default stripe
