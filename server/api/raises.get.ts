const FILTERS = [
    {
        key: 'raise_status',
        symbol: '=',
        value: ['Active'],
    },
    {
        key: 'crowdfunding_type_1',
        symbol: '=',
        value: ['RegCF', 'RegA+'],
    }
]
// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
    try {
        const apiKey = process.env.KINGS_API_KEY;
        const base = process.env.KINGS_API_BASE;

        if (!apiKey || !base) {
            return sendError(event, createError({
                statusCode: 500,
                statusMessage: "Missing KingsCrowd API configuration"
            }))
        }

        const query = getQuery(event);
        const page = query.page ? Number(query.page) : 1;
        const limit = query.limit ? Number(query.limit) : 25;

        const url = new URL("/api/v1/deals", base);

        url.searchParams.set('page', String(page));
        url.searchParams.set('limit', String(limit));
        url.searchParams.set('filters', JSON.stringify(FILTERS));
        url.searchParams.set('order_by', 'start_date')
        url.searchParams.set('sort', 'desc')


        const res = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                Accept: 'application/json',
            },
        })

        if (!res.ok) {
            const errorText = await res.text()
            return sendError(event, createError({
                statusCode: res.status,
                statusMessage: `KingsCrowd API Error: ${errorText}`,
            }))
        }

        const json = await res.json();

        if (!json?.data?.result) {
            return sendError(event, createError({
                statusCode: 500,
                statusMessage: `KingsCrowd API Error: Malformed Response`,
            }))
        }

        return {
            ok: true,
            pagination: {
                count: json.data.count,
                totalCount: json.data.total_count,
                totalPages: json.data.total_pages,
                currentPage: json.data.current_page,
            },
            results: json.data.result,
        }
    } catch (err: any) {
        return sendError(event, createError({
            statusCode: err.statusCode || 500,
            statusMessage: err.statusMessage || err.message || "Server Error"
        }))
    }
})