//help to perform percent rounded to two decimals from: https://codingbeautydev.com/blog/javascript-round-number-to-2-decimal-places/

if (document.readyState !== "loading") {
  console.log("document is ready!");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("document ready after waiting!");
    initializeCode();
  });
}

function initializeCode() {
  fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff")
    .then((response) => response.json())
    .then((jsondata) => {
      fetch(
        "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
      )
        .then((response) => response.json())
        .then((emplymentdata) => {
          const table = document.getElementById("tablebody");

          const municipalities = jsondata.dataset.dimension.Alue.category.label;
          const populationData = jsondata.dataset.value;
          const employmentData = emplymentdata.dataset.value;

          let index = 0;

          for (let x in municipalities) {
            const munc = municipalities[x];
            const pop = populationData[index];
            const emp = employmentData[index];

            const divide = 100 * (emp / pop);

            const emppercent = divide.toFixed(2);

            let tr = document.createElement("tr");

            let muncell = document.createElement("td");
            let popcell = document.createElement("td");
            let empcell = document.createElement("td");
            let emppercentcell = document.createElement("td");
            muncell.innerText = munc;
            popcell.innerText = pop;
            empcell.innerText = emp;
            emppercentcell.innerText = emppercent + "%";
            tr.appendChild(muncell);
            tr.appendChild(popcell);
            tr.appendChild(empcell);
            tr.appendChild(emppercentcell);

            if (emppercent > 45) {
              tr.id = "high-employment";
            } else if (emppercent < 25) {
              tr.id = "low-employment";
            }

            table.appendChild(tr);
            index = index + 1;
          }
        });
    });
}
