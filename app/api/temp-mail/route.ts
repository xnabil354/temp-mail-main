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
        "cookie": "_ga=GA1.1.309278770.1721308694; perf_dv6Tr4n=1; _ga_R24V0HY4VV=GS1.1.1723626335.1.1.1723626503.0.0.0; cto_bundle=07BNRl9yUFNTOVRkeUFaQ0NKOEdHd0xjYWVCRU5kJTJGNWR6YklWcWZIdWJYUFZRWFFFVDlIQmVGdVpJSlloRlN3djBHZGhLc3NDb3IlMkJiN2N1clg4YkhFT1pOR2I2M2d4b1pjamFWOXlrJTJGOHN4amtMM1BrbjJkSGRPRjhaVU4lMkJTUWpRJTJGUUtlTGZ6UkJtaXZGaHdYJTJGd3Q1cERMZFB2WThjR2ZQOVVQMkNqRVYlMkI1a2w3YyUzRA; __gads=ID=3ca6ff747c84e8ac:T=1721308747:RT=1723698756:S=ALNI_MbyRHblJgxmAdWfr807mkxf8OcTgA; __gpi=UID=00000e98cc92728e:T=1721308747:RT=1723698756:S=ALNI_MaC2-ofOYBrEKXMxGjEEklTSQbWwQ; __eoi=ID=96f688cc0bc1a03d:T=1721308747:RT=1723698756:S=AA-AfjZY7aWKKINbxCTbPrbxADHl; __qca=I0-1258295172-1723698674159; FCNEC=%5B%5B%22AKsRol-sM0w_KqvAa-bnKtv1MuXa9VQp8-8m90Td5J91spk5bR-m3iD1NWnbHNBtx1D7MKMqJ_AlpshNAi9HwQuaYhF9mlKVidOVBotI0QAd_Y9a7CVdM_mxSeuTJMvnifUfvX8iswHkm3kfdsvRRjSqkur4nulSLw%3D%3D%22%5D%5D; _ga_6R52Y0NSMR=GS1.1.1723698669.6.1.1723699000.0.0.0; XSRF-TOKEN=eyJpdiI6IjdUSDNJM2R5dWc3d0hFNE91Z3lXNkE9PSIsInZhbHVlIjoiTHVPNlJjUjVpVzNvQlFtUmNFWEZvZjQyU0pSbmFiZko1RWUyQmRZTzlYWlUxV0VmSGkybWxIMUNtOWNNWkYvTzVpSHdYamRROTZhVW9KbjhzQ2dYK1lLblhXaWk1blkzT0JLdGk1SGpqWThkZ2tzSEhPWDFZV21Qd1pLWGovUE8iLCJtYWMiOiI5NWQzZTU1OTA0NDEyNmIxY2M2ZDdmNDBhMTUzN2E1YTZhNzI0ZGU1ODE4NzI0YjRiMDNhNmNlNDdiMGQwMTU2IiwidGFnIjoiIn0%3D; gmailnator_session=eyJpdiI6IlVuRndwanlsWWhJNUZKdGtWMnovVWc9PSIsInZhbHVlIjoiL1pQUGtnTkl5NmR6NVNIOE9CQ2gyalB2R1FSNWxyY1RTakFwNkc1M0o1U0xWNk1pK3ZzZlB6b1A4SmV3ZTVhUE43c05tbXRZcXNRVnNhU0NJOHV4WEZiZzFCQmJIRmJienZLeWlWRlBOdzBTQXFNbWlYTFlrN2lDWmRJZWZKK2MiLCJtYWMiOiJkNWUwYmMxYTJiNmM3YzcyY2ViYjhlMmFiNzZmYzJkZjY3N2RlY2UzYWJhNmFlZjQ5ZjhkNDY3NTk5YmNiOTFiIiwidGFnIjoiIn0%3D",
        "origin": "https://www.emailnator.com",
        "referer": "https://www.emailnator.com/",
        "sec-ch-ua": '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token": "eyJpdiI6IjdUSDNJM2R5dWc3d0hFNE91Z3lXNkE9PSIsInZhbHVlIjoiTHVPNlJjUjVpVzNvQlFtUmNFWEZvZjQyU0pSbmFiZko1RWUyQmRZTzlYWlUxV0VmSGkybWxIMUNtOWNNWkYvTzVpSHdYamRROTZhVW9KbjhzQ2dYK1lLblhXaWk1blkzT0JLdGk1SGpqWThkZ2tzSEhPWDFZV21Qd1pLWGovUE8iLCJtYWMiOiI5NWQzZTU1OTA0NDEyNmIxY2M2ZDdmNDBhMTUzN2E1YTZhNzI0ZGU1ODE4NzI0YjRiMDNhNmNlNDdiMGQwMTU2IiwidGFnIjoiIn0="
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
        "cookie": "_ga=GA1.1.309278770.1721308694; perf_dv6Tr4n=1; _ga_R24V0HY4VV=GS1.1.1723626335.1.1.1723626503.0.0.0; cto_bundle=07BNRl9yUFNTOVRkeUFaQ0NKOEdHd0xjYWVCRU5kJTJGNWR6YklWcWZIdWJYUFZRWFFFVDlIQmVGdVpJSlloRlN3djBHZGhLc3NDb3IlMkJiN2N1clg4YkhFT1pOR2I2M2d4b1pjamFWOXlrJTJGOHN4amtMM1BrbjJkSGRPRjhaVU4lMkJTUWpRJTJGUUtlTGZ6UkJtaXZGaHdYJTJGd3Q1cERMZFB2WThjR2ZQOVVQMkNqRVYlMkI1a2w3YyUzRA; __gads=ID=3ca6ff747c84e8ac:T=1721308747:RT=1723698756:S=ALNI_MbyRHblJgxmAdWfr807mkxf8OcTgA; __gpi=UID=00000e98cc92728e:T=1721308747:RT=1723698756:S=ALNI_MaC2-ofOYBrEKXMxGjEEklTSQbWwQ; __eoi=ID=96f688cc0bc1a03d:T=1721308747:RT=1723698756:S=AA-AfjZY7aWKKINbxCTbPrbxADHl; __qca=I0-1258295172-1723698674159; FCNEC=%5B%5B%22AKsRol-sM0w_KqvAa-bnKtv1MuXa9VQp8-8m90Td5J91spk5bR-m3iD1NWnbHNBtx1D7MKMqJ_AlpshNAi9HwQuaYhF9mlKVidOVBotI0QAd_Y9a7CVdM_mxSeuTJMvnifUfvX8iswHkm3kfdsvRRjSqkur4nulSLw%3D%3D%22%5D%5D; XSRF-TOKEN=eyJpdiI6Im9rS3U5YWpiV1dLYm9XeGpmLzUzRWc9PSIsInZhbHVlIjoiZVFxWFFWNC9iMjVNOUkrcVNIWHljbmd6QTVnWUVKZWdXakF0djhxbzdGU3o3NUFFUVlKRkx0ZDY1R1FIaEpjYmJLSHFueERpQityeWllYjBhWG4wQVJhSEM3YzFZQm8vbTI3NzdqSUpNYWs1UGM4TEMvc0lTRHVUdU5qNnFQQXIiLCJtYWMiOiIxMDQyMTE5NWMwNDM4OTA0NzU0YmRmZTg5YTVkOGE5MWNkYmYzYTIxYzI2M2YwYTE4ODFiNzJiNjMwYjE0YzI4IiwidGFnIjoiIn0%3D; gmailnator_session=eyJpdiI6Im45amJySFNQZnY3YVQ0dE1mckJWeUE9PSIsInZhbHVlIjoiTFZ3eWNMYTZndTBsODc2b2Y4eEpXN1hGYjhGTUd6R3R4RTlNQmp1OW0wRzZKY3dLODc0YmFtdkk0di9oeXlIdXBmQ2k3a2lvZWRtUkI3d3JsNEkrcFB5eEtZcmVkMkw3NjUxNm9vKzhhYzhUd011Y3dVaXdHeUN0LzJhOGZWUGYiLCJtYWMiOiI1YWJmODM1ZTFkNGE5ZTZlNzI4YTA2MjE5ZGViODI4NzZmMmQyYjg2M2UwOTk5MWZkNjdlMzQwMzVmZGU4YjdhIiwidGFnIjoiIn0%3D; _ga_6R52Y0NSMR=GS1.1.1723698669.6.1.1723698704.0.0.0",
        "origin": "https://www.emailnator.com",
        "referer": "https://www.emailnator.com/inbox/",
        "sec-ch-ua": '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token": "eyJpdiI6Im9rS3U5YWpiV1dLYm9XeGpmLzUzRWc9PSIsInZhbHVlIjoiZVFxWFFWNC9iMjVNOUkrcVNIWHljbmd6QTVnWUVKZWdXakF0djhxbzdGU3o3NUFFUVlKRkx0ZDY1R1FIaEpjYmJLSHFueERpQityeWllYjBhWG4wQVJhSEM3YzFZQm8vbTI3NzdqSUpNYWs1UGM4TEMvc0lTRHVUdU5qNnFQQXIiLCJtYWMiOiIxMDQyMTE5NWMwNDM4OTA0NzU0YmRmZTg5YTVkOGE5MWNkYmYzYTIxYzI2M2YwYTE4ODFiNzJiNjMwYjE0YzI4IiwidGFnIjoiIn0="
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
