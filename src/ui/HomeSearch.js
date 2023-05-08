import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../res/mushroom.jpeg'

const HomeSearch = () => {
    const [query, setQuery] = useState('');

    let navigate = useNavigate();

    const handleSubmit = () => {
        if (query === '') return
        navigate('/search', { state: { query: query } })
    }

    return <div className='flex flex-col h-2/3 mb-2 justify-center'>
        
        <div className="flex justify-center blur-sm">
            <img className="bg-opacity-25" src={logo} width="250"/>
        </div>

        <h1 className='flex justify-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 py-6'>
            Search Engine
        </h1>
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
}

export default HomeSearch;