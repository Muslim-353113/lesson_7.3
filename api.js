
const { addHistory } = require("./history");

const BASE_API = "http://localhost:3000/users";

async function requester(method, id = "", payload) {
    const url = `${BASE_API}${id ? `/${encodeURIComponent(id)}` : ""}`;

    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (payload !== undefined) {
        options.body = JSON.stringify(payload);
    }

    let response;

    try {
        response = await fetch(url, options);
    } catch (error) {
        addHistory(method, url, "Ошибка сети");
        throw error;
    }

    const text = await response.text();

    let data;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    addHistory(method, url, response.status);

    if (!response.ok) {
        const error = new Error(
            data?.message || `Ошибка HTTP: ${response.status}`
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return {
        data,
        status: response.status
    };
}

module.exports = {
    requester
};
