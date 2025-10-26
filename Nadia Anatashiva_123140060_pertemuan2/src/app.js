import AuthManager from './authManager.js';
import WeatherManager from './weatherManager.js';
import UIManager from './uiManager.js';
import UserDataManager from './userDataManager.js';

class App {
    constructor() {
        this.auth = new AuthManager();
        this.weather = new WeatherManager();
        this.ui = new UIManager();

        // State Aplikasi
        this.userDataManager = null;
        this.displayName = null;
        this.currentSection = 'homeSection';
        this.lastSearchedCity = null;
        this.lastWeatherData = null;
        this.currentUserLocation = null;

        this.init();
    }

    init() {
        // Auth
        this.ui.registerForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleRegister(); });
        this.ui.loginForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleLogin(); });
        this.ui.switchToLoginLink.addEventListener('click', (e) => { e.preventDefault(); this.ui.showLoginScreen(); });
        this.ui.switchToRegisterLink.addEventListener('click', (e) => { e.preventDefault(); this.ui.showRegisterScreen(); });
        this.ui.logoutButton.addEventListener('click', this.handleLogout);

        // Navbar
        this.ui.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigate(link.dataset.section);
            });
        });

        // Home Section
        this.ui.searchButton.addEventListener('click', this.handleSearchWeather);

        // --- TAMBAHAN BARU: LISTENER EDIT WILAYAH ---
        this.ui.editHomeRegionButton.addEventListener('click', this.handleEditHomeRegion);
        this.ui.saveHomeRegionButton.addEventListener('click', this.handleSaveHomeRegion);
        this.ui.cancelEditButton.addEventListener('click', this.handleCancelHomeRegionEdit);
        // --- AKHIR TAMBAHAN BARU ---


        // --- Inisialisasi Saat Muat ---
        if (this.auth.isLoggedIn()) {
            this.loadUserSession(this.auth.getCurrentUser());
            this.ui.showDashboardScreen();
            this.ui.setActiveSection(this.currentSection);
            this.fetchAndRenderCurrentUserLocationWeather();
        } else {
            this.ui.showLoginScreen();
        }
    }
    
    handleEditHomeRegion = () => {
        const currentRegion = this.userDataManager.getHomeRegion();
        this.ui.showHomeRegionEdit(currentRegion);
    }

    handleCancelHomeRegionEdit = () => {
        this.ui.hideHomeRegionEdit();
    }

    handleSaveHomeRegion = async () => {
        const newRegion = this.ui.homeRegionEditInput.value.trim();
        if (!newRegion) { 
            alert("Nama wilayah tidak boleh kosong."); 
            return;
        }
        
        try {
            // 1. Cek apakah region valid
            const location = await this.weather.geocode(newRegion);
            
            // 2. Simpan region valid ke data user
            this.userDataManager.saveHomeRegion(location.name);

            // 3. Update UI dan fetch cuaca baru
            this.ui.hideHomeRegionEdit();
            this.ui.renderHomeRegion(location.name);
            await this.fetchAndRenderCurrentUserLocationWeather(); // Muat ulang panel kiri dan forecast

        } catch (error) {
            alert(`Gagal menyimpan wilayah: ${error.message}`);
        }
    }

    // --- Manajemen Sesi ---
    loadUserSession(username) {
        this.userDataManager = new UserDataManager(username);
        this.displayName = this.userDataManager.getDisplayName();
        this.ui.renderGreeting(username, this.displayName);
        this.lastSearchedCity = null;
        this.lastWeatherData = null;
        this.currentUserLocation = null;
        this.ui.renderCurrentWeatherError('Silakan cari kota.');
        this.ui.resetForecastDisplay();
    }
    // ... (handleRegister, handleLogin, handleLogout, handleNavigate tetap sama) ...
    handleRegister() {
        this.ui.clearRegisterError();
        const user = this.ui.registerUsernameInput.value;
        const pass = this.ui.registerPasswordInput.value;
        try {
            if (this.auth.register(user, pass)) {
                alert('Registrasi berhasil! Silakan login.');
                this.ui.showLoginScreen();
                this.ui.registerUsernameInput.value = '';
                this.ui.registerPasswordInput.value = '';
            }
        } catch (error) {
            this.ui.showRegisterError(error.message);
        }
    }

    handleLogin() {
        this.ui.clearLoginError();
        const user = this.ui.loginUsernameInput.value;
        const pass = this.ui.loginPasswordInput.value;
        try {
            if (this.auth.login(user, pass)) {
                this.loadUserSession(user);
                this.ui.showDashboardScreen();
                this.ui.setActiveSection(this.currentSection);
                this.fetchAndRenderCurrentUserLocationWeather();
                this.ui.loginUsernameInput.value = '';
                this.ui.loginPasswordInput.value = '';
            }
        } catch (error) {
            this.ui.showLoginError(error.message);
        }
    }

    handleLogout = () => {
        this.auth.logout();
        this.userDataManager = null;
        this.displayName = null;
        this.currentSection = 'homeSection';
        this.lastSearchedCity = null;
        this.lastWeatherData = null;
        this.currentUserLocation = null;
        this.ui.showLoginScreen();
    }

    handleNavigate(sectionId) {
        this.currentSection = sectionId;
        this.ui.setActiveSection(sectionId);
        if (sectionId === 'lifeIndexSection') {
            this.calculateAndRenderLifeIndex();
        }
    }

    // --- Logika Cuaca ---
    async fetchAndRenderCurrentUserLocationWeather() {
        try {
            this.ui.renderCurrentLocationError("Mengambil lokasi...");
            this.ui.resetForecastDisplay();

            const coords = await this.weather.getCurrentLocation();
            const cityName = await this.weather.getCityNameFromCoords(coords.latitude, coords.longitude) || "Lokasi Anda";
            this.currentUserLocation = { ...coords, name: cityName }; 

            await this.fetchAndRenderWeatherPanels(coords.latitude, coords.longitude, cityName, true);

        } catch (error) { 
            console.warn("Geolocation failed:", error.message); 
            this.currentUserLocation = null; 

            const homeRegion = this.userDataManager?.getHomeRegion();

            if (homeRegion) {
                this.ui.showFallbackMessage(this.ui.currentLocationWeatherDiv, homeRegion);
                try {
                    const location = await this.weather.geocode(homeRegion);
                    await this.fetchAndRenderWeatherPanels(location.latitude, location.longitude, location.name, true);
                } catch (geocodeError) {
                    console.error(`Error geocoding fallback region ${homeRegion}:`, geocodeError);
                    const fallbackErrorMsg = `Gagal memuat data ${homeRegion}.`;
                    this.ui.renderCurrentLocationError(fallbackErrorMsg);
                    this.ui.renderForecastError(homeRegion, fallbackErrorMsg);
                }
            } else {
                this.ui.renderCurrentLocationError("Gagal akses lokasi & Wilayah belum diatur.");
                this.ui.renderForecastError(null, "Tidak dapat menampilkan perkiraan.");
            }
        }
    }

    async fetchAndRenderWeatherPanels(latitude, longitude, cityName, isCurrentUserPanel) {
        try {
            const currentWeatherDataPromise = this.weather.getWeather(latitude, longitude);
            const forecastDataPromise = this.weather.getForecast(latitude, longitude);

            const currentWeatherData = await currentWeatherDataPromise;
            const forecastData = await forecastDataPromise;

            const description = this.weather.getWeatherDescription(currentWeatherData.current.weather_code);
            const icon = this.weather.getWeatherIcon(currentWeatherData.current.weather_code);
            const renderData = {
                name: cityName,
                icon: icon,
                temperature_2m: currentWeatherData.current.temperature_2m,
                wind_speed_10m: currentWeatherData.current.wind_speed_10m,
                humidity: currentWeatherData.current.relative_humidity_2m,
                feelsLike: currentWeatherData.current.apparent_temperature,
                description: description
            };

            if (isCurrentUserPanel) {
                this.ui.renderCurrentLocationWeather(renderData);
            } else {
                this.ui.renderCurrentWeather(renderData);
                this.lastWeatherData = currentWeatherData.current;
                this.lastSearchedCity = cityName;
            }

            this.ui.renderForecast(cityName, forecastData.daily, this.weather);

             if (this.currentSection === 'lifeIndexSection' && !isCurrentUserPanel) {
                 this.calculateAndRenderLifeIndex();
             }

        } catch (fetchError) {
            console.error(`Error fetching weather data for ${cityName}:`, fetchError);
            const errorMsg = `Gagal memuat data cuaca: ${fetchError.message}`;
            if (isCurrentUserPanel) {
                this.ui.renderCurrentLocationError(errorMsg);
            } else {
                this.ui.renderCurrentWeatherError(errorMsg);
            }
            this.ui.renderForecastError(cityName, 'Gagal memuat perkiraan.');
             if (!isCurrentUserPanel) {
                 this.lastWeatherData = null;
                 this.lastSearchedCity = null;
             }
        }
    }

    handleSearchWeather = async () => {
        this.ui.showSpinner();
        this.ui.renderCurrentWeatherError(''); 

        const city = this.ui.cityInput.value.trim();
        if (!city) {
            this.ui.hideSpinner();
            this.ui.renderCurrentWeatherError("Nama kota tidak boleh kosong.");
            return;
        }

        try {
            const location = await this.weather.geocode(city);
            await this.fetchAndRenderWeatherPanels(location.latitude, location.longitude, location.name, false); 

        } catch (error) {
            console.error("Error searching weather:", error);
            this.ui.renderCurrentWeatherError(error.message);
            this.lastSearchedCity = null;
            this.lastWeatherData = null;
        } finally {
            this.ui.hideSpinner();
        }
    }

    // --- Logika Life Index ---
    calculateAndRenderLifeIndex() {
        if (!this.lastWeatherData || !this.lastSearchedCity) {
            this.ui.renderLifeIndex(null, []);
            return;
        }

        const weather = this.lastWeatherData;
        const recommendations = [];

        // 1. Olahraga
        if (weather.apparent_temperature < 30 && weather.precipitation < 10) { recommendations.push({ icon: '🏃‍♂️', title: 'Olahraga Luar', advice: 'Cukup nyaman' }); } else if (weather.apparent_temperature >= 30) { recommendations.push({ icon: '🥵', title: 'Olahraga Luar', advice: 'Terlalu panas!' }); } else { recommendations.push({ icon: '☔', title: 'Olahraga Luar', advice: 'Sebaiknya di dalam' }); }
        // 2. Risiko Heat Stroke
        if (weather.apparent_temperature > 40) { recommendations.push({ icon: '🚨', title: 'Risiko Heat Stroke', advice: 'Sangat Berbahaya! Minum segera.' }); } else if (weather.apparent_temperature > 32) { recommendations.push({ icon: '💧', title: 'Risiko Dehidrasi', advice: 'Waspada! Jaga Hidrasi.' }); } else { recommendations.push({ icon: '✅', title: 'Risiko Dehidrasi', advice: 'Risiko Rendah' }); }
        // 3. Pakaian
        if (weather.apparent_temperature > 25) { recommendations.push({ icon: '👕', title: 'Pakaian', advice: 'Kaos & celana pendek' }); } else if (weather.apparent_temperature > 18) { recommendations.push({ icon: '🧥', title: 'Pakaian', advice: 'Jaket ringan / Kemeja' }); } else { recommendations.push({ icon: '🧣', title: 'Pakaian', advice: 'Pakaian hangat' }); }
        // 4. Perjalanan
        if (weather.weather_code < 80) { recommendations.push({ icon: '✈️', title: 'Perjalanan', advice: 'Kondisi baik' }); } else { recommendations.push({ icon: '⚠️', title: 'Perjalanan', advice: 'Waspada cuaca buruk' }); }
        // 5. Mengemudi
        if (weather.weather_code !== 48 && weather.weather_code < 65 && weather.weather_code < 95) { recommendations.push({ icon: '🚗', title: 'Mengemudi', advice: 'Kondisi baik' }); } else if (weather.weather_code === 48) { recommendations.push({ icon: '🌫️', title: 'Mengemudi', advice: 'Hati-hati kabut!' }); } else { recommendations.push({ icon: ' Peringatan:', title: 'Mengemudi', advice: 'Jalan licin/badai' }); }
        // 6. Menjemur Pakaian
        if (weather.weather_code < 3 && weather.wind_speed_10m < 30) { recommendations.push({ icon: '☀️', title: 'Jemur Pakaian', advice: 'Waktu yang baik!' }); } else { recommendations.push({ icon: '🧺', title: 'Jemur Pakaian', advice: 'Sebaiknya tunda' }); }

        this.ui.renderLifeIndex(this.lastSearchedCity, recommendations);
    }
}

export default App;