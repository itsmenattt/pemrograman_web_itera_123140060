// weatherManager.js

class WeatherManager {

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation tidak didukung oleh browser Anda."));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    let message = "Gagal mendapatkan lokasi: ";
                    switch(error.code) {
                        case error.PERMISSION_DENIED: message += "Izin lokasi ditolak."; break;
                        case error.POSITION_UNAVAILABLE: message += "Informasi lokasi tidak tersedia."; break;
                        case error.TIMEOUT: message += "Waktu permintaan lokasi habis."; break;
                        default: message += "Terjadi kesalahan tidak diketahui."; break;
                    }
                    reject(new Error(message));
                },
                { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 } // Opsi
            );
        });
    }

     async getCityNameFromCoords(latitude, longitude) {
        // Kita bisa gunakan API Open-Meteo lagi untuk ini
        const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&current_weather=false&format=json`;
         try {
             const response = await fetch(url);
             if (!response.ok) return null; // Gagal, kembalikan null
             const data = await response.json();
             // Mencari nama kota/daerah dari hasil
             return data.address?.city || data.address?.county || data.address?.state || "Lokasi tidak dikenal";
         } catch (error) {
             console.error("Reverse geocoding failed:", error);
             return null;
         }
    }


    async geocode(city) {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=id&format=json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Geocoding API error: ${response.statusText}`);
        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            throw new Error(`Kota tidak ditemukan: ${city}`);
        }
        return data.results[0];
    }

    async getWeather(latitude, longitude) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Weather API error: ${response.statusText}`);
        return await response.json();
    }

    async getForecast(latitude, longitude) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Forecast API error: ${response.statusText}`);
        return await response.json();
    }

    getWeatherDescription(code) {
        const codes = {
            0: 'Cerah', 1: 'Cerah, sebagian berawan', 2: 'Sebagian berawan',
            3: 'Berawan', 45: 'Kabut', 48: 'Kabut tebal',
            51: 'Gerimis Ringan', 53: 'Gerimis Sedang', 55: 'Gerimis Lebat',
            61: 'Hujan Ringan', 63: 'Hujan Sedang', 65: 'Hujan Lebat',
            80: 'Hujan Ringan (Terputus)', 81: 'Hujan Sedang (Terputus)',
            82: 'Hujan Lebat (Terputus)', 95: 'Badai Petir',
        };
        return codes[code] || 'Kondisi cuaca tidak diketahui';
    }

    getWeatherIcon(code) {
        switch (code) {
            case 0: return '☀️'; case 1: return '🌤️'; case 2: return '⛅';
            case 3: return '☁️'; case 45: case 48: return '🌫️';
            case 51: case 53: case 55: case 61: case 80: return '🌦️';
            case 63: case 81: return '🌧️'; case 65: case 82: return '⛈️';
            case 95: return '🌩️'; default: return '❔';
        }
    }

}

export default WeatherManager;