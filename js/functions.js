"use strict";

let fetchProducts = arg => {
    return fetch(arg)
    .then(response => {
        if(response.ok)
            return response.json();
        throw new Error(`Error HTTP: ${response.status}`);
    })
    .then(data => { 
        return {success: true, body: data}
    })
    .catch(error => {return {success: false, body: error.message};
    })

};

export{fetchProducts}