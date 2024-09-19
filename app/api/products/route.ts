import { NextResponse } from "next/server";

import { dummyCakes, dummyCookies, dummyCupcakes } from "@/lib/products";

const BakeryProducts = [...dummyCakes, ...dummyCupcakes, ...dummyCookies];

export async function GET() {
    return NextResponse.json(BakeryProducts);
}
