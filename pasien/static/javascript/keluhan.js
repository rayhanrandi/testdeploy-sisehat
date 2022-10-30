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
    const namaDokter = cariPengguna(dokter.pk)
    himpunanDokter.add(namaDokter);
  })

  var counter = 0;
  himpunanDokter.forEach(namaDokter => {
    const pilihDokter = `
    <li><a id="id-dokter-${counter}" class="dropdown-item" onclick="gantiDokterTerpilih('id-dokter-${counter}')">${namaDokter}</a></li>  
    `;

    counter += 1;
    tarikTurunDokter.append(pilihDokter);
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

  const daftarRumahSakit = `
    <li><a id="id-rumah-sakit-kosong" class="dropdown-item" onclick="gantiRumahSakitTerpilih('id-rumah-sakit-kosong')">—</a></li>  
    `;

  tarikTurunRumahSakit.append(daftarRumahSakit);

  var counter = 0;
  himpunanRumahSakit.forEach(namaRumahSakit => {
    const pilihRumahSakit = `
    <li><a id="id-rumah-sakit-${counter}" class="dropdown-item" onclick="gantiRumahSakitTerpilih('id-rumah-sakit-${counter}')">${namaRumahSakit}</a></li>  
    `;

    counter += 1;
    tarikTurunRumahSakit.append(pilihRumahSakit);
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

function gantiDokterTerpilih(idDokter) {
  let dokterPilihan = document.getElementById(idDokter).innerHTML;
  document.getElementById("dokter-pilihan").innerHTML = dokterPilihan;
}

function gantiRumahSakitTerpilih(idRumahSakit) {
  let rumahSakitPilihan = document.getElementById(idRumahSakit).innerHTML;
  document.getElementById("rumah-sakit-pilihan").innerHTML = rumahSakitPilihan;
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
    // mengosongkan formulir
    rincian_keluhan.trigger("reset");

    // memperbarui daftar
    ambilDaftarKeluhan();
  });

  $("#staticBackdrop").modal("hide");
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
  const daftar_keluhan = $('#accordionFlushExample');
  daftar_keluhan.empty();
  
  var counter = 0;
  data.forEach(keluhan => {
    const rincian_keluhan = `
    <div class="accordion-item card-design" style="overflow: hidden; border-radius: 20px;">
      <h2 class="accordion-header" id="flush-heading${counter}">
        <button class="accordion-button collapsed" style="color: black;" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${counter}" aria-expanded="false">
          Accordion Item #1
        </button>
      </h2>
      <div id="flush-collapse${counter}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
      </div>
    </div>
    `;
    
    counter += 1;
    daftar_keluhan.append(rincian_keluhan);
  })
};

function cariPengguna(idPengguna) {
  var namaDokter;

  $.ajax({
    type: "GET",
    url: `/pasien/cari-pengguna/${idPengguna}/`,
    async: false,
  }).done(function (data) {
    namaDokter =  data.nama_dokter;
  });

  return namaDokter
}

function logOut() {
  $.ajax({
    type: 'GET',
    url: '/pasien/log-out/',
  }).done(function(data) {
    window.location = "/";
  });
}
