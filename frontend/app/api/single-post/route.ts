import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { usn, index_url, token, cookies, captcha_code } = body;

        // Validate input
        if (!usn || !index_url) {
            return NextResponse.json(
                { detail: 'USN and index_url are required' },
                { status: 400 }
            );
        }

        // Get backend API URL from environment variable
        const backendUrl = process.env.VTU_API_BASE_URL || 'http://localhost:8000';
        const apiEndpoint = `${backendUrl}/single-post`;

        const payload: any = {
            index_url: index_url,
            usn: usn.toUpperCase()
        };

        if (token) payload.token = token;
        if (cookies) payload.cookies = cookies;
        if (captcha_code) payload.captcha_code = captcha_code;

        // Make request to Cloud Run backend
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            return NextResponse.json(
                { detail: `Failed to fetch results: ${response.statusText}` },
                { status: response.status }
            );
        }

        // Return the response from backend
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching VTU results:', error);
        return NextResponse.json(
            { detail: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle GET requests (optional, for testing)
export async function GET() {
    return NextResponse.json(
        {
            message: 'VTU Results API',
            usage: 'POST with { "usn": "YOUR_USN", "index_url": "VTU_RESULT_URL" }',
        },
        { status: 200 }
    );
}
