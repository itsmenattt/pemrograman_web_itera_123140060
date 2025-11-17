from abc import ABC, abstractmethod
import os

# --- 1. Abstract Class (Blueprint) ---
class SkincareItem(ABC):
    def __init__(self, item_id, name, brand, price, stock):
        self.item_id = item_id
        self.name = name
        self.brand = brand
        self.price = price
        self.__stock = stock  # Encapsulation: Private attribute

    # Abstract method wajib (Polymorphism)
    @abstractmethod
    def display_info(self):
        pass

    # Abstract method untuk logika bisnis (diskon/pajak)
    @abstractmethod
    def calculate_final_price(self):
        pass

    # Property Decorator untuk validasi stok
    @property
    def stock(self):
        return self.__stock

    @stock.setter
    def stock(self, value):
        if value < 0:
            print("[ERROR] Stok tidak boleh negatif!")
        else:
            self.__stock = value

# --- 2. Subclasses (Inheritance) ---
class Serum(SkincareItem):
    def __init__(self, item_id, name, brand, price, stock, active_ingredient):
        super().__init__(item_id, name, brand, price, stock)
        self.active_ingredient = active_ingredient

    def display_info(self):
        # Polymorphism: Tampilan khusus Serum
        return f"[SERUM] {self.brand} - {self.name} ({self.active_ingredient}) | ID: {self.item_id} | Stok: {self.stock} | Rp{self.price:,.0f}"

    def calculate_final_price(self):
        # Contoh: Serum kena pajak 10%
        return self.price * 1.1

class Moisturizer(SkincareItem):
    def __init__(self, item_id, name, brand, price, stock, skin_type):
        super().__init__(item_id, name, brand, price, stock)
        self.skin_type = skin_type

    def display_info(self):
        # Polymorphism: Tampilan khusus Moisturizer
        return f"[MOISTURIZER] {self.brand} - {self.name} (For: {self.skin_type}) | ID: {self.item_id} | Stok: {self.stock} | Rp{self.price:,.0f}"

    def calculate_final_price(self):
        # Contoh: Moisturizer harga tetap
        return self.price

# --- 3. Management Class (Logika Sistem) ---
class SkincareStore:
    def __init__(self):
        self.inventory = []

    def _find_item(self, item_id):
        """Method internal untuk mencari object berdasarkan ID"""
        for item in self.inventory:
            if item.item_id == item_id:
                return item
        return None

    def add_item(self, item):
        # Validasi ID Unik
        if self._find_item(item.item_id):
            print(f"[ERROR] ID Barang '{item.item_id}' sudah ada. Gunakan ID lain.")
            return
        self.inventory.append(item)
        print(f"[SUKSES] Berhasil menambahkan: {item.name}")

    def show_inventory(self):
        print("\n=== DAFTAR PRODUK SKINCARE ===")
        if not self.inventory:
            print("Inventaris kosong.")
        else:
            for item in self.inventory:
                print(item.display_info())
        print("="*40)

    def update_stock(self, item_id, new_stock):
        item = self._find_item(item_id)
        if item:
            old_stock = item.stock
            item.stock = new_stock # Memicu setter validation
            print(f"[INFO] Stok diperbarui: {old_stock} -> {item.stock}")
        else:
            print("[ERROR] ID barang tidak ditemukan.")

    def delete_item(self, item_id):
        item = self._find_item(item_id)
        if item:
            self.inventory.remove(item)
            print(f"[INFO] Item '{item.name}' berhasil dihapus.")
        else:
            print("[ERROR] ID barang tidak ditemukan.")

    def search_item(self, keyword):
        """Fitur Pencarian Luas: Cek Nama, Brand, dan ID"""
        print(f"\n=== Hasil Pencarian '{keyword}' ===")
        found = False
        keyword = keyword.lower()
        
        for item in self.inventory:
            # Logika Pencarian Luas (OR Logic)
            match_name = keyword in item.name.lower()
            match_brand = keyword in item.brand.lower()
            match_id = keyword in item.item_id.lower()
            
            if match_name or match_brand or match_id:
                print(item.display_info())
                found = True
                
        if not found:
            print("Data tidak ditemukan.")

# --- 4. Main Program (Interaktif CLI) ---
def main():
    store = SkincareStore()
    
    # Data Dummy Awal (Agar saat dirun tidak kosong)
    store.add_item(Serum("S01", "Niacinamide 10%", "Somethinc", 115000, 10, "Niacinamide"))
    store.add_item(Moisturizer("M01", "Ceratides", "Skintific", 169000, 5, "All Skin Type"))

    while True:
        print("\n=== SISTEM MANAJEMEN SKINCARE ===")
        print("1. Tambah Item Baru")
        print("2. Lihat Daftar Item")
        print("3. Cari Item (Nama/Brand/ID)")
        print("4. Update Stok Item")
        print("5. Hapus Item")
        print("0. Keluar")
        
        choice = input("Pilih menu (0-5): ")

        if choice == '1':
            print("\n--- Tambah Produk ---")
            print("Pilih Jenis Produk:")
            print("1. Serum")
            print("2. Moisturizer")
            jenis = input("Pilihan: ")
            
            if jenis not in ['1', '2']:
                print("[ERROR] Jenis tidak valid.")
                continue

            uid = input("ID Barang: ")
            brand = input("Brand: ")
            nama = input("Nama Produk: ")
            
            try:
                harga = int(input("Harga (Rp): "))
                stok = int(input("Stok Awal: "))
            except ValueError:
                print("[ERROR] Harga dan Stok harus berupa angka bulat!")
                continue

            if jenis == '1':
                ingred = input("Kandungan Utama (Cth: Retinol): ")
                store.add_item(Serum(uid, nama, brand, harga, stok, ingred))
            elif jenis == '2':
                stype = input("Tipe Kulit (Cth: Oily/Dry): ")
                store.add_item(Moisturizer(uid, nama, brand, harga, stok, stype))

        elif choice == '2':
            store.show_inventory()

        elif choice == '3':
            keyword = input("Masukkan kata kunci (Nama/Brand/ID): ")
            store.search_item(keyword)

        elif choice == '4':
            uid = input("Masukkan ID Barang: ")
            try:
                jml = int(input("Masukkan jumlah stok baru: "))
                store.update_stock(uid, jml)
            except ValueError:
                print("[ERROR] Stok harus berupa angka.")

        elif choice == '5':
            uid = input("Masukkan ID Barang yang akan dihapus: ")
            store.delete_item(uid)

        elif choice == '0':
            print("Program selesai.")
            break
        else:
            print("[ERROR] Pilihan tidak valid.")

if __name__ == "__main__":
    main()