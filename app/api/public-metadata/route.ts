import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  // Fetch estimates and invoices for the user
  const estimates = await prisma.estimate.findMany({
    where: { userId }
  });

  const invoices = await prisma.invoice.findMany({
    where: { userId }
  });

  // Construct metadata to update
  const metadata = {
    estimates: estimates.map(estimate => ({
      id: estimate.id,
      itemName: estimate.itemName,
      createdAt: estimate.createdAt,
      updatedAt: estimate.updatedAt
    })),
    invoices: invoices.map(invoice => ({
      id: invoice.id,
      itemName: invoice.itemName,
      price: invoice.price,
      verified: invoice.verified,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    }))
  };

  // Update Clerk user metadata
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: metadata
  });

  return NextResponse.json({ success: true });
}
