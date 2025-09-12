// Función para inicializar productos por defecto si no existen
function initializeDefaultProducts() {
    const PROD_KEY = "APP_PRODS";
    let existingProds = [];
    try {
        existingProds = JSON.parse(localStorage.getItem(PROD_KEY)) || [];
    } catch {
        existingProds = [];
    }

    // Si ya hay productos, no inicializar
    if (existingProds.length > 0) return;

    // Productos predeterminados
    const defaultProducts = [
        {
            id: 1001,
            nombre: "Monstera Deliciosa",
            precio: 24990,
            stock: 10,
            img: "images/monstera2.jpg",
            descripcion: "Planta tropical de hojas perforadas"
        },
        {
            id: 1002,
            nombre: "Sansevieria Trifasciata",
            precio: 15725,
            stock: 15,
            img: "images/sansevieria-trifasciata.jpg",
            descripcion: "Lengua de tigre - Purificadora de aire"
        },
        {
            id: 1003,
            nombre: "Poto Dorado",
            precio: 13590,
            stock: 5,
            img: "images/Poto-dorado.jpg",
            descripcion: "Planta colgante de fácil cuidado"
        },
        {
            id: 1004,
            nombre: "Alocasia Polly",
            precio: 32500,
            stock: 8,
            img: "images/alocasia-polly.jpg",
            descripcion: "Planta ornamental de hojas grandes"
        },
        {
            id: 1005,
            nombre: "Schlumbergera Truncata",
            precio: 21990,
            stock: 0,
            img: "images/schlumbergera-truncata.jpg",
            descripcion: "Una planta muy apreciada por su belleza"
        }
    ];

    // Guardar productos predeterminados
    localStorage.setItem(PROD_KEY, JSON.stringify(defaultProducts));
}