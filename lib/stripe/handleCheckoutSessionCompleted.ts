import { getCreditsPack, PackId } from "@/types/billing";
import { writeFile } from "fs";
import "server-only";
import Stripe from "stripe";
import prisma from "../prisma";

export async function HandleCheckoutSessionCompleted(
    event: Stripe.Checkout.Session
) {
    if(!event.metadata){
        throw new Error("No metadata");
    }
    const {userId, packId} = event.metadata;
    if (!userId) {
        throw new Error("No user ID");
    }
    if (!packId) {
        throw new Error("No pack ID");
    }

    const purchasePack = getCreditsPack(packId as PackId);
    if (!purchasePack) {
        throw new Error("Invalid pack");
    }

    await prisma.userBalance.upsert({
        where: { userId },
        create: {
            userId,
            credits: purchasePack.credits,
        },
        update: {
            credits: {
                increment: purchasePack.credits,
            },
        },
    });
}