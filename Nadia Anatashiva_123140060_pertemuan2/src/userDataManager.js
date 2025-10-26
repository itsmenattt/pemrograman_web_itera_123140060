// userDataManager.js
import StorageManager from './storageManager.js';

class UserDataManager {
    constructor(username) {
        if (!username) throw new Error("Username diperlukan untuk UserDataManager");
        this.userKey = `user_data_${username}`;
        // Hanya simpan displayName dan homeRegion
        this.data = StorageManager.load(this.userKey) || {
            displayName: null,
            homeRegion: null
        };
    }

    _save() {
        StorageManager.save(this.userKey, this.data);
    }

    getDisplayName() { return this.data.displayName; }
    saveDisplayName(name) {
        this.data.displayName = name;
        this._save();
    }

    getHomeRegion() { return this.data.homeRegion; }
    saveHomeRegion(region) {
        this.data.homeRegion = region;
        this._save();
    }
}

export default UserDataManager;