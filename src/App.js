import { useState,useEffect } from "react";

function App() {

  const [asset,setasset] = useState(null);
  
  useEffect(()=>{
    const axios = require('axios').default;
    const NFT_ADDRESS = "0x9F3DD2B9501cf69b5Cb3b0ADEA4d71dD7a17eAE5";
    const options = {
      method: 'GET',
      url: `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${NFT_ADDRESS}&order_direction=desc&offset=0&limit=20&include_orders=false`,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setasset(response.data.assets);
      })
      .catch(function (error) {
        console.error(error);
      });
  },[]);

  return (
    <div>
      <br/>
      <div className="container">
        <div className="row">
          {
            asset != null ?
              asset.map(ast => (
                <div className="col-md-4" key={ast.token_id}>
                  <div className="card" style={{width:'18rem'}}>
                    <img className="card-img-top" src={ast.image_preview_url} alt=""/>
                    <div className="card-body">
                      <h5 className="card-title">Token ID: {ast.token_id}</h5>
                      <p className="card-text">Name: {ast.name}</p>
                      <a className="btn btn-primary" href={ast.permalink} target="_blank">View on OpenSea</a>
                    </div>
                  </div>
                </div>
              ))
            : null  
          }
        </div>
      </div>
    </div>
  );
}

export default App;
