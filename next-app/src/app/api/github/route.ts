import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'ashif-ek';
    const year = searchParams.get('year');

    const url = year 
        ? `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`
        : `https://github.com/users/${username}/contributions`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            next: { revalidate: 3600 }
        });
        const html = await response.text();

        const data = [];
        
        // Find all days
        const dayRegex = /<td[^>]+data-date="([^"]+)"[^>]+id="([^"]+)"[^>]+data-level="([^"]+)"[^>]*>/g;
        // Tooltips contain the count
        const tooltipRegex = /<tool-tip[^>]+for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;

        const tooltips: Record<string, string> = {};
        let tooltipMatch;
        while ((tooltipMatch = tooltipRegex.exec(html)) !== null) {
            tooltips[tooltipMatch[1]] = tooltipMatch[2].trim();
        }

        let dayMatch;
        let totalCount = 0;

        while ((dayMatch = dayRegex.exec(html)) !== null) {
            const date = dayMatch[1];
            const id = dayMatch[2];
            const level = parseInt(dayMatch[3], 10);
            
            const tooltipText = tooltips[id] || '';
            const countMatch = tooltipText.match(/^(\d+|No) contribution/);
            let count = 0;
            if (countMatch) {
                count = countMatch[1] === 'No' ? 0 : parseInt(countMatch[1], 10);
            }
            
            totalCount += count;
            
            data.push({
                date,
                count,
                level
            });
        }

        // Sometimes the HTML might include an explicit total count string like "1,234 contributions in 2026"
        const explicitTotalMatch = html.match(/(\d{1,3}(?:,\d{3})*)\s+contributions\s+in\s+\d{4}/);
        if (explicitTotalMatch) {
            totalCount = parseInt(explicitTotalMatch[1].replace(/,/g, ''), 10);
        }

        return NextResponse.json({ totalCount, contributions: data });
    } catch (error) {
        console.error("Error fetching github data:", error);
        return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
    }
}
