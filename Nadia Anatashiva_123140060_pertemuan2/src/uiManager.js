// uiManager.js

class UIManager {
    constructor() {
        // Layar & Sections
        this.registerScreen = document.getElementById('registerScreen');
        this.loginScreen = document.getElementById('loginScreen');
        this.dashboardScreen = document.getElementById('dashboardScreen');
        this.navbar = document.getElementById('navbar');
        this.mainContent = document.getElementById('mainContent');
        this.sections = this.mainContent.querySelectorAll('.dashboard-section');
        // Register & Login
        this.registerForm = document.getElementById('registerForm');
        this.registerUsernameInput = document.getElementById('registerUsername');
        this.registerPasswordInput = document.getElementById('registerPassword');
        this.registerError = document.getElementById('registerError');
        this.switchToLoginLink = document.getElementById('switchToLogin');
        this.loginForm = document.getElementById('loginForm');
        this.loginUsernameInput = document.getElementById('loginUsername');
        this.loginPasswordInput = document.getElementById('loginPassword');
        this.loginError = document.getElementById('loginError');
        this.switchToRegisterLink = document.getElementById('switchToRegister');
        // Navbar
        this.userGreeting = document.getElementById('userGreeting');
        this.logoutButton = document.getElementById('logoutButton');
        this.navLinks = this.navbar.querySelectorAll('.nav-link');
        // Home Section
        this.currentLocationWeatherDiv = document.getElementById('currentLocationWeather');
        this.cityInput = document.getElementById('cityInput');
        this.searchButton = document.getElementById('searchButton');
        this.weatherSpinner = document.getElementById('weatherSpinner');
        this.currentWeatherDiv = document.getElementById('currentWeather');
        this.forecastTitle = document.getElementById('forecastTitle');
        this.forecastDisplay = document.getElementById('forecastDisplay');
        this.forecastPlaceholder = document.getElementById('forecastPlaceholder');
        // Life Index Section
        this.lifeIndexCity = document.getElementById('lifeIndexCity');
        this.lifeIndexDisplay = document.getElementById('lifeIndexDisplay');
    }

