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

let fetchCategories = async (url) => {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        let text = await response.text()

        const parser = new DOMParser();
        const data = parser.parseFromString(text, "application/xml");

        return {
            success: true,
            body: data
        };

    } catch (error) {

        return {
            success: false,
            body: error.message
        };

    }
}

export{fetchProducts, fetchCategories};