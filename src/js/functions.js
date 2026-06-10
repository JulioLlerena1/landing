"use strict";

let fetchProducts = (url) => {

    return fetch(url)
        .then(response => {
           if (!response.ok) {
               throw new Error(`Error HTTP: ${response.status}`);
           }else {
               return response.json();
           }
        })
        .then(data => {

            return { success: true, body: data };

        })
        .catch(error => {

            return { success: false, error: error.message };

        });
};

export { fetchProducts };