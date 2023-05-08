import React, { useEffect, useRef, useState, memo } from "react";
import { useAPIClient } from '../api/axiosConfig';
import ResultCardView from "../ui/ResultCardView";
import { Link, useLocation } from "react-router-dom";

const Search = () => {
    const location = useLocation();
    const queryFromHome = location.state?.query;

    const queryParams = new URLSearchParams(location.search);
    const queryFromURL = queryParams.get('q');
    const offsetFromURL = queryParams.get('offset');

    const api = useAPIClient();

    const [query, setQuery] = useState('');
    const [results, setResult] = useState({});
    const [activePage, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);

    console.log(query)
    // console.log(results)

    const getQuery = async (query, offset) => {
        if (offset == null) offset = 1

        setQuery(query);
        setPage(offset);
        setIsLoading(true);
        try {
            // const response = await api.post("/api/v1/search", {query: query })
            const response = await api.get(`/api/v1/search?q=${query}&offset=${offset}`)
            console.log(response)
            
            let newUrl = `${window.location.pathname}?q=${query}&offset=${offset}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
            setIsLoading(false);
            if (response.status < 300 && response.status >= 200) {
                setIsSuccess(true);
                setResult(response.data)
            }
            else {
                setIsSuccess(false);
            }
        } 
        catch (error) {
            setIsLoading(false);
            setIsSuccess(false);
            console.log(error)
        }
    }

    useEffect(() => {
        if (queryFromHome == null || queryFromHome == '' || queryFromHome == query) return
        getQuery(queryFromHome, 1)
        
    }, [queryFromHome]);

    useEffect(() => {
        if (queryFromURL == null || queryFromURL == '' || queryFromURL == query) return
        getQuery(queryFromURL, Number(offsetFromURL))
    
    }, [queryFromURL, offsetFromURL]);

    useEffect(() => {
        if (activePage == null || query == null || query == '' ) return
        getQuery(query, activePage)
    }, [activePage])

    const handleSubmit = () => {
        // e.preventDefault();

        if (query === '') return;
        getQuery(query)
    }

    const handleClickTerm = (term) => {
        console.log(term)
        getQuery(term)
    }

    return <div className="max-w-6xl mx-auto p-4">
        {/* <form onSubmit={(e) => handleSubmit(e)}> */}
            <div className='flex mb-2'>
                <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden duration-300">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm bg-white text-gray-700 pr-2"
                        type="text"
                        name="query"
                        placeholder="Search something.."
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                    /> 
                    <button 
                        // type="submit"
                        className={`py-3 px-5 shadow-sm text-base 
                            text-white bg-sky-400 hover:bg-sky-600
                            ${query === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        // as={Link}
                        // to={`/search?q=${encodeURIComponent(query)}`}
                        onClick={handleSubmit}
                    >
                            <span className="block tracking-wide text-sm font-bold">Search</span>
                    </button>
                </div>
                
            </div>
        {/* </form> */}
        <ResultCardView loading={isLoading} isSuccess={isSuccess} results={results} handleClickTerm={handleClickTerm} activePage={activePage} setPage={setPage}/>
    </div>
}

                        // ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        // ${invisible ? 'invisible' : '' }
export default Search;