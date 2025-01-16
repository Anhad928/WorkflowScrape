"use server";

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

export async function SetupUser() {
  const { userId } = auth();
    if (!userId) {
        throw new Error("unauthenticated");
    }

    const balance = await prisma.userBalance.findUnique({ where: { userId } });
    if (!balance) {
        // Free 200 credits for new users
        await prisma.userBalance.create({ data: { userId, credits: 200 } });
    }

    redirect("/");
}
