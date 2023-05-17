export function getStartIndexPagination(page: number, elementsPerPage: number): number {
    return (page - 1) * elementsPerPage;
}
