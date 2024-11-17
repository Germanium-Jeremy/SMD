import React, {useState, useEffect} from 'react'

const apiUrl = import.meta.env.VITE_APP_SERVER_URL;

const DashBoard = () => {
     const [feeds, setFeeds] = useState([]);
     console.log(apiUrl)

  // Simulated Fetch Function
     const fetchFeeds = async () => {
          try {
               const response = await fetch('http://localhost:5000/api/feeds');
               const data = await response.json();
               setFeeds(data);
          } catch (error) {
               console.error('Error fetching feeds:', error);
          }
     };

     useEffect(() => {
          fetchFeeds();
     }, []);
     return (
          <div className="app">
               <h1>Social Media Dashboard</h1>
               <div className="feeds">
                    {feeds.length > 0 ? (
                         feeds.map((feed, index) => (
                              <div key={index} className="feed">
                                   <h3>{feed.platform}</h3>
                                   <p>{feed.content}</p>
                              </div>
                         ))
                    ) : (
                         <p>Loading feeds...</p>
                    )}
               </div>
          </div>
     )
}

export default DashBoard