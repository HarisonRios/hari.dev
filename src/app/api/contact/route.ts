export const runtime = 'nodejs';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const getRateLimitStore = () => {
  const globalStore = globalThis as typeof globalThis & {
    __contactRateLimit?: Map<string, RateLimitEntry>;
  };

  if (!globalStore.__contactRateLimit) {
    globalStore.__contactRateLimit = new Map();
  }

  return globalStore.__contactRateLimit;
};

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'unknown';
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalize = (value: string) => value.trim();

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin');
    const requestOrigin = new URL(request.url).origin;

    if (origin && origin !== requestOrigin) {
      return Response.json({ error: 'forbidden' }, { status: 403 });
    }

    const store = getRateLimitStore();
    const ip = getClientIp(request);
    const now = Date.now();
    const entry = store.get(ip);

    if (entry && entry.resetAt > now && entry.count >= RATE_LIMIT_MAX) {
      return Response.json({ error: 'rate_limited' }, { status: 429 });
    }

    if (!entry || entry.resetAt <= now) {
      store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    } else {
      store.set(ip, { count: entry.count + 1, resetAt: entry.resetAt });
    }

    let payload: ContactPayload;
    try {
      payload = (await request.json()) as ContactPayload;
    } catch (error) {
      console.error('Invalid JSON payload:', error);
      return Response.json({ error: 'invalid_payload' }, { status: 400 });
    }

    const name = normalize(payload.name ?? '');
    const email = normalize(payload.email ?? '');
    const message = normalize(payload.message ?? '');
    const company = normalize(payload.company ?? '');

    if (company) {
      return Response.json({ ok: true });
    }

    if (name.length < 2 || name.length > 80) {
      return Response.json({ error: 'invalid_name' }, { status: 400 });
    }

    if (!isValidEmail(email) || email.length > 120) {
      return Response.json({ error: 'invalid_email' }, { status: 400 });
    }

    if (message.length < 10 || message.length > 2000) {
      return Response.json({ error: 'invalid_message' }, { status: 400 });
    }

    const serviceId =
      process.env.EMAILJS_SERVICE_ID ??
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId =
      process.env.EMAILJS_TEMPLATE_ID ??
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey =
      process.env.EMAILJS_PUBLIC_KEY ??
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hharison562@gmail.com';

    if (!serviceId || !templateId || !publicKey) {
      return Response.json(
        { error: 'email_provider_not_configured' },
        { status: 500 }
      );
    }

    const emailResponse = await fetch(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            to_email: toEmail,
            from_name: name,
            from_email: email,
            message,
          },
        }),
        cache: 'no-store',
      }
    );

    if (!emailResponse.ok) {
      const details = await emailResponse.text();
      console.error('EmailJS error:', details);
      return Response.json({ error: 'email_send_failed' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return Response.json({ error: 'unexpected_error' }, { status: 500 });
  }
}
