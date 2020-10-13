# sequelize-perpustakaan

Live-backup: [Youtube](https://www.youtube.com/watch?v=hK_-fP639QE&t=1028s)

Database-name: perpustakaan

Database-relation: 
![Database-relation](https://i.ibb.co/XkJD5xR/Whats-App-Image-2020-10-12-at-10-55-23.jpg)

Table rak
```
sequelize model:create --name rak --attributes nama_rak:string,lokasi_rak:string
```
Table buku
```
sequelize model:create --name buku --attributes id_rak:integer,judul_buku:string,penulis_buku:string,penerbit_buku:string,tahun_penerbit:string,stok:integer
```
Table pengembalian
```
sequelize model:create --name pengembalian --attributes tanggal_pengembalian:date,denda:double,id_buku:integer,id_anggota:integer,id_petugas:integer
```
Table peminjaman
```
sequelize model:create --name peminjaman --attributes tanggal_pinjam:date,tanggal_kembali:date,id_buku:integer,id_anggota:integer,id_petugas:integer
```
Table petugas
```
sequelize model:create --name petugas --attributes nama_petugas:string,jabatan_petugas:varchar,no_telp_petugas:string,alamat_petugas:string
```
Table anggota
```
sequelize model:create --name anggota --attributes kode_anggota:string,nama_anggota:string,jk_anggota:char,jurusan_anggota:string,no_telp_anggota:string,alamat_anggota:string
```
