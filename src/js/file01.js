"use strict";

/**
 * @fileoverview Renderiza productos, categorías y controla comportamientos UI.
 * @module src/js/file01
 */

import { fetchProducts, fetchCategories } from "./functions";

/**
 * @typedef {Object} Product
 * @property {string} title - Título del producto.
 * @property {string} imgUrl - URL de la imagen del producto.
 * @property {string|number} price - Precio del producto.
 * @property {string} productURL - Enlace al producto.
 * @property {string|number} category_id - Identificador de la categoría.
 */

/**
 * Carga y renderiza los primeros nueve productos en el contenedor de la página.
 * @returns {void}
 */
const renderProducts = () => {

    fetchProducts("https://data-dawm.github.io/datum/reseller/products.json")
        .then(result => {

            if (result.success) {

                const container = document.getElementById("products-container");
                container.innerHTML = "";
                const products = result.body.slice(0, 9);
                products.forEach(product => {
                    let productHTML =
                        `<div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                        <img
                            class="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
                            src="[PRODUCT.IMGURL]" alt="[PRODUCT.TITLE]">
                        <h3
                            class="h-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-black-600 dark:hover:text-white-400">
                            $[PRODUCT.PRICE]
                        </h3>

                        <div class="h-5 rounded w-full">[PRODUCT.TITLE]</div>
                            <div class="space-y-2">
                                <a href="[PRODUCT.PRODUCTURL]" target="_blank" rel="noopener noreferrer"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block">
                                    Ver en Amazon
                                </a>
                                <div class="hidden"><span class="1">[PRODUCT.CATEGORY_ID]</span></div>
                            </div>
                        </div>
                    </div>`;

                    productHTML = productHTML.replaceAll("[PRODUCT.TITLE]", product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title);
                    productHTML = productHTML.replaceAll("[PRODUCT.IMGURL]", product.imgUrl);
                    productHTML = productHTML.replaceAll("[PRODUCT.PRICE]", product.price);
                    productHTML = productHTML.replaceAll("[PRODUCT.PRODUCTURL]", product.productURL);
                    productHTML = productHTML.replaceAll("[PRODUCT.CATEGORY_ID]", product.category_id);

                    container.innerHTML += productHTML;

                });
            };

        });
};

/**
 * Carga y renderiza las categorías dentro del elemento select de la página.
 * @returns {Promise<void>} Promise que se resuelve cuando finaliza el renderizado de las categorías.
 */
const renderCategories = async () => {

    try {

        let result = await fetchCategories('https://data-dawm.github.io/datum/reseller/categories.xml');

        if (result.success) {

            const container = document.getElementById("categories");
            container.innerHTML = `<option selected disabled>Seleccione una categoría</option>`;
            const categoriesXML = result.body.getElementsByTagName("category");

            for (let category of categoriesXML) {

                let categoryHTML = `<option value="[ID]">[NAME]</option>`;
                categoryHTML = categoryHTML.replaceAll("[ID]", category.getElementsByTagName("id")[0].textContent);
                categoryHTML = categoryHTML.replaceAll("[NAME]", category.getElementsByTagName("name")[0].textContent);
                container.innerHTML += categoryHTML;

            }

        }

    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
};

/**
 * Muestra el toast interactivo si el elemento existe en el DOM.
 * @returns {void}
 */
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};

/**
 * Añade el evento para abrir el video de demostración en una nueva pestaña.
 * @returns {void}
 */
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};


(() => {
    showVideo();
    showToast();
    renderProducts();
    renderCategories();
})();
