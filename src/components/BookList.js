import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, sortBooks } from '../redux/actions';

const BooksList = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state);

    const handleSortChange = (criteria, order) => {
        dispatch(sortBooks(criteria, order));
    };

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Books List</h1>
            <div>
                <label>Sort By: </label>
                <select onChange={(e) => handleSortChange(e.target.value, 'asc')}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="publisher">Publisher</option>
                </select>
                <label>Order: </label>
                <select onChange={(e) => handleSortChange('title', e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.primary_isbn13}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BooksList;
