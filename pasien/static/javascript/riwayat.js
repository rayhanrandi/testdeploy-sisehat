window.onload = function() {
  document.getElementById("masukan-nama-dokter").value = "";
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

$(document).ready(() => {
  const hanyaCariDokter = false
  ambilDaftarDokter(hanyaCariDokter);

  if (getCookie("user_type") === "pasien") ambilRiwayatPenyakit();
})

function homepage() {
  $.ajax({
    type: 'GET',
    url: '/',
  }).done(function(data) {
    window.location = "/";
  });
}

function bikinKeluhan() {
  $.ajax({
    type: 'GET',
    url: '/pasien/keluhan',
  }).done(function(data) {
    window.location = "/pasien/keluhan/";
  });
}

function isiTarikTurunDokter(data) {
  const tarikTurunDokter = $('#tarik-turun-dokter');
  tarikTurunDokter.empty();

  const himpunanDokter = new Set();

  data.forEach(dokter => {
    const namaDokter = cariPengguna(dokter.pk)
    himpunanDokter.add(namaDokter);
  })

  const daftarDokter = `
    <li><a id="id-dokter-kosong" class="dropdown-item" onclick="gantiDokterTerpilih('id-dokter-kosong')">—</a></li>  
    `;

  tarikTurunDokter.append(daftarDokter);

  var counter = 0;
  himpunanDokter.forEach(namaDokter => {
    const pilihDokter = `
    <li><a id="id-dokter-${counter}" class="dropdown-item" onclick="gantiDokterTerpilih('id-dokter-${counter}')">${namaDokter}</a></li>  
    `;

    counter += 1;
    tarikTurunDokter.append(pilihDokter);
  })
}

function isiTarikTurunRumahSakitAtas(data) {
  const tarikTurunRumahSakit = $('#tarik-turun-rumah-sakit-atas');
  tarikTurunRumahSakit.empty();

  const himpunanRumahSakit = new Set();

  data.forEach(dokter => {
    const namaRumahSakit = dokter.fields.nama_rumah_sakit;
    himpunanRumahSakit.add(namaRumahSakit);
  })

  const daftarRumahSakit = `
    <li><a id="id-rumah-sakit-kosong-atas" class="dropdown-item" onclick="gantiRumahSakitTerpilihAtas('id-rumah-sakit-kosong-atas')">—</a></li>  
    `;

  tarikTurunRumahSakit.append(daftarRumahSakit);

  var counter = 0;
  himpunanRumahSakit.forEach(namaRumahSakit => {
    const pilihRumahSakit = `
    <li><a id="id-rumah-sakit-atas-${counter}" class="dropdown-item" onclick="gantiRumahSakitTerpilihAtas('id-rumah-sakit-atas-${counter}')">${namaRumahSakit}</a></li>  
    `;

    counter += 1;
    tarikTurunRumahSakit.append(pilihRumahSakit);
  })
}

function isiTarikTurunRumahSakitBawah(data) {
  const tarikTurunRumahSakit = $('#tarik-turun-rumah-sakit-bawah');
  tarikTurunRumahSakit.empty();

  const himpunanRumahSakit = new Set();

  data.forEach(dokter => {
    const namaRumahSakit = dokter.fields.nama_rumah_sakit;
    himpunanRumahSakit.add(namaRumahSakit);
  })

  const daftarRumahSakit = `
    <li><a id="id-rumah-sakit-kosong-bawah" class="dropdown-item" onclick="gantiRumahSakitTerpilihBawah('id-rumah-sakit-kosong-bawah')">—</a></li>  
    `;

  tarikTurunRumahSakit.append(daftarRumahSakit);

  var counter = 0;
  himpunanRumahSakit.forEach(namaRumahSakit => {
    const pilihRumahSakit = `
    <li><a id="id-rumah-sakit-bawah-${counter}" class="dropdown-item" onclick="gantiRumahSakitTerpilihBawah('id-rumah-sakit-bawah-${counter}')">${namaRumahSakit}</a></li>  
    `;

    counter += 1;
    tarikTurunRumahSakit.append(pilihRumahSakit);
  })
}

function ambilDaftarDokter(hanyaCariDokter, nilai="") {
  const himpunanDokter = new Set()

  $.ajax({
    type: "GET",
    url: "/pasien/daftar-dokter/"
  }).done(function (data) {
    data.forEach(dokter => {
      himpunanDokter.add(dokter)
    })

    if (hanyaCariDokter) {
      tampilkanDokter(himpunanDokter, nilai);
    } else {
      if (getCookie("user_type") == "pasien") {
        isiTarikTurunRumahSakitAtas(himpunanDokter);
        isiTarikTurunRumahSakitBawah(himpunanDokter);
        isiTarikTurunDokter(himpunanDokter);
      }

      tampilkanDokter(himpunanDokter, nilai);
    }
  });
}

function mengurutkanDokter(dokterA, dokterB) {
  var urutanDokter = Array.from(new Set([
    cariPengguna(dokterA.pk).toLowerCase(),
    cariPengguna(dokterB.pk).toLowerCase()
  ])).sort()

  if (urutanDokter[0] == urutanDokter[1]) {
    urutanDokter = Array.from(new Set([
      dokterA.fields.nama_rumah_sakit,
      dokterB.fields.nama_rumah_sakit
    ])).sort()
  }
  if (urutanDokter[0] == cariPengguna(dokterA.pk).toLowerCase()) return -2;
  else return 2
}

function tampilkanDokter(himpunanDokter, nilai) {
  var himpunanDokterSesuai = new Set();

  himpunanDokter.forEach(dokter => {
    if (cariPengguna(dokter.pk).toLowerCase().trim().indexOf(
      String(nilai).toLowerCase().trim()) >= 0) {
      himpunanDokterSesuai.add(dokter)
    }
  });
  
  himpunanDokterSesuai = Array.from(himpunanDokterSesuai).sort(
    (dokterA, dokterB) => mengurutkanDokter(dokterA, dokterB)
    )

  himpunanDokterSesuai = new Set(himpunanDokterSesuai)

  const daftarHasilPencarian= $("#pencarian-dokter");
  daftarHasilPencarian.empty()

  himpunanDokterSesuai.forEach(dokter => {
    const hasilPencarian = `
      <div class="card hasil-pencarian card-design box-shadow-v-2" style="width: 100%">
        <div class="card-body d-flex flex-row flex-gap" style="flex-flow: row wrap;">
          <span style="font-size: 18px; overflow: hidden">&#127973 ${dokter.fields.nama_rumah_sakit}</span>
          <span style="font-size: 18px; margin-left: 60%; position: absolute;">&#128104/&#128105 ${cariPengguna(dokter.pk)}</span>
        </div>
      </div>
    `;

    daftarHasilPencarian.append(hasilPencarian);
  })
}

function gantiDokterTerpilih(idDokter) {
  let dokterPilihan = document.getElementById(idDokter).innerHTML;
  document.getElementById("dokter-pilihan").innerHTML = dokterPilihan;
}

function gantiRumahSakitTerpilihAtas(idRumahSakit) {
  let rumahSakitPilihan = document.getElementById(idRumahSakit).innerHTML;
  document.getElementById("rumah-sakit-pilihan-atas").innerHTML = rumahSakitPilihan;
}

function gantiRumahSakitTerpilihBawah(idRumahSakit) {
  let rumahSakitPilihan = document.getElementById(idRumahSakit).innerHTML;
  document.getElementById("rumah-sakit-pilihan-bawah").innerHTML = rumahSakitPilihan;
}

async function masukanPengguna(data) {
  const hanyaCariDokter = true;
  const nilai = await document.getElementById(data).value;
  setTimeout(ambilDaftarDokter(hanyaCariDokter, nilai), 200);
}

function ambilRiwayatPenyakit() {
  $.ajax({
    type: "GET",
    url: "/dokter/riwayat-penyakit/" + cariIdentitas(getCookie("username"))
  }).done(function (data) {
    tampilkanRiwayatPenyakit(data)
  });
}

function tampilkanRiwayatPenyakit(data) {
  const daftarRiwayatPenyakit = $("#daftar-riwayat-penyakit");
  
  var counter = 0;
  data.forEach(penyakit => {
    const rincian_penyakit = `
    <div class="accordion-item card-design" style="overflow: hidden; border-radius: 20px;">
      <h2 class="accordion-header" id="flush-heading${counter}">
        <button class="accordion-button collapsed" style="color: black;" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${counter}" aria-expanded="false">
          <div class="d-flex flex-row flex-gap" style="width: 100%; flex-flow: row wrap;">
            <span>${penyakit.fields.tanggal_diagnosis}</span>
            <span>Diagnosis: ${penyakit.fields.nama_penyakit}</span>
          </div>
        </button>
      </h2>
      <div id="flush-collapse${counter}" class="accordion-collapse collapse" data-bs-parent="#daftar-riwayat-penyakit">
        <div class="accordion-body">
          <div class="d-flex flex-column flex-gap align-items-start" style="width: 100%; flex-flow: row wrap;">
            <span style="margin-bottom: -16px;">deskripsi:</span>
            <span style="overflow: scroll;">&emsp;${penyakit.fields.deskripsi_keluhan}</span>
          </div>
        </div>
      </div>
    </div>
    `;

    counter += 1;
    daftarRiwayatPenyakit.append(rincian_penyakit);
  })
}

function cariPengguna(idPengguna) {
  var namaPengguna;

  $.ajax({
    type: "GET",
    url: `/pasien/cari-pengguna/${idPengguna}/`,
    async: false,
  }).done(function (data) {
    namaPengguna =  data.nama_pengguna;
  });

  return namaPengguna
}

function cariIdentitas(nama) {
  var identitas;

  $.ajax({
    type: "GET",
    url: `/pasien/cari-identitas/${nama}/`,
    async: false,
  }).done(function (data) {
    identitas =  data.identitas;
  });

  return identitas;
}
  
function logOut() {
  $.ajax({
    type: 'GET',
    url: '/pasien/log-out/',
  }).done(function(data) {
    window.location = "/";
  });
}
  