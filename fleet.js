fetch("fleet.csv")
  .then(r => r.text())
  .then(csv => {
    const rows = csv.trim().split("\n").map(r => r.split(","));
    const tbody = document.querySelector("#fleet-table tbody");
    for (let i = 1; i < rows.length; i++) {
      const tr = document.createElement("tr");
      rows[i].forEach((cell, idx) => {
        const td = document.createElement("td");
        if (idx === 4) { // Operator logo
          const img = document.createElement("img");
          img.src = `images/${cell.trim()}`;
          img.className = "operator-logo";
          td.appendChild(img);
        } else if (idx === 5) { // Livery screenshot
          const img = document.createElement("img");
          img.src = `liveries/${cell.trim()}`;
          img.className = "livery-image";
          td.appendChild(img);
        } else {
          td.textContent = cell;
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
  })
  .catch(() => {
    document.querySelector("#fleet-table tbody").innerHTML =
      "<tr><td colspan='8'>Could not load fleet data.</td></tr>";
  });