import { useLocation, useParams } from "react-router-dom";

const About = () => {
    const location = useLocation();
    // const query = location.state.query;
    // let { query } = useParams();
    return <div className="bg-slate-100 h-screen px-4 overflow-scroll0">
        <h1 className="mb-2 mt-0 text-4xl font-medium leading-tight text-primary">About</h1>
        <p>
            A video demonstration of the web interface is provided in <a className="text-blue-600 hover:underline" href="">link</a>
        </p>
    </div>
    
}

export default About;