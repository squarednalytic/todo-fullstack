# Full-Stack Todo Application

Aplikasi Todo full-stack dengan backend NestJS dan frontend React.

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js v18.0.0 atau lebih baru
- npm v9.0.0 atau lebih baru

### Backend
1. Masuk ke folder backend:
   ```bash
   cd backend
2. Install dependencies:
   npm install
3. Jalankan server:
   npm start
   Server berjalan di: http://localhost:3000

   ### Frontend

1. Masuk ke folder frontend:
   cd frontend
2. Install dependencies:
   npm install
3. Jalankan aplikasi:
   npm start
   
   Aplikasi berjalan di: http://localhost:3000

    ### 🛠️ Versi Node.js

    • Node.js: v18.17.0
    • npm: v9.6.7
   
   ### 🔧 Keputusan Teknis
   
   ### 1. Penyimpanan In-Memory
   
   ### Menggunakan in-memory storage untuk:
   1. Kesederhanaan implementasi
   2. Tidak memerlukan setup database eksternal
   3. Cocok untuk demonstrasi dan pengembangan cepat

   ### 2. Data Fetching dengan Axios

   ### Menggunakan Axios karena:
   1. API yang konsisten dan mudah digunakan
   2. Error handling yang lebih baik daripada fetch native
   3. Interceptor untuk request/response
   4. Dukungan TypeScript yang baik

   ### 3. Struktur Folder
   backend/
├── src/
│   ├── todo/          # Modul todo dengan DTO, entity, controller, service
│   └── main.ts        # Entry point aplikasi
frontend/
├── src/
│   ├── App.tsx        # Komponen utama
│   ├── App.css        # Styling utama
│   └── index.tsx      # Entry point React

      ### 📋 Fitur

    ✅ CRUD operations untuk todo
    ✅ Live search
    ✅ Toggle completion status
    ✅ Error handling
    ✅ Loading states
    ✅ Responsive UI
    ✅ CORS enabled

   

   
   
