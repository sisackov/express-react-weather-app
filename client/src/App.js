import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [data, setData] = useState(null);
    const [query, setQuery] = useState('Jerusalem'); //initially

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    'http://127.0.0.1:3001/weather?address=' + query
                );
                console.log('res', res);
                setData(res.data);
            } catch (err) {
                console.log('err: ', err);
            }
        };

        fetchData();
    }, [query]);

    const renderPage = () => {
        if (!data) return <div>Loading...</div>;
        return (
            <div>
                <div>Location: {data.location}</div>
                <div>Forecast: {data.forecast}</div>
            </div>
        );
    };

    const handleInputKey = (e) => {
        if (e.key === 'Enter') {
            setQuery(e.target.value);
        }
    };

    return (
        <div className='App'>
            <h1>Weather App</h1>
            <input
                type='text'
                placeholder='Address'
                onKeyPress={handleInputKey}
            />
            {renderPage()}
        </div>
    );
}

export default App;
