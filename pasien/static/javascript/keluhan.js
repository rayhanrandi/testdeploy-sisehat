function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

$(document).ready(() => {
  ambilDaftarKeluhan();
  ambilDaftarDokter();
})

function homepage() {
  $.ajax({
    type: 'GET',
    url: '/',
  }).done(function (data) {
    window.location = "/";
  });
}

function lihatRiwayat() {
  $.ajax({
    type: 'GET',
    url: '/pasien/riwayat/',
  }).done(function(data) {
    window.location = "/pasien/riwayat/";
  });
}

function bikinKeluhan() {
  let dokterPilihan = document.getElementById("dokter-pilihan").innerHTML;
  document.getElementById("identitas-dokter").setAttribute("value", dokterPilihan); 

  const rincian_keluhan = $("#rincian-keluhan");
  $.ajax({
    type: "POST",
    url: "/pasien/mengeluh/",
    data: rincian_keluhan.serialize(),
  }).done(function (data) {
    rincian_keluhan.trigger("reset");
    ambilDaftarKeluhan();
  });

  $("#staticBackdrop").modal("hide");
}

async function masukanPengguna(data) {
  var nilai = await document.getElementById(data).value;

  if (nilai == "") nilai = "kosong"
  setTimeout(ambilDaftarKeluhan(nilai), 200);
}

function ambilDaftarKeluhan(nilai="kosong") {
  $.ajax({
    type: "GET",
    url: "/pasien/daftar-keluhan/" + nilai + "/"
  }).done((data) => {
    taruhDaftarKeluhan(data)
  });
}

function taruhDaftarKeluhan(data) {
  const daftar_keluhan = $('#accordionFlushExample');
  daftar_keluhan.empty();
  
  const tipePengguna = getCookie("user_type")
  var counter = 0;
  
  data.forEach(keluhan => {
    const namaPasien = cariPengguna(keluhan.fields.pasien)
    const namaDokter = cariPengguna(keluhan.fields.dokter)

    if (tipePengguna == "pasien") {
      const rincian_keluhan = `
      <div class="accordion-item card-design" style="overflow: hidden; border-radius: 20px;">
        <h2 class="accordion-header" id="flush-heading${counter}">
          <button class="accordion-button collapsed" style="color: black;" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${counter}" aria-expanded="false">
            <div class="d-flex flex-row flex-gap" style="width: 100%; flex-flow: row wrap;">
              <span>${keluhan.fields.tanggal}</span>
              <span>${keluhan.fields.tema}</span>
              <span style="margin-left: auto; margin-right: 20px;">kepada: ${namaDokter}</span>
            </div>
          </button>
        </h2>
        <div id="flush-collapse${counter}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <div class="d-flex flex-column flex-gap" style="width: 100%; flex-flow: row wrap;">
              <span style="margin-bottom: -16px;">keluhan:</span>
              <span style="overflow: scroll;">&emsp;${keluhan.fields.deskripsi}</span>
            </div>
          </div>
        </div>
      </div>
      `;

      counter += 1;
      daftar_keluhan.append(rincian_keluhan);
    } else {
      const rincian_keluhan = `
      <div class="accordion-item card-design" style="overflow: hidden; border-radius: 20px;">
        <h2 class="accordion-header" id="flush-heading${counter}">
          <button class="accordion-button collapsed" style="color: black;" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${counter}" aria-expanded="false">
            <div class="d-flex flex-row flex-gap" style="width: 100%; flex-flow: row wrap;">
              <span>${keluhan.fields.tanggal}</span>
              <span>${keluhan.fields.tema}</span>
              <span style="margin-left: auto; margin-right: 20px;">dari: ${namaPasien}</span>
            </div>
          </button>
        </h2>
        <div id="flush-collapse${counter}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <div class="d-flex flex-column flex-gap" style="width: 100%; flex-flow: row wrap;">
              <span style="margin-bottom: -16px;">keluhan:</span>
              <span style="overflow: scroll;">&emsp;${keluhan.fields.deskripsi}</span>
            </div>
          </div>
        </div>
      </div>
      `;

      counter += 1;
      daftar_keluhan.append(rincian_keluhan);
    }
  })
};

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

function logOut() {
  $.ajax({
    type: 'GET',
    url: '/pasien/log-out/',
  }).done(function(data) {
    window.location = "/";
  });
}
