import Anthropic from "@anthropic-ai/sdk";
import type { ScreenTimeData, CookedResult } from "@/types";
import {
  SCREEN_TIME_EXTRACTION_PROMPT,
  ROAST_GENERATION_PROMPT,
} from "./prompts";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-haiku-4-5-20251001";

type ImageMediaType = "image/png" | "image/jpeg" | "image/webp" | "image/gif";

/**
 * Detect media type from raw base64 by checking magic bytes.
 */
function detectMediaTypeFromBytes(base64: string): ImageMediaType {
  if (base64.startsWith("/9j/")) return "image/jpeg";
  if (base64.startsWith("iVBOR")) return "image/png";
  if (base64.startsWith("UklGR")) return "image/webp";
  if (base64.startsWith("R0lGO")) return "image/gif";
  return "image/png";
}

/**
 * Strip data URI prefix and detect media type from a base64 string.
 */
function parseBase64Image(input: string): {
  data: string;
  mediaType: ImageMediaType;
} {
  const match = input.match(
    /^data:(image\/(?:png|jpeg|jpg|webp|gif));base64,(.+)$/
  );
  if (match) {
    const mediaType = (
      match[1] === "image/jpg" ? "image/jpeg" : match[1]
    ) as ImageMediaType;
    return { mediaType, data: match[2] };
  }

  const mediaType = detectMediaTypeFromBytes(input);
  return { data: input, mediaType };
}

/**
 * Parse a JSON response from the model, handling markdown code block wrapping.
 */
function parseJSONResponse<T>(text: string): T {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) {
      return JSON.parse(match[1].trim());
    }
    throw new Error(`Failed to parse AI response as JSON: ${trimmed.slice(0, 200)}`);
  }
}

/**
 * Step 1: Extract screen time data from a screenshot using vision.
 */
export async function extractScreenTime(
  imageBase64: string
): Promise<ScreenTimeData> {
  const { data, mediaType } = parseBase64Image(imageBase64);

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: SCREEN_TIME_EXTRACTION_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data,
            },
          },
          {
            type: "text",
            text: "Extract the screen time data from this screenshot.",
          },
        ],
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from extraction model");
  }

  const parsed = parseJSONResponse<ScreenTimeData>(textBlock.text);

  if (!parsed.apps || !Array.isArray(parsed.apps) || parsed.apps.length === 0) {
    throw new Error("No apps extracted from screenshot");
  }

  return parsed;
}

/**
 * Step 2: Generate comedy roast from structured screen time data.
 */
export async function generateRoast(
  screenTimeData: ScreenTimeData
): Promise<CookedResult> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: ROAST_GENERATION_PROMPT,
    messages: [
      {
        role: "user",
        content: JSON.stringify(screenTimeData),
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from roast model");
  }

  const parsed = parseJSONResponse<CookedResult>(textBlock.text);

  parsed.cookedLevel = Math.max(0, Math.min(100, parsed.cookedLevel));

  if (!parsed.totalScreenTime) {
    parsed.totalScreenTime = screenTimeData.totalScreenTime;
  }

  if (!parsed.stats?.appsAnalyzed) {
    parsed.stats = {
      ...parsed.stats,
      appsAnalyzed: screenTimeData.apps.length,
    };
  }

  return parsed;
}
