//assets/js/layout.js
// Cargar el header y footer en todas las páginas
// Usamos una función autoejecutable para no contaminar el scope global
(function () {
    const CART_KEY = 'APP_CART';
    // Cargar header
    function getCartCount() {
        try {
            //aqui realizamos la suma de las cantidades de los productos en el carrito
            const raw = localStorage.getItem(CART_KEY);
            if (!raw) return 0;
            //retorna 0 si no hay nada en el carrito
            let items = JSON.parse(raw);
            if (!Array.isArray(items)) return 0;
            //si es un array, sumamos las cantidades
            const item = JSON.parse(raw);
            return items.reduce((acc, it) => acc + (Number(it.qty) || 1), 0);
        } catch { return 0; }
    }
    //resaltar el enlace activo de navegacion
    function markActiveNavLink() {

        try {
            //obtenemos el path de la url. tolowercase para evitar problemas con mayusculas
            const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
            //selecciona todos los enlaces de navegacion
            document.querySelectorAll('a.nav-link').forEach(a => {
                //compara href de cada enlace 
                const href = (a.getAttribute('href') || '').toLowerCase();
                if (href == here) a.classList.add('active');
            });
        } catch { }
    }
    //funcion para cargar el header
    function initNavbarLogic() {
        //obtenemos el usuario actual
        const user = (window.AuthStore && window.AuthStore.getCurrentUser && window.AuthStore.getCurrentUser()) || null;
        // Manejamos la visibilidad de elementos según el rol del usuario
        const nameEl = document.getElementById('navUserName');
        const logoutBtn = document.getElementById('logout');
        const adminEls = document.querySelectorAll('.admin-only');
        const cartCountEl = document.getElementById('cartCount');

        if (user) {
            if (nameEl) nameEl.textContent = `${user.name}`;
            // Solo mostramos elementos admin si el usuario es admin
            if (user.role === 'admin') {
                adminEls.forEach(el => el.style.display = 'block');
            } else {
                adminEls.forEach(el => el.style.display = 'none');
            }

            // Configurar el botón de logout
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (window.AuthStore && window.AuthStore.logout) {
                        window.AuthStore.logout();
                    }
                    window.location.href = 'login.html';
                });
            }
        } else {
            if (nameEl) nameEl.textContent = 'Invitado';
            adminEls.forEach(el => el.style.display = 'none');
            // Redirigir a login si no hay usuario
            window.location.href = 'login.html';
        }
        //carrito
        if (cartCountEl) cartCountEl.textContent = String(getCartCount());

        //logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function (e) {
                e.preventDefault();
                if (window.AuthStore && window.AuthStore.logout) {
                    window.AuthStore.logout();
                }
                window.location.href = 'login.html';

            });
        }
        //resaltamos el enlace activo
        markActiveNavLink();


        //Permite refrescar badge desde otras partes: window.dispatchEvent(new Event('cart-updated'));
        window.addEventListener('cart:update', () => {
            const el = document.getElementById('cartCount');
            if (el) el.textContent = String(getCartCount());
        });
    }
    //helper para intentar dos rutas (assets/partials/... y partials/...)

    function LoadWithFallBack($startget, pathA, pathB, after) {
        $startget.load(pathA, function (response, status) {
            if (status == "error") {
                $startget.load(pathB, function (response2, status2) {
                    if (status2 === 'error') {
                        $startget.html('<div class="alert alert-danger m-8">No se pudo cargar el contenido.</div>');
                    } else {
                        after && after();
                    }
                });
            } else {
                after && after();
            }
        });
    }
    //barra de navegación 
    function LoadPartials() {
        const $navTarget = $('#navbar-container');
        const $footerTarget = $('#footer-container');
        //validacion de existencia
        if ($navTarget.length) {
            LoadWithFallBack($navTarget,

                'assets/partials/navbar.html',
                'partials/navbar.html',
                initNavbarLogic
            );
        }
        if ($footerTarget.length) {
            LoadWithFallBack($footerTarget,
                'assets/partials/footer.html',
                'partials/footer.html',
                () => {
                    //valida si navbar está o en carpeta asserts o solamente en partials
                    const yearEl = document.getElementById('año');
                    if (yearEl) yearEl.textContent = new Date().getFullYear();
                }
            );
        }
    }

    window.layout = {
        LoadPartials,
        getCartCount
    };
})();
