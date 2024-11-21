import axios from 'axios';

const API_URL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=your_api_key';

export const fetchBooks = () => async (dispatch) => {
    dispatch({ type: 'FETCH_BOOKS_REQUEST' });
    try {
        const response = await axios.get(API_URL);
        const books = response.data.results.books;
        dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: books });
    } catch (error) {
        dispatch({ type: 'FETCH_BOOKS_FAILURE', payload: error.message });
    }
};

export const sortBooks = (criteria, order) => ({
    type: 'SORT_BOOKS',
    payload: { criteria, order }
});
