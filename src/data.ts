import { BookState, type BooksProps } from "./types/types";

export const books: BooksProps[] = [
    {
        id: '1',
        title: 'Pan Tadeusz',
        author: 'Adam Mickiewicz',
        state: BookState.Dostępna,
    },
    {
        id: '2',
        title: 'Wiedźmin: Ostatnie Życzenie',
        author: 'Andrzej Sapkowski',
        state: BookState.Wypożyczona,
    },
    {
        id: '3',
        title: 'Solaris',
        author: 'Stanisław Lem',
        state: BookState.Zarezerwowana,
    },
    {
        id: '4',
        title: 'Lalka',
        author: 'Bolesław Prus',
        state: BookState.DoOdbioru,
    },
]