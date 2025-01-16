import { writeFile } from "fs";
import "server-only";
import Stripe from "stripe";

export async function HandleCheckoutSessionCompleted(
    event: Stripe.Checkout.Session
) {
    writeFile("session_completed.json", JSON.stringify(event), (err) => {})
}