    // --- Manajemen Tampilan Layar & Section ---
    showRegisterScreen() { this._setScreen(this.registerScreen); }
    showLoginScreen() { this._setScreen(this.loginScreen); }
    showDashboardScreen() { this._setScreen(this.dashboardScreen); }
     _setScreen(screenToShow) {
        [this.registerScreen, this.loginScreen, this.dashboardScreen].forEach(screen => {
            screen.style.display = (screen === screenToShow) ? 'flex' : 'none';
            screen.style.animation = (screen === screenToShow) ? 'fadeIn 0.5s ease-out forwards' : '';
        });
        window.scrollTo(0, 0);
    }
     setActiveSection(sectionId) {
        this.sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active-section');
                section.style.display = 'block';
            } else {
                section.classList.remove('active-section');
                section.style.display = 'none';
            }
        });
        this.navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        this.mainContent.scrollTo(0, 0);
    }


    // --- Pesan Error & Spinner ---
    _showError(element, message) { element.textContent = message; element.style.display = 'block'; }
    _clearError(element) { element.style.display = 'none'; }
    showRegisterError(m) { this._showError(this.registerError, m); }
    clearRegisterError() { this._clearError(this.registerError); }
    showLoginError(m) { this._showError(this.loginError, m); }
    clearLoginError() { this._clearError(this.loginError); }
    showSpinner() { this.weatherSpinner.style.display = 'flex'; }
    hideSpinner() { this.weatherSpinner.style.display = 'none'; }

    // --- Render Data ---
    renderGreeting(username, displayName) {
        const name = displayName || username;
        this.userGreeting.textContent = `Halo, ${name}!`;
    }

    _renderWeather(element, { name, icon, temperature_2m, wind_speed_10m, description, humidity, feelsLike }, isSmall = false) {
        let detailsHTML = '';
        const titleHTML = `<h2>${name || 'Lokasi Anda'}</h2>`; // Judul selalu ada

        if (isSmall) {
            detailsHTML = `
                <div class="weather-details-row">
                    <div class="detail-box">
                        <span>Suhu</span>
                        <strong>${temperature_2m}°C</strong>
                    </div>
                    <div class="detail-box">
                        <span>Angin</span>
                        <strong>${wind_speed_10m} km/h</strong>
                    </div>
                </div>
            `;
        } else {
            detailsHTML = `
                <p><strong>Suhu:</strong> ${temperature_2m}°C (Terasa ${feelsLike}°C)</p>
                <p>Angin: ${wind_speed_10m} km/h | Kelembapan: ${humidity}%</p>
            `;
        }

        element.innerHTML = `
            ${titleHTML}
            <div class="weather-icon">${icon}</div>
            <p class="weather-description">${description}</p>
            ${detailsHTML}
        `;
    }
    _renderWeatherError(element, message) {
        // Tampilkan pesan error di dalam kotak weather-display
        element.innerHTML = `<p class="error">${message}</p>`;
    }

    showFallbackMessage(element, fallbackRegion) {
         element.innerHTML = `<p class="placeholder info">Gagal akses lokasi. Menampilkan data ${fallbackRegion}...</p>`;
    }

    renderCurrentLocationWeather(data) {
        this._renderWeather(this.currentLocationWeatherDiv, data, true);
    }
    renderCurrentLocationError(message) {
        this._renderWeatherError(this.currentLocationWeatherDiv, message);
    }

    renderCurrentWeather(data) {
        this._renderWeather(this.currentWeatherDiv, data, false);
    }
    renderCurrentWeatherError(message) {
        this._renderWeatherError(this.currentWeatherDiv, message);
    }

    renderForecast(cityName, dailyData, weatherManager) { /* implementation below */ }
     renderForecast(cityName, dailyData, weatherManager) {
        this.forecastTitle.textContent = `📅 Perkiraan di ${cityName || '...'}`; // Update judul
        this.forecastDisplay.innerHTML = ''; // Kosongkan
        this.forecastPlaceholder.style.display = 'none'; // Sembunyikan placeholder

        if (!dailyData || !dailyData.time || dailyData.time.length === 0) {
            this.forecastDisplay.innerHTML = '<p class="placeholder">Data perkiraan tidak tersedia.</p>';
            return;
        }
        dailyData.time.forEach((dateStr, index) => {
            const day = new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'short' });
            const code = dailyData.weather_code[index];
            const icon = weatherManager.getWeatherIcon(code);
            const maxTemp = Math.round(dailyData.temperature_2m_max[index]);
            const minTemp = Math.round(dailyData.temperature_2m_min[index]);

            const item = document.createElement('div');
            item.className = 'forecast-item';
            item.style.animationDelay = `${index * 0.05}s`;
            item.innerHTML = `
                <span class="forecast-day">${day}</span>
                <span class="forecast-icon">${icon}</span>
                <span class="forecast-temp">${maxTemp}° / ${minTemp}°</span>
            `;
            this.forecastDisplay.appendChild(item);
        });
    }
     renderForecastError(cityName, message) {
         this.forecastTitle.textContent = `📅 Perkiraan di ${cityName || '...'}`;
         this.forecastDisplay.innerHTML = `<p class="error">${message}</p>`;
         this.forecastPlaceholder.style.display = 'none';
    }
    resetForecastDisplay() {
        this.forecastTitle.textContent = `📅 Perkiraan 7 Hari`;
        this.forecastDisplay.innerHTML = '';
        this.forecastPlaceholder.textContent = 'Mengambil lokasi untuk perkiraan...';
        this.forecastPlaceholder.style.display = 'block';
    }


    renderLifeIndex(cityName, recommendations) { /* implementation below */ }
     renderLifeIndex(cityName, recommendations) {
         this.lifeIndexCity.textContent = cityName ? `Berdasarkan cuaca di: ${cityName}` : 'Berdasarkan cuaca di: - (Lakukan pencarian di Home)';
        this.lifeIndexDisplay.innerHTML = ''; // Kosongkan
        if (recommendations.length === 0) {
             this.lifeIndexDisplay.innerHTML = '<p class="placeholder">Belum ada data cuaca untuk menghitung index.</p>';
             return;
        }
        recommendations.forEach((item, index) => {
             const div = document.createElement('div');
             div.className = 'life-index-item';
             div.style.animationDelay = `${index * 0.05}s`;
             div.innerHTML = `
                 <span class="index-icon">${item.icon}</span>
                 <span class="index-title">${item.title}</span>
                 <span class="index-advice">${item.advice}</span>
             `;
             this.lifeIndexDisplay.appendChild(div);
        });
    }


    clearSearchInput() { this.cityInput.value = ''; }
}

export default UIManager;