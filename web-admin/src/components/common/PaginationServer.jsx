import React from 'react';

const Pagination = ({ total, currentPage, perPage, onPageChange }) => {
    const pageCount = Math.ceil(total / perPage);
    if (pageCount === 1) return null;

    let pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    pages = pages.slice(currentPage - 3 > 0 ? currentPage - 3 : 0, currentPage + 2 < pageCount ? currentPage + 2 : pageCount)

    const previousPageClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const nextPageClick = () => {
        if (currentPage < pageCount) {
            onPageChange(currentPage + 1)
        }
    }

    return (
        <nav aria-label="Page navigation" className="mt-3 ">
            <ul
                className="pagination pagination-sm justify-content-center mb-0"
                style={{ direction: 'ltr' }}
            >
                <li className="page-item cursor-pointer" onClick={previousPageClick}>
                    <p className="page-link link-secondary" aria-label="Previous">
                        <span aria-hidden="true link-secondary">&laquo;</span>
                        <span className="sr-only link-secondary">قبلی</span>
                    </p>
                </li>
                {pages.map((page) => (
                    <li
                        style={{ zIndex: "0" }}
                        key={page}
                        className={
                            page === currentPage
                                ? 'page-item active'
                                : 'page-item '
                        }
                    >
                        <p
                            className={"page-link link-secondary  cursor-pointer mb-0"}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </p>
                    </li>
                ))}
                <li className="page-item cursor-pointer mb-0" onClick={nextPageClick}>
                    <p className="page-link link-secondary" aria-label="Next" >
                        <span aria-hidden="true link-secondary">&raquo;</span>
                        <span className="sr-only link-secondary">بعدی</span>
                    </p>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;




