import { NextRequest, NextResponse } from "next/server";

const EMAILNATOR_API = "https://www.emailnator.com";

function extractXsrfToken(cookies: string): string | null {
  const match = cookies.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log("Received email services:", email);

    const requestBody = { email };
    console.log("Request body to Emailnator:", JSON.stringify(requestBody));

    const initialResponse = await fetch(`${EMAILNATOR_API}/generate-email`, {
      method: "GET",
      credentials: "include",
    });

    const cookies = initialResponse.headers.get("set-cookie");
    console.log("Cookies received:", cookies);
    const xsrfToken = cookies ? extractXsrfToken(cookies) : null;
    console.log("XSRF-TOKEN received:", xsrfToken);

    if (!xsrfToken || !cookies) {
      throw new Error("Failed to retrieve XSRF token or cookies");
    }

    const formattedCookies = cookies.split(', ').join('; '); 
    console.log("Formatted cookies:", formattedCookies);

    const response = await fetch(`${EMAILNATOR_API}/generate-email`, {
      method: "POST",
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en,id-ID;q=0.9,id;q=0.8,en-US;q=0.7,es;q=0.6,zh-CN;q=0.5,zh;q=0.4,ms;q=0.3,ca;q=0.2,pt;q=0.1,sv;q=0.1",
        "content-type": "application/json",
        "cookie": formattedCookies, 
        "origin": "https://www.emailnator.com",
        "referer": "https://www.emailnator.com/",
        "sec-ch-ua": '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token": xsrfToken, 
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Emailnator API error:", response.status, errorText);
      throw new Error(`Failed to generate email: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("Generated email:", data);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in POST /api/temp-gmail:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", details: "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const initialResponse = await fetch(`${EMAILNATOR_API}/message-list`, {
      method: "GET",
      credentials: "include",
    });

    const cookies = initialResponse.headers.get("set-cookie");
    const xsrfToken = cookies ? extractXsrfToken(cookies) : null;

    if (!xsrfToken || !cookies) {
      throw new Error("Failed to retrieve XSRF token or cookies");
    }

    const formattedCookies = cookies.split(', ').join('; ');
    console.log("Formatted cookies:", formattedCookies);

    const response = await fetch(`${EMAILNATOR_API}/message-list`, {
      method: "POST",
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en,id-ID;q=0.9,id;q=0.8,en-US;q=0.7,es;q=0.6,zh-CN;q=0.5,zh;q=0.4,ms;q=0.3,ca;q=0.2,pt;q=0.1,sv;q=0.1",
        "content-type": "application/json",
        "cookie": formattedCookies,
        "origin": "https://www.emailnator.com",
        "referer": "https://www.emailnator.com/inbox/",
        "sec-ch-ua": '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token": xsrfToken, 
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorTextMess = await response.text();
      console.log("Failed to fetch message:", response.status, errorTextMess);
      throw new Error(`Failed to fetch message: ${response.status} ${errorTextMess}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/temp-gmail:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}