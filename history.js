
const moment = require("moment");

require("moment/locale/ru");
moment.locale("ru");

const HISTORY_KEY = "usersApiHistory";

function getHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
}

function saveHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function addHistory(method, url, status) {
    const history = getHistory();

    history.unshift({
        method,
        url,
        status,
        time: Date.now()
    });

    saveHistory(history.slice(0, 50));
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById("historyList");

    if (!container) return;

    const history = getHistory();

    container.replaceChildren();

    history.forEach(item => {
        const row = document.createElement("div");
        row.className = "history-item";

        const exactTime = moment(item.time).format("DD.MM.YYYY HH:mm:ss");
        const relativeTime = moment(item.time).fromNow();

        row.textContent =
            `${item.method} | ${item.url} | Статус: ${item.status} | ${exactTime} (${relativeTime})`;

        container.appendChild(row);
    });
}

function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
}

function startHistoryUpdates() {
    renderHistory();

    setInterval(renderHistory, 30000);
}

module.exports = {
    addHistory,
    renderHistory,
    clearHistory,
    startHistoryUpdates
};
