import { NextRequest, NextResponse } from "next/server";

const EMAILNATOR_API = "https://www.emailnator.com";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log("Received email services:", email);

    const requestBody = { email };
    console.log("Request body to Emailnator:", JSON.stringify(requestBody));

    const response = await fetch(`${EMAILNATOR_API}/generate-email`, {
      method: "POST",
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language":"en,id-ID;q=0.9,id;q=0.8,en-US;q=0.7,es;q=0.6,zh-CN;q=0.5,zh;q=0.4,ms;q=0.3,ca;q=0.2,pt;q=0.1,sv;q=0.1",
        "content-type": "application/json",
        "cookie": "XSRF-TOKEN=eyJpdiI6IjBpSzdFckZNWkNwMkw0dE15T3FXc3c9PSIsInZhbHVlIjoiS0FCUG0wTGZDMFRSUzdpZzdZaGtURGl2OWhqWkNhOTRLZDJrRVVLOEJTbk9PazhYaVlSQVFXRGFMbm9lQy91RHloWTVQelFrUHM1QmVaMVg4dEMrYXNhc0tOb1dYMjRMTTVPdTQ1WTlySVlRdHRjTVhJOG1qMEVtaG9MM3cyeEYiLCJtYWMiOiIwOTIyZGZmODAzMDM4OWZkNTlmODdmNWYxYTFmM2M5OTQwMWMyMzJhZjU2M2Q0NzdjODU3ZWI2MGFjMjAwYmFmIiwidGFnIjoiIn0%3D; gmailnator_session=eyJpdiI6IlJLQmtsbC9zLzlFTVErUGNibXMwUUE9PSIsInZhbHVlIjoicnh2MVMxZkNFS0xSVjQySFl3U3I5OHpkWUFtZVRvR3FWMTQ5K2cveTJJN1FzalJVUnFzbHlQZnVjUUJsZnF3enJGZyt4QnMxYzlJSHlqUGlkc3V5OGY5UFRaZnJTSGtrMzRoWHlNSmpZTVI4aUZWM0Z4Qm5PTEJmQzQ4WlI0bWsiLCJtYWMiOiIzMzk3M2MyZmNmOGQ4MTQxZmIwMmQyZjU4OWU4Zjk4OTQ4YzE3ODc1OGVhNjJhOGJlZGJjNmM5MWNjY2RlNTk0IiwidGFnIjoiIn0%3D",
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
        "x-xsrf-token": "eyJpdiI6IjBpSzdFckZNWkNwMkw0dE15T3FXc3c9PSIsInZhbHVlIjoiS0FCUG0wTGZDMFRSUzdpZzdZaGtURGl2OWhqWkNhOTRLZDJrRVVLOEJTbk9PazhYaVlSQVFXRGFMbm9lQy91RHloWTVQelFrUHM1QmVaMVg4dEMrYXNhc0tOb1dYMjRMTTVPdTQ1WTlySVlRdHRjTVhJOG1qMEVtaG9MM3cyeEYiLCJtYWMiOiIwOTIyZGZmODAzMDM4OWZkNTlmODdmNWYxYTFmM2M5OTQwMWMyMzJhZjU2M2Q0NzdjODU3ZWI2MGFjMjAwYmFmIiwidGFnIjoiIn0="
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Emailnator API error:", response.status, errorText);
      throw new Error(
        `Failed to generate email: ${response.status} ${errorText}`
      );
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

    const response = await fetch(`${EMAILNATOR_API}/message-list`, {
      method: "POST",
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en,id-ID;q=0.9,id;q=0.8,en-US;q=0.7,es;q=0.6,zh-CN;q=0.5,zh;q=0.4,ms;q=0.3,ca;q=0.2,pt;q=0.1,sv;q=0.1",
        "content-type": "application/json",
        "cookie": "XSRF-TOKEN=eyJpdiI6IkFoV25VSjVQbHNaUjlBMU1TM2JvN2c9PSIsInZhbHVlIjoic1lzMUlqYWxxbFFSWEs5dGdOc3dDZUxtem1kSkZOeU9kV1ZOUE5ibGZ6cW94SHhmUlFQZ290UFN4dUJIUGlLZE85ODNpTDBCZnYzTHZhWS9BOE81MDF1TUR6UEttSGRJMEF2ckNlSFA0OFR2OEhQN0JheitaS045RkRudGFhVzAiLCJtYWMiOiIzNDgzYTZjOTdkYTdkZTg2MjllYWE2NDFjMWRmMTFjOWQyOGY4ZWVkYzdiNmQ0NzMzZmEwZThhYmVkNmRjMDYxIiwidGFnIjoiIn0%3D; gmailnator_session=eyJpdiI6IlY0aFozKzNkZGZGVDVVTzBHNTZQRkE9PSIsInZhbHVlIjoiQkJmZ1Bub04xNTdQbVpWRkpSVFhuTkE1MUJUT1BhTkZjWitHWmxKMWZGR2Y5MU41KzhySE1uWVJ3MTdkMjZIeEVkaG0vOWFWUnpibFhGY3VBcDc1SWVpU0txWDdEQ2NOdjhNdXBWbHRqdkNtdEZlcFd3MytFcW80UVNQUTFHdHoiLCJtYWMiOiI3OTg4ZWI0OTVmNTdmZTg5MjQ3YmZjMmEzZjhjNDIzYTFjZjIwZTYxZTVkM2MyY2JlNmFhZDlkNjAwNTVmMjFlIiwidGFnIjoiIn0%3D",
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
        "x-xsrf-token": "eyJpdiI6IkFoV25VSjVQbHNaUjlBMU1TM2JvN2c9PSIsInZhbHVlIjoic1lzMUlqYWxxbFFSWEs5dGdOc3dDZUxtem1kSkZOeU9kV1ZOUE5ibGZ6cW94SHhmUlFQZ290UFN4dUJIUGlLZE85ODNpTDBCZnYzTHZhWS9BOE81MDF1TUR6UEttSGRJMEF2ckNlSFA0OFR2OEhQN0JheitaS045RkRudGFhVzAiLCJtYWMiOiIzNDgzYTZjOTdkYTdkZTg2MjllYWE2NDFjMWRmMTFjOWQyOGY4ZWVkYzdiNmQ0NzMzZmEwZThhYmVkNmRjMDYxIiwidGFnIjoiIn0="
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
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
