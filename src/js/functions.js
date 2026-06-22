"use strict";

/**
 * @fileoverview Funciones para obtener datos remotos de productos y categorías.
 * @module src/js/functions
 */

/**
 * Resultado genérico de una petición fetch dentro de este módulo.
 * @typedef {Object} FetchResult
 * @property {boolean} success - Indica si la petición fue exitosa.
 * @property {any} body - Datos devueltos en caso de éxito o información del error.
 * @property {string} [error] - Mensaje de error cuando la petición falla.
 */

/**
 * Obtiene un listado de productos desde una URL JSON.
 * @param {string} url - URL del recurso JSON.
 * @returns {Promise<FetchResult>} Resultado con los datos JSON parseados o el error.
 */
let fetchProducts = (url) => {

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            } else {
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

/**
 * Obtiene categorías desde una URL XML y devuelve un documento XML parseado.
 * @param {string} url - URL del recurso XML.
 * @returns {Promise<FetchResult>} Resultado con un Document XML en caso exitoso o el error.
 */
let fetchCategories = async (url) => {  

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const text = await response.text()

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

    };
};

export { fetchProducts, fetchCategories };