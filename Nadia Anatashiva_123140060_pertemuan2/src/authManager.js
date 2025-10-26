// authManager.js
import StorageManager from './storageManager.js';

class AuthManager {
    constructor() {
        this.currentUserKey = 'currentUser';
        this.usersKey = 'registeredUsers'; // Key baru untuk daftar user
        this.currentUser = StorageManager.load(this.currentUserKey) || null;
        this.registeredUsers = StorageManager.load(this.usersKey) || []; // Array user
    }

    _findUser(username) {
        return this.registeredUsers.find(user => user.username === username);
    }

    _saveUsers() {
        StorageManager.save(this.usersKey, this.registeredUsers);
    }

    register(username, password) {
        if (!username || !password) {
            throw new Error('Username dan Password tidak boleh kosong!');
        }
        if (this._findUser(username)) {
            throw new Error(`Username '${username}' sudah terdaftar. Silakan login.`);
        }

        // Tambahkan user baru
        this.registeredUsers.push({ username, password });
        this._saveUsers();
        return true;
    }

    login(username, password) {
        if (!username || !password) {
            throw new Error('Username dan Password tidak boleh kosong!');
        }

        const user = this._findUser(username);

        if (!user) {
            throw new Error(`Username '${username}' tidak ditemukan. Silakan register.`);
        }
        if (user.password !== password) { // Cek password
            throw new Error('Password salah.');
        }

        // Login berhasil
        this.currentUser = username;
        StorageManager.save(this.currentUserKey, username);
        return true;
    }

    logout() {
        this.currentUser = null;
        StorageManager.remove(this.currentUserKey);
    }

    isLoggedIn() { return !!this.currentUser; }
    getCurrentUser() { return this.currentUser; }
}

export default AuthManager;