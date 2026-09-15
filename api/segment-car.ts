import type { VercelRequest, VercelResponse } from '@vercel/node';

type SegmentBody = {
  /** Data-URL or raw base64 image string */
  image?: string;
  imageBase64?: string;
  /** Optional public HTTPS URL for the source image */
  imageUrl?: string;
};

/**
 * POST /api/segment-car
 * Accepts an image (base64 data URL or HTTPS URL), runs car segmentation via Replicate
 * using a server-only API token, and returns mask / output URLs to the client.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if ((req.method || 'GET').toUpperCase() !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.REPLICATE_API_TOKEN;
  const version = process.env.REPLICATE_CAR_SEGMENT_VERSION;

  if (!token) {
    return res.status(500).json({ error: 'REPLICATE_API_TOKEN is not configured' });
  }
  if (!version) {
    return res
      .status(500)
      .json({ error: 'REPLICATE_CAR_SEGMENT_VERSION is not configured' });
  }

  try {
    const body = (req.body ?? {}) as SegmentBody;
    const image =
      body.imageUrl ||
      body.image ||
      body.imageBase64 ||
      null;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({
        error: 'Provide image, imageBase64 (data URL / base64), or imageUrl',
      });
    }

    // Create prediction
    const createRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
        Prefer: 'wait',
      },
      body: JSON.stringify({
        version,
        input: {
          image,
        },
      }),
    });

    const prediction = (await createRes.json()) as {
      id?: string;
      status?: string;
      output?: unknown;
      error?: string;
      urls?: { get?: string };
    };

    if (!createRes.ok) {
      return res.status(createRes.status).json({
        error: prediction.error || 'Replicate prediction failed to start',
        details: prediction,
      });
    }

    // Prefer synchronous result when Prefer: wait is honored; otherwise poll briefly
    let result = prediction;
    if (result.status !== 'succeeded' && result.status !== 'failed' && result.urls?.get) {
      result = await pollPrediction(result.urls.get, token);
    }

    if (result.status === 'failed') {
      return res.status(502).json({
        error: result.error || 'Segmentation failed',
        id: result.id,
      });
    }

    return res.status(200).json({
      id: result.id,
      status: result.status,
      mask: result.output ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected server error';
    console.error('[api/segment-car]', err);
    return res.status(500).json({ error: message });
  }
}

async function pollPrediction(
  url: string,
  token: string,
  attempts = 20,
  delayMs = 1000,
): Promise<{
  id?: string;
  status?: string;
  output?: unknown;
  error?: string;
  urls?: { get?: string };
}> {
  let last: {
    id?: string;
    status?: string;
    output?: unknown;
    error?: string;
    urls?: { get?: string };
  } = {};

  for (let i = 0; i < attempts; i++) {
    const res = await fetch(url, {
      headers: { Authorization: `Token ${token}` },
    });
    last = (await res.json()) as typeof last;
    if (last.status === 'succeeded' || last.status === 'failed' || last.status === 'canceled') {
      return last;
    }
    await new Promise((r) => setTimeout(r, delayMs));
  }

  return last;
}
