# SiSehat

## [Link Aplikasi](https://sisehat-group.herokuapp.com/)

#### Anggota Kelompok:
1. Abby Marvel Immanuel Parasian Pribadi
2. Adly Renadi Raksanagara
3. Bryan Raihan 'Ilman
4. Nadya Hoesin
5. Rayhan Putra Randi

## Deskripsi Aplikasi dan Manfaatnya
Aplikasi **SiSehat** ini dibuat untuk membantu masyarakat menyimpan riwayat perawatannya yang bisa diakses oleh berbagai rumah sakit yang terafiliasi oleh aplikasi untuk memudahkan proses registrasi dan berbagai hal yang dapat menjadi penghambat pasien dalam mendapat perawatan.

#### [color palette](https://coolors.co/palette/f0ead2-e7e8c4-dde5b6-c5d397-b9ca88-adc178-a98467-95755e-806755-6c584c)

## Daftar modul yang akan diimplementasikan
#### 0. Accounts
- Models: User (atribut: nomor_induk_kependudukan, nama_pengguna, adalah_pasien, adalah_dokter)
- Routing: -
- Form: -

#### 1. Halaman Utama
- Models: Feedback (atribut: nama, pesan)
- Routing: Halaman Utama, Login Pasien, Login Dokter
- Form: Feedback Website

#### 2. Registrasi (Login, Register)
- Models: Pasien (atribut: user), Dokter (atribut: user, nama_rumah_sakit)
- Routing: Halaman Utama, Login Dokter, Login Pasien, Registrasi Dokter, Registrasi Pasien
- Form: Registrasi, Login

#### 3. Pasien
- Models: Keluhan (atribut: pasien (FK), dokter (FK), tanggal, tema, deskripsi), Penyakit, Obat, Pasien, Dokter 
- Routing: Halaman Utama, Pasien
- Form: Tambah Keluhan Penyakit

#### 4. Dokter
- Models: Penyakit (atribut: pasien (FK), dokter (FK), tanggal, nama_penyakit, deskripsi), Obat, Pasien, Dokter 
- Routing: Halaman Utama, Obat, Dokter
- Form: Tambah Riwayat Penyakit

#### 5. Obat
- Models:  Obat (atribut: pasien (FK), dokter (FK), tanggal, nama_obat, deskripsi), Pasien, Dokter 
- Routing: Halaman Utama, Obat
- Form: Tambah Obat 
