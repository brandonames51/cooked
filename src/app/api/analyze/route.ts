import { NextResponse } from "next/server";
import { extractScreenTime, generateRoast } from "@/lib/anthropic";
import { rateLimit } from "@/lib/rateLimit";
import type { AnalyzeResponse } from "@/types";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { allowed } = rateLimit(ip);
    if (!allowed) {
      return NextResponse.json<AnalyzeResponse>(
        {
          success: false,
          error: "You're getting rotted too fast! Try again in a bit.",
        },
        { status: 429, headers: { "Retry-After": "3600" } }
      );
    }

    const body = await request.json();
    const { image } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json<AnalyzeResponse>(
        { success: false, error: "No image provided" },
        { status: 400 }
      );
    }

    if (
      !process.env.ANTHROPIC_API_KEY ||
      process.env.ANTHROPIC_API_KEY === "sk-ant-REPLACE_ME"
    ) {
      return NextResponse.json<AnalyzeResponse>(
        { success: false, error: "API key not configured" },
        { status: 500 }
      );
    }

    // Step 1: Extract screen time data from the screenshot
    let screenTimeData;
    try {
      screenTimeData = await extractScreenTime(image);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error("[analyze] Screen time extraction failed:", msg);
      return NextResponse.json<AnalyzeResponse>(
        {
          success: false,
          error:
            "Could not read your screenshot. Make sure it's a clear screen time screenshot from Settings.",
        },
        { status: 422 }
      );
    }

    // Validate we got meaningful data
    if (!screenTimeData.apps || screenTimeData.apps.length === 0) {
      return NextResponse.json<AnalyzeResponse>(
        {
          success: false,
          error:
            "No app usage data found in the screenshot. Make sure you're uploading your Screen Time page.",
        },
        { status: 422 }
      );
    }

    // Step 2: Generate the comedy roast
    let cookedResult;
    try {
      cookedResult = await generateRoast(screenTimeData);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error("[analyze] Roast generation failed:", msg);
      return NextResponse.json<AnalyzeResponse>(
        {
          success: false,
          error: "The roast machine broke. Try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json<AnalyzeResponse>({
      success: true,
      data: cookedResult,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[analyze] Endpoint error:", msg);
    return NextResponse.json<AnalyzeResponse>(
      {
        success: false,
        error: "Something went wrong. Try again.",
      },
      { status: 500 }
    );
  }
}
