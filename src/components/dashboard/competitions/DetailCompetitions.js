import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailCompetitions() {
    const [data, setData] = useState(null);
    const { id } = useParams();

    const token2 = '818f3287afd55fdcbc86d21cc55e068b62cffa18';
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://mmonteiro.pythonanywhere.com/api/competitions/${id}/`, {
                headers: {
                    'Authorization': `Token ${token2}`
                }
            });

            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {data ? (
                <div>
                    <h1>{data.data}</h1>
                    <p>{data.code}</p>
                    <p>{data.name}</p>
                    <p>{data.organizing_country}</p>
                    <p>{data.site_code}</p>

                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default DetailCompetitions;
