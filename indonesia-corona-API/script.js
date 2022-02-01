// menampilkan data seluruh indonesia
const dataIndonesia = document.getElementById('dataIndonesia');

fetch('http://apicovid19indonesia-v2.vercel.app/api/indonesia/more')
    .then(res => res.json())
    .then(result => {

        let hasil = `<div class="card-body">
                        <h4 class="card-title" style="color : white;">Data Covid-19 Indonesia Terbaru </h4>
                        <ol class="list-group list-group-numbered d-flex justify-content-around flex-row">
                          <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                              <div class="fw-bold">Positif</div>
                              penambahan(+) : ${result.penambahan.positif.toLocaleString('id-ID')}
                            </div>
                            <span class="badge bg-primary rounded-pill">${result.total.positif.toLocaleString('id-ID')}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                              <div class="fw-bold">Dirawat</div>
                              penambahan(+) : ${result.penambahan.dirawat.toLocaleString('id-ID')}
                            </div>
                            <span class="badge bg-primary rounded-pill">${result.total.dirawat.toLocaleString('id-ID')}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                              <div class="fw-bold">Sembuh</div>
                              penambahan(+) : ${result.penambahan.sembuh.toLocaleString('id-ID')}
                            </div>
                            <span class="badge bg-primary rounded-pill">${result.total.sembuh.toLocaleString('id-ID')}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                              <div class="fw-bold">Meninggal</div>
                              penambahan(+) : ${result.penambahan.meninggal.toLocaleString('id-ID')}
                            </div>
                            <span class="badge bg-primary rounded-pill">${result.total.meninggal.toLocaleString('id-ID')}</span>
                          </li>
                        </ol>
                        <p class="card-text" style="color : white;><small class="text-muted">Update : ${result.total.lastUpdate}</small></p>
                    </div>`;
        dataIndonesia.innerHTML = hasil;
    })

// menampilkan data setiap provinsi
const perprovinsi = document.querySelector(".perprovinsi");
fetch('http://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more')
    .then(res => res.json())
    .then(result => {
        let hasil = '';
        result.forEach(element => {
            hasil += `<div class="col mt-5">
                        <h6>${element.provinsi}</h6>
                        <ul class="list-group d-flex justify-content-around flex-row">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                              Kasus: &nbsp
                              <span class="badge bg-primary rounded-pill">${element.kasus.toLocaleString('id-ID')}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Sembuh: &nbsp
                              <span class="badge bg-primary rounded-pill">${element.sembuh.toLocaleString('id-ID')}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Meninggal: &nbsp
                              <span class="badge bg-primary rounded-pill">${element.meninggal.toLocaleString('id-ID')}</span>
                            </li>
                        </ul>
                    </div>`;
        perprovinsi.innerHTML = hasil;
        });
    })

// Menampilkan data harian setiap provinsi
const button = document.getElementById('button');
const text = document.getElementById('text');
const chart1 = document.querySelector(".grafik-total");
const chart2 = document.querySelector(".grafik-jenis-kelamin");
const chart3 = document.querySelector(".grafik-kelompok-umur");
button.addEventListener('click', ()=>{
  fetch(`http://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more?name=${text.value}`)
      .then(res => res.json())
      .then(result => {
        // Untuk Menampilkan Data Total Perprovinsi
        let hasil = `<canvas class="chart1" id="myChart" width="400" height="400"></canvas>`;
        chart1.innerHTML = hasil;
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Kasus', 'Dirawat', 'Sembuh', 'Meninggal'],
              datasets: [{
                  label: `Data Covid-19 Provinsi ${result[0].provinsi}`,
                  data: [`${result[0].kasus}`, `${result[0].dirawat}`, `${result[0].sembuh}`, `${result[0].meninggal}`],
                  backgroundColor: [
                    'rgba(226, 15, 15, 0.2)',
                      'rgba(226, 99, 15, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(51, 226, 15, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)'
                  ],
                  borderWidth: 1
              }]
          }
        });
        
        // Menampilkan data berdasarkan jenis kelamin
        let laki = result[0].jenis_kelamin["laki-laki"]
        let hasil2 = `<canvas id="myChart2" width="400" height="400"></canvas>`;
        chart2.innerHTML = hasil2;
        var ctx = document.getElementById('myChart2').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
              labels: ['Laki-laki', 'Perempuan'],
              datasets: [{
                  label: `Data Covid-19 Sesuai Jenis Kelamin`,
                  data: [`${laki}`, `${result[0].jenis_kelamin.perempuan}`],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)'
                  ]
              }]
            }
        });

        // Menampilkan Data sesuai Umur
        let hasil3 = `<canvas id="myChart3" width="400" height="400"></canvas>`;
        chart3.innerHTML = hasil3;
        let umur1 = result[0].kelompok_umur["0-5"]
        let umur2 = result[0].kelompok_umur["6-18"]
        let umur3 = result[0].kelompok_umur["19-30"]
        let umur4 = result[0].kelompok_umur["31-45"]
        let umur5 = result[0].kelompok_umur["46-59"]
        let umur6 = result[0].kelompok_umur["≥ 60"]
        var ctx = document.getElementById('myChart3').getContext('2d');
        var myChart3 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Umur : 0-5', 'Umur : 6-18', 'Umur : 19-30', 'Umur : 31-45', 'Umur : 46-59', 'Umur : >60'],
                datasets: [{
                    label: 'Data Pasien Covid-19 Sesuai Umur',
                    data: [`${umur1}`, `${umur2}`, `${umur3}`, `${umur4}`, `${umur5}`, `${umur6}`],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });
      });
})