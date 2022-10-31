function show() {
  getPenyakit();
  getKeluhan();
}

function getPenyakit() {
  var listPasien = document.getElementById("daftar-pasien");
  var pasien = listPasien.options[listPasien.selectedIndex].text;
  console.log("in getPenyakit");
    $.ajax({
        type: "GET",
        url: "/dokter/riwayat-penyakit/" + pasien
    }).done((data) => {
        console.log("about to showPenyakit")
        showPenyakit(data)
    });
}

function showPenyakit(pasien) {
  const table = $('.display');
  table.empty();
  table.append(
    `<tr class="table-header">
      <th>Nama Penyakit</th>
      <th>Tanggal Diagnosis</th>
      <th>Pesan Dokter</th>
      <th>Sembuh</th>
    </tr>`
  )
  pasien.forEach(penyakit => {
    const penyakitData = `
      <tr>
        <th>${penyakit.fields.nama_penyakit}</th>
        <th>${penyakit.fields.tanggal_diagnosis}</th>
        <th>${penyakit.fields.deskripsi_keluhan}</th>
        <th>
          <button id="penyakit-toggle" onclick=togglePenyakit(${penyakit.pk})>${penyakit.fields.sembuh ? "&#9989" : "&#10060"}</button>
        </th>
      </tr>`;
    table.append(penyakitData);
  })
}

function addPenyakit() {
  console.log("in addPenyakit");
  var listPasien = document.getElementById("daftar-pasien");
  var pasien = listPasien.options[listPasien.selectedIndex].text;
  const form = $('.new-penyakit');
  $.ajax({
      type: "POST",
      url: "/dokter/add-penyakit/" + pasien,
      data: form.serialize(),
      error: console.log("error"), 
  }).done(function (data) {
      console.log("about to getPenyakit");
      form.trigger("reset");
      getPenyakit();
  })
  $("#staticBackdrop").modal("hide");
}

function togglePenyakit(id) {
  console.log("in togglePenyakit");
  $.ajax({
      type: "GET",
      url: "/dokter/toggle-penyakit/" + id,
      error: console.log("failed toggle"),
  }).done(function (data) {
      console.log("done toggling");
      getPenyakit();
  })
}

function getKeluhan() {
  var listPasien = document.getElementById("daftar-pasien");
  var pasien = listPasien.options[listPasien.selectedIndex].text;
  console.log("in getKeluhan");
    $.ajax({
        type: "GET",
        url: "/dokter/riwayat-keluhan/" + pasien
    }).done((data) => {
        console.log("about to showKeluhan")
        showKeluhan(data)
    });
}

function showKeluhan(pasien) {
  const table = $('.display-keluhan');
  table.empty();
  table.append(
    `<tr class="table-header">
      <th>Tema</th>
      <th>Tanggal</th>
      <th>Deskripsi</th>
    </tr>`
  )
  pasien.forEach(keluhan => {
    const keluhanData = `
      <tr>
        <th>${keluhan.fields.tema}</th>
        <th>${keluhan.fields.tanggal}</th>
        <th>${keluhan.fields.deskripsi}</th>
      </tr>`;
    table.append(keluhanData);
  })
}