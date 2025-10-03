export const getBookStateClass = (state: string) => {
    switch (state) {
        case 'Dostępna':
            return 'available'
        case 'Wypożyczona':
            return 'rented'
        case 'Zarezerwowana':
            return 'reserved'
        case 'Do odbioru':
            return 'for-collection'
        default:
            return ''
    }
}