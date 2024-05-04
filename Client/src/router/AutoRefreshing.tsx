import React, {useState, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
export const AutoRefreshing = ({children}:any) => {
  const [shouldRefresh, setShouldRefresh]  = useState(false)
  
  useEffect(()=>{
    const id = setTimeout(()=>{
        setShouldRefresh(true),
        6000 * 3600
    });
    return ()=> clearTimeout(id)
  }, [])
    return (
    <div>
       {shouldRefresh ? (
        <BrowserRouter key={Date.now()}>{children}</BrowserRouter>
      ) : (
        <BrowserRouter>{children}</BrowserRouter>
      )}
    </div>
  )
}

export default AutoRefreshing
