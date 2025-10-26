class StorageManager {
    static save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) { console.error("Gagal menyimpan ke localStorage", e); }
    }

    static load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Gagal memuat dari localStorage", e);
            return null;
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }
}

export default StorageManager;