import {useFetch} from "nuxt/app";
import {computed, ComputedRef, Ref, ref} from "vue";
import {Pagination, Raise, RaisesResponse} from "../types/raises";


export interface UseRaises {
    page: Ref<number>
    limit: Ref<number>
    rows: ComputedRef<Raise[]>
    pagination: ComputedRef<Pagination | null>
    pending: Ref<boolean>
    error: Ref<unknown>
    nextPage: () => void
    prevPage: () => void
    refresh: () => void
}

export function useRaises(): UseRaises {
    const page = ref(1);
    const limit = ref(25);

    const {data, pending, error, refresh} = useFetch<RaisesResponse>('/api/raises', {
        query: {page, limit},
        watch: [page, limit],
        default: () => ({
            ok: false,
            pagination: {
                count: 0,
                totalCount: 0,
                totalPages: 1,
                currentPage: 1
            },
            results: []
        })
    })

    const rows = computed(() => data.value?.results ?? [])
    const pagination = computed(() => data.value?.pagination ?? null)
    const canGoNext = computed(() => pagination.value && pagination.value.currentPage < pagination.value.totalPages)

    const canGoPrev = computed(() => page.value > 1)

    const nextPage = () => {
        if (canGoNext) page.value++;
    }

    const prevPage = () => {
        if (canGoPrev) page.value--;
    }

    return {
        page,
        limit,
        rows,
        pagination,
        pending,
        error,
        nextPage,
        prevPage,
        refresh
    }
}