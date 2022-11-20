import './App.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


function App() {

  const [search, setSearch] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios 
        .get(`https://api.coinstats.app/public/v1/coins?skip=0&limit=20&currency=USD`)
        .then((res) => {
          console.log(res.data);
          setCrypto(res.data.coins);
          setLoadingData(false);
      });
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, [loadingData]);



return (
  
  
  <div className="App">
  

    <header data-theme="dark" className="hero">
      <hgroup className="headings">
          <h2>Crypto Tracker</h2>
          <h3>Latest Crypto Data</h3>
      </hgroup>
      
      
      
      
      <label htmlFor="search" style={{maxWidth:"70%"}}>
          <input type="search" 
            id="search" 
            name="search" 
            placeholder="Search for a Crypto"
            onChange={(e) => {
              setSearch(e.target.value);
            }} 
            />
        </label>  
    </header>
  
  

  <main>
      <article className="container">
  

      {loadingData ? (
        <div aria-busy="true">Loading Please Wait...</div>
      ) : (

      <table row="grid">
      
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Symbol</th>
              <th scope="col">Market Cap</th>
              <th scope="col">Price</th>
              <th scope="col">Available Supply</th>
            </tr>
          </thead>
        

        
        <tbody>
          {crypto.filter((val) => {
            return val.name.toLowerCase().includes(search.toLowerCase());
          }).map((val, key) => {
            return (
              <tr key={key}>
                <th className="rank" scope="row">{val.rank}</th>
                <td className='logo'>
                  <a href={val.websiteUrl}>
                    <img src={val.icon} alt="logo" width="30px" />
                  </a>
                  <p>{val.name}</p>
                </td>
                <td className="symbol">{val.symbol}</td>
                <td>{val.marketCap}</td>
                <td>{val.price.toFixed(2)}</td>
                <td>{val.availableSupply}</td>
              </tr>
            );
          
          })}
      </tbody>
      
      
    </table>
    
    )}

    <footer>Cryptochecker.com</footer>
    </article>
    
    </main>
    
  </div>
  );
}

export default App;
