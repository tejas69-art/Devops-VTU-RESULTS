import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { start_usn, end_usn, index_url } = body;

        // Validate input
        if (!index_url) {
            return NextResponse.json(
                { detail: 'Index URL is required' },
                { status: 400 }
            );
        }

        if (!start_usn || !end_usn) {
            return NextResponse.json(
                { detail: 'Start and End USN are required' },
                { status: 400 }
            );
        }

        // Generate list of USNs to fetch
        const usnList: string[] = [];
        // Generate range
        const start = start_usn.toUpperCase();
        const end = end_usn.toUpperCase();

        // Simple logic: assume only the numeric part at the end changes
        // Regex to separate prefix and number
        const matchStart = start.match(/^([a-zA-Z0-9]+?)(\d+)$/);
        const matchEnd = end.match(/^([a-zA-Z0-9]+?)(\d+)$/);

        if (matchStart && matchEnd && matchStart[1] === matchEnd[1]) {
            const prefix = matchStart[1];
            const startNum = parseInt(matchStart[2], 10);
            const endNum = parseInt(matchEnd[2], 10);
            const numLength = matchStart[2].length;

            for (let i = startNum; i <= endNum; i++) {
                // Start simple pad with existing length
                const paddedNum = i.toString().padStart(numLength, '0');
                usnList.push(`${prefix}${paddedNum}`);
            }
        } else {
            // Fallback if patterns don't match or complex stuff, just push start and end
            // Ideally we should return error, but for safety let's just try explicitly provided ones if regex fails
            usnList.push(start);
            if (start !== end) usnList.push(end);
            console.warn('Could not auto-generate range, using only start and end');
        }

        // Limit range to avoid abuse
        if (usnList.length > 50) {
            return NextResponse.json(
                { detail: 'Range too large. Please request max 50 records at a time.' },
                { status: 400 }
            );
        }

        // Get backend API URL from environment variable
        const backendUrl = process.env.VTU_API_BASE_URL || 'vturesult.in';
        const apiEndpoint = `${backendUrl}/single-post`;

        // Fetch results concurrently
        const results: Record<string, any> = {};

        // Use Promise.all to fetch in parallel
        await Promise.all(usnList.map(async (currentUsn) => {
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        index_url: index_url,
                        usn: currentUsn
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    // normalize data structure
                    // The backend might return { "1AM...": "<html>" } or { html: "..." }
                    let html = '';
                    if (data[currentUsn]) html = data[currentUsn];
                    else if (data.html) html = data.html;
                    else if (typeof data === 'string') html = data;

                    if (html) {
                        results[currentUsn] = html;
                    }
                }
            } catch (err) {
                console.error(`Failed to fetch for ${currentUsn}`, err);
            }
        }));

        return NextResponse.json(results);

    } catch (error: any) {
        console.error('Error fetching VTU results:', error);
        return NextResponse.json(
            { detail: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
