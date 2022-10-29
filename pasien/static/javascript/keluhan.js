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

function isiTarikTurunDokter(data) {
  const tarikTurunDokter = $('.tarik-turun-dokter');
  tarikTurunDokter.empty();

  const himpunanDokter = new Set();

  data.forEach(dokter => {
    const nomorIndukKependudukan = dokter.pk;
    himpunanDokter.add(nomorIndukKependudukan);
  })

  himpunanDokter.forEach(nomorIndukKependudukan => {
    const identitasDokter = `
    <li><a class="dropdown-item">${nomorIndukKependudukan}</a></li>  
    `;

    tarikTurunDokter.append(identitasDokter);
  })
}

function isiTarikTurunRumahSakit(data) {
  const tarikTurunRumahSakit = $('.tarik-turun-rumah-sakit');
  tarikTurunRumahSakit.empty();

  const himpunanRumahSakit = new Set();

  data.forEach(dokter => {
    const namaRumahSakit = dokter.fields.nama_rumah_sakit;
    himpunanRumahSakit.add(namaRumahSakit);
  })

  himpunanRumahSakit.forEach(namaRumahSakit => {
    const rumahSakit = `
    <li><a class="dropdown-item">${namaRumahSakit}</a></li>  
    `;

    tarikTurunRumahSakit.append(rumahSakit);
  })
}

function lihatRiwayat() {
  $.ajax({
    type: 'GET',
    url: '/pasien/riwayat/',
  }).done(function(data) {
    window.location = "/pasien/riwayat/";
  });
}

function ambilDaftarDokter() {
  const himpunanDokter = new Set()

  $.ajax({
    type: "GET",
    url: "/pasien/daftar-dokter/"
  }).done(function (data) {
    data.forEach(dokter => {
      himpunanDokter.add(dokter)
    })

    isiTarikTurunRumahSakit(himpunanDokter)
    isiTarikTurunDokter(himpunanDokter)
  });
}

function bikinKeluhan() {
  const rincian_keluhan = $("#rincian-keluhan");
  
  $.ajax({
    type: "POST",
    url: "/pasien/mengeluh/",
    data: rincian_keluhan.serialize(),
  }).done(function (data) {
    // mengosongkan formulir
    rincian_keluhan.trigger("reset");

    // memperbarui daftar
    ambilDaftarKeluhan();
  });

  $("#rincian-keluhan").modal("hide");
}

function ambilDaftarKeluhan() {
  $.ajax({
    type: "GET",
    url: "/pasien/daftar-keluhan/"
  }).done((data) => {
    taruhDaftarKeluhan(data)
  });
}

function taruhDaftarKeluhan(data) {
  const daftar_keluhan = $('#daftar-keluhan');
  daftar_keluhan.empty();

  data.forEach(keluhan => {
      
      const rincian_keluhan = `
        <p>hey</p>    
      `;
      
      daftar_keluhan.append(rincian_keluhan);

  })
};

function logOut() {
  $.ajax({
    type: 'GET',
    url: '/pasien/log-out/',
  }).done(function(data) {
    window.location = "/";
  });
}
