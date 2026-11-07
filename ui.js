
function showResult(status, data) {
    document.getElementById("output").style.display = "block";

    document.getElementById("status").textContent =
        `Статус: ${status}`;

    document.getElementById("result").textContent =
        JSON.stringify(data, null, 2);
}

function renderUsers(users, onSelect) {
    const container = document.getElementById("usersTable");

    container.replaceChildren();

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["ID", "Username", "Description"].forEach(name => {
        const th = document.createElement("th");
        th.textContent = name;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    const tbody = document.createElement("tbody");

    users.forEach(user => {
        const row = document.createElement("tr");

        [user.id, user.username, user.description].forEach(value => {
            const td = document.createElement("td");
            td.textContent = value ?? "";
            row.appendChild(td);
        });

        row.addEventListener("click", () => {
            onSelect(user);
        });

        tbody.appendChild(row);
    });

    table.append(thead, tbody);
    container.appendChild(table);
}

function renderDescriptionFilters(descriptions, onFilter) {
    const container = document.getElementById("descriptionFilters");

    container.replaceChildren();

    const allButton = document.createElement("button");
    allButton.textContent = "Все";
    allButton.addEventListener("click", () => onFilter(null));

    container.appendChild(allButton);

    descriptions.forEach(description => {
        const button = document.createElement("button");

        button.textContent = description;

        button.addEventListener("click", () => {
            onFilter(description);
        });

        container.appendChild(button);
    });
}

module.exports = {
    showResult,
    renderUsers,
    renderDescriptionFilters
};
