function tampilDataCovidGlobal(...data){
    data.forEach((element, index, any) => { 
        // Data Total kasus 
        const totalKasus = document.getElementById('totalKasus');
        const hasilGlobal = document.getElementById('hasilGlobal');
        fetch(any[0])
            .then(res => res.json())
            .then(result => {
                totalKasus.innerHTML = result.name;
                let hasil = result.value;
                let hasilBaru = hasil.substring(0, 3)
                hasilGlobal.innerHTML = `${hasilBaru} jt`;
            });

        // Data Sembuh
        const totalSembuh = document.getElementById('totalSembuh');
        const hasilTotalSembuh = document.getElementById('hasilTotalSembuh');
        fetch(any[1])
            .then(res => res.json())
            .then(result => {
                totalSembuh.innerHTML = result.name;
                let hasil = result.value;
                let hasilBaru = hasil.substring(0, 3)
                hasilTotalSembuh.innerHTML = `${hasilBaru} jt`;
            });

        // Data Meninggal
        const totalMeninggal = document.getElementById('totalMeninggal');
        const hasilTotalmeninggal = document.getElementById('hasilTotalmeninggal');
        fetch(any[2])
            .then(res => res.json())
            .then(result => {
                totalMeninggal.innerHTML = result.name;
                hasilTotalmeninggal.innerHTML = result.value;
            });
    });
}

// Masukkan API
tampilDataCovidGlobal("https://api.kawalcorona.com/positif", "https://api.kawalcorona.com/sembuh", "https://api.kawalcorona.com/meninggal");

// Pencarian data berdasarkan Negara
const input = document.getElementById('input');
const button = document.getElementById('button');
const containerHasil = document.getElementById('container-hasil');

button.addEventListener('click', function(){
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${input.value}`)
        .then(res => res.json())
        .then(result => {
            let hasil =`<div class="card-body">
                            <h5 class="card-title">${result.All.country}</h5>
                            <p class="card-text">Ibu Kota : ${result.All.capital_city}</p>
                            <p class="card-text">Populasi : ${result.All.population.toLocaleString('id-ID')}</p>
                            <p class="card-text"><small class="text-muted">update : ${result.All.updated}</small></p>
                        </div>
                        <div class="card border-primary mb-3 mt-3" style="max-width: 18rem; max-height: 6rem;">
                            <div class="card-header">Total Kasus</div>
                            <div class="card-body text-primary">
                              <h5 class="card-title">${result.All.confirmed.toLocaleString('id-ID')}</h5>
                            </div>
                        </div>
                        <div class="card border-primary mb-3" style="max-width: 18rem; max-height: 6rem;">
                            <div class="card-header">Sembuh</div>
                            <div class="card-body text-primary">
                              <h5 class="card-title">${result.All.recovered.toLocaleString('id-ID')}</h5>
                            </div>
                        </div>
                        <div class="card border-primary mb-3" style="max-width: 18rem; max-height: 6rem;">
                            <div class="card-header">Meninggal Dunia</div>
                            <div class="card-body text-primary">
                              <h5 class="card-title">${result.All.deaths.toLocaleString('id-ID')}</h5>
                            </div>
                        </div>`
          containerHasil.innerHTML = hasil;
        })
})

// fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia')
//     .then(res => res.json())
//     .then(result => console.log(result))