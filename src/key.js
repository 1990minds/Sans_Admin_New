const  keyUri = { 
    
    // BACKEND_URI:'https://jellyfish-app-5ugh3.ondigitalocean.app/api'
    
    
    BACKEND_URI:'http://localhost:5000/api'
}

let token = localStorage.getItem('token')
const config = {
    headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    }
    };

  

export  {keyUri, config } 