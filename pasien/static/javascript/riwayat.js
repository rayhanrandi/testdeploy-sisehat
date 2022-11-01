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

  if (getCookie("user_type") == "pasien") ambilRiwayatPenyakit();
  if (getCookie("user_type") == "dokter") riwayatPenyakitPasien();
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

function isiTarikTurunDiagnosis(data) {
  const tarikTurunDiagnosis = $('#daftar-diagnosis');
  tarikTurunDiagnosis.empty();

  const himpunanDiagnosis = new Set();

  data.forEach(penyakit => {
    const diagnosis = penyakit.fields.nama_penyakit
    himpunanDiagnosis.add(diagnosis);
  })

  const diagnosisKosong = `
    <li><a id="id-diagnosis-kosong" class="dropdown-item" onclick="gantiDiagnosisTerpilih('id-diagnosis-kosong')">—</a></li>  
    `;

  tarikTurunDiagnosis.append(diagnosisKosong);

  var counter = 0;
  himpunanDiagnosis.forEach(diagnosis => {
    const pilihDiagnosis = `
    <li><a id="id-diagnosis-${counter}" class="dropdown-item" onclick="gantiDiagnosisTerpilih('id-diagnosis-${counter}')">${diagnosis}</a></li>  
    `;

    counter += 1;
  tarikTurunDiagnosis.append(pilihDiagnosis);
  })
}

function isiTarikTurunObat(data) {
  
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

    tampilkanDokter(himpunanDokter, nilai);
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

function gantiDiagnosisTerpilih(idDiagnosis) {
  let diagnosis = document.getElementById(idDiagnosis).innerHTML;
  document.getElementById("diagnosis-yg-ditampilkan").innerHTML = diagnosis;

  if (getCookie("user_type") == "pasien") ambilRiwayatPenyakit(diagnosis);
  if (getCookie("user_type") == "dokter") riwayatPenyakitPasien(diagnosis);
}

async function masukanPengguna(data) {
  const hanyaCariDokter = true;
  const nilai = await document.getElementById(data).value;
  setTimeout(ambilDaftarDokter(hanyaCariDokter, nilai), 200);
}

function ambilRiwayatPenyakit(diagnosis="") {
  $.ajax({
    type: "GET",
    url: "/pasien/riwayat-penyakit/"
  }).done(function (data) {
    tampilkanRiwayatPenyakit(data, diagnosis)
    isiTarikTurunDiagnosis(data)
  });
}

function tampilkanRiwayatPenyakit(data, diagnosis="") {
  const daftarRiwayatPenyakit = $("#daftar-riwayat-penyakit");
  
  var counter = 0;
  daftarRiwayatPenyakit.empty();

  data.forEach(penyakit => {
    if (penyakit.fields.nama_penyakit == diagnosis || diagnosis == "" || diagnosis == "—") {
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
    }
  })
}

function riwayatPenyakitPasien(diagnosis="") {
  $.ajax({
    type: "GET",
    url: `/pasien/riwayat-penyakit-pasien/dokter-${getCookie("username")}/`,
  }).done(function (data) {
    tampilkanRiwayatPenyakitPasien(data, diagnosis);
    isiTarikTurunDiagnosis(data)
  });
}

function tampilkanRiwayatPenyakitPasien(data, diagnosis="") {
  const daftarRiwayatPenyakit = $("#daftar-riwayat-penyakit");
  
  var counter = 0;
  daftarRiwayatPenyakit.empty();

  data.forEach(penyakit => {
    if (penyakit.fields.nama_penyakit == diagnosis || diagnosis == "" || diagnosis == "—") {
      const rincian_penyakit = `
      <div class="accordion-item card-design" style="overflow: hidden; border-radius: 20px;">
        <h2 class="accordion-header" id="flush-heading${counter}">
          <button class="accordion-button collapsed" style="color: black;" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${counter}" aria-expanded="false">
            <div class="d-flex flex-row flex-gap" style="width: 100%; flex-flow: row wrap;">
              <span>${penyakit.fields.tanggal_diagnosis}</span>
              <span>Diagnosis: ${penyakit.fields.nama_penyakit}</span>
              <span style="margin-left: 60%; position: absolute;">Pasien: ${cariPengguna(penyakit.fields.pasien)}</span>
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
    }
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
  