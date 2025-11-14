export interface FiatInfo {
    name: string
    sign: string
    symbol: string
}

export interface MoneyField {
    raw: string
    usd: string
    formatted: string
    fiat: FiatInfo
}

export interface Industry {
    id: number
    name: string
    slug: string | null
    parent_category_id: number | null
}

export interface CompanyRef {
    id: number
    name: string
}

export interface StateRef {
    id: number
    name: string
}

export interface PlatformRef {
    id: number
    name: string
}

export interface RaiseStatus {
    id: number
    name: string
    slug: string
    parent_category_id: number | null
}

export interface CrowdfundingType {
    id: number
    name: string
    slug: string
    parent_category_id: number | null
}

export interface SecurityType {
    id: number
    name: string
    slug: string | null
    parent_category_id: number | null
}

export interface Raise {
    id: number
    name: string
    funding_gather_money_raised_to_date: MoneyField
    funding_gather_number_of_investors: number
    funding_gather_last_week_investment: MoneyField
    company_details_at_round_industry: Industry | null
    tagline: string
    description: string
    website: string | null
    company_id: CompanyRef
    state: StateRef | null
    platform_id: PlatformRef
    raise_status: RaiseStatus
    start_date: string
    close_date: string
    minimum_investment_amount: MoneyField
    crowdfunding_type_1: CrowdfundingType | null
    crowdfunding_type_2: CrowdfundingType | null
    raise_url: string
    valuation: MoneyField | null
    wordpress_url: string | null
    security_type: SecurityType | null
    security_type_2: SecurityType | null
    price_per_share: MoneyField | null
}

export interface Pagination {
    count: number
    totalCount: number
    totalPages: number
    currentPage: number
}

export interface RaisesResponse {
    ok: boolean
    pagination: Pagination
    results: Raise[]
}
