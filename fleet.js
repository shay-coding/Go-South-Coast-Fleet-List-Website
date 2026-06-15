let allRows = [];

fetch("fleet.csv")
  .then(r => r.text())
  .then(csv => {
    const rows = csv.trim().split("\n").map(r => r.split(","));
    const tbody = document.querySelector("#fleet-table tbody");

    // Store all rows for filtering
    allRows = rows.slice(1); // Skip header

    // Extract unique models and operators
    const models = new Set();
    const operators = new Set();

    allRows.forEach(row => {
      if (row.length > 3) models.add(row[3].trim()); // Model is at index 3
      if (row.length > 4) operators.add(row[4].trim()); // Operator is at index 4
    });

    // Populate model filter
    const modelSelect = document.querySelector("#model-filter");
    Array.from(models).sort().forEach(model => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });

    // Populate operator filter
    const operatorSelect = document.querySelector("#operator-filter");
    Array.from(operators).sort().forEach(operator => {
      const option = document.createElement("option");
      option.value = operator;
      // Remove .png and format display name
      let displayName = operator.replace(/\.png$/i, '');
      // Map abbreviations to full names
      const operatorNames = {
        'sv': 'Southern Vectis',
        'damory': 'Damory',
        'salisbury': 'Salisbury Reds',
        'swindon': 'Swindon\'s Bus Company',
      };
      displayName = operatorNames[displayName.toLowerCase()] || (displayName.charAt(0).toUpperCase() + displayName.slice(1));
      option.textContent = displayName;
      operatorSelect.appendChild(option);
    });

    // Render initial table
    renderTable(allRows);

    // Add filter event listeners
    modelSelect.addEventListener("change", applyFilters);
    operatorSelect.addEventListener("change", applyFilters);
  })
  .catch(() => {
    document.querySelector("#fleet-table tbody").innerHTML =
      "<tr><td colspan='8'>Could not load fleet data.</td></tr>";
  });

function applyFilters() {
  const selectedModel = document.querySelector("#model-filter").value;
  const selectedOperator = document.querySelector("#operator-filter").value;

  const filtered = allRows.filter(row => {
    const modelMatch = !selectedModel || (row[3] && row[3].trim() === selectedModel);
    const operatorMatch = !selectedOperator || (row[4] && row[4].trim() === selectedOperator);
    return modelMatch && operatorMatch;
  });

  renderTable(filtered);
}

function renderTable(rows) {
  const tbody = document.querySelector("#fleet-table tbody");
  tbody.innerHTML = "";

  rows.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach((cell, idx) => {
      const td = document.createElement("td");
      if (idx === 1) { // Reg Plate - make it clickable
        const link = document.createElement("a");
        link.textContent = cell;
        link.href = "#";
        link.style.cursor = "pointer";
        link.style.color = "inherit";
        link.style.textDecoration = "underline";
        link.onclick = (e) => {
          e.preventDefault();
          const regPlate = cell.trim();
          const flickrUrl = `https://www.flickr.com/search/?text=${encodeURIComponent(regPlate)}`;
          const flickrUrl = `https://www.flickr.com/search/?text=${encodeURIComponent(regPlate)}&sort=date-taken-desc`;
          window.open(flickrUrl, "_blank");
        };
        td.appendChild(link);
      } else if (idx === 4) { // Operator logo
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
  });
}
