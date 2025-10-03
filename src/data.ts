import type { BooksProps } from "./types/types";

export const books: BooksProps[] = [
    {
        id: 1,
        title: 'Pan Tadeusz',
        author: 'Adam Mickiewicz',
        state: 'Dostępna',
    },
    {
        id: 2,
        title: 'Wiedźmin: Ostatnie Życzenie',
        author: 'Andrzej Sapkowski',
        state: 'Wypożyczona',
    },
    {
        id: 3,
        title: 'Solaris',
        author: 'Stanisław Lem',
        state: 'Zarezerwowana',
    },
    {
        id: 4,
        title: 'Lalka',
        author: 'Bolesław Prus',
        state: 'Do odbioru',
    },
]