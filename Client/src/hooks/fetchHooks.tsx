import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/EndPointAPI";
// import { getUsername } from '../helper/helper'

axios.defaults.baseURL = "http://localhost:2000";


/** custom hook */
export  function useFetch(query:any){
    const [getData, setData]  = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {
        if(!query) return;
        const fetchData = async () => {
            try {
                setData((prev:any) => ({ ...prev, isLoading: true}));

                // const { username } = !query ? await getUsername() : '';
                
                const { data, status }:any =  await axios.get(`/api/users/${query}`);

                getUsername()

                if(status === 200){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                

                    // setData(prev => ({ ...prev }))
                    
                

                    
                }

                setData((prev:any) => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData((prev:any) => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}