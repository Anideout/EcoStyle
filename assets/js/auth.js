// localStorage = API del navegador para guardar datos localmente
// capa de autenticación
const LS_KEYS = {
    USERS: 'APP_USERS',
    CURRENT_USER: 'APP_CURRENT_USER'
};

// expresión regular para validar dominios permitidos
const ALLOWED_DOMAINS_RE = /@(?:duocuc\.cl|duoc\.cl|gmail\.com)$/i;

// configuración: si se registra, loguea automáticamente
const AUTO_LOGIN_AFTER_REGISTER = true;

// si no hay usuarios en el localStorage, crear unos por defecto
function seedUsersIfEmpty() {
    if (!localStorage.getItem(LS_KEYS.USERS)) {
        const seed = [
            { name: 'Admin', email: 'admin@gmail.com', pass: '1234', role: 'admin' },
            { name: 'Usuario', email: 'user@gmail.com', pass: '1234', role: 'user' }
        ];
        localStorage.setItem(LS_KEYS.USERS, JSON.stringify(seed));
    }
}

// obtener lista de usuarios
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(LS_KEYS.USERS)) || [];
    } catch {
        return [];
    }
}

// guardar usuarios
function saveUsers(users) {
    localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
}

// validar dominio del email
function emailDomainOk(email) {
    return ALLOWED_DOMAINS_RE.test((email || '').trim());
}

// buscar usuario por email
function findUserByEmail(email) {
    return getUsers().find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || null;
}

// guardar usuario actual en sesión
function setSession(user) {
    localStorage.setItem(LS_KEYS.CURRENT_USER, JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role
    }));
}

// registrar un nuevo usuario
function registerUser({ name, email, pass }) {
    if (!name?.trim() || !email?.trim() || !pass?.trim()) {
        return { ok: false, code: 'missing_fields', message: 'Todos los campos son obligatorios' };
    }

    if (!emailDomainOk(email)) {
        return { ok: false, code: 'bad_domain', message: 'El correo no es válido, usa duocuc.cl, duoc.cl o gmail.com' };
    }

    if (findUserByEmail(email)) {
        return { ok: false, code: 'already_exists', message: 'El correo ya existe.' };
    }

    const users = getUsers();
    const newUser = { name: name.trim(), email: email.trim(), pass: pass.trim(), role: 'user' };
    users.push(newUser);
    saveUsers(users);

    if (AUTO_LOGIN_AFTER_REGISTER) {
        setSession(newUser);
        const dest = 'index.html';
        return { ok: true, code: 'registered_and_logged', message: 'Usuario registrado y logueado correctamente', dest };
    }

    return { ok: true, code: 'registered', user: newUser };
}

// loguear usuario
function loginUser(email, pass) {
    if (!email?.trim() || !pass?.trim()) {
        return { ok: false, code: 'missing_fields', message: 'Correo y contraseña son obligatorios' };
    }

    if (!emailDomainOk(email)) {
        return { ok: false, code: 'bad_domain', message: 'Dominio no válido' };
    }

    const user = findUserByEmail(email);
    if (!user) {
        return { ok: false, code: 'not_found', message: 'Este correo no está registrado.' };
    }

    if (user.pass !== pass) {
        return { ok: false, code: 'bad_credentials', message: 'Usuario o contraseña no válidos.' };
    }

    setSession(user);
    const dest = 'index.html';
    return { ok: true, code: 'logged_in', user, dest };
}

// obtener usuario actual
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(LS_KEYS.CURRENT_USER)) || null;
    } catch {
        return null;
    }
}

// cerrar sesión
function logout() {
    localStorage.removeItem(LS_KEYS.CURRENT_USER);
}

// inicializamos con usuarios por defecto
seedUsersIfEmpty();

// exponemos funciones correctamente
window.AuthStore = {
    LS_KEYS,
    registerUser,
    loginUser,
    getCurrentUser,
    logout
};
