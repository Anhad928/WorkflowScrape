import Stripe from "stripe";

export const stripe = new Stripe(KEY, {
    apiVersion: "2024-12-18.acacia",
    typescript: true,
})