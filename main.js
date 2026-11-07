
const { requester } = require("./api");

const {
    getId,
    validateUser,
    validatePatch
} = require("./validation");

const {
    showResult,
    renderUsers,
    renderDescriptionFilters
} = require("./ui");

const {
    clearHistory,
    startHistoryUpdates
} = require("./history");

const uniq = require("uniq");

const idInput = document.getElementById("userId");
const usernameInput = document.getElementById("username");
const descriptionInput = document.getElementById("description");

const btnGetAll = document.getElementById("btn-get-all");
const btnGetDetail = document.getElementById("btn-get-one");
const btnPost = document.getElementById("btn-post");
const btnPut = document.getElementById("btn-put");
const btnPatch = document.getElementById("btn-patch");
const btnDelete = document.getElementById("btn-delete");
const btnClearHistory = document.getElementById("btn-clear-history");

let allUsers = [];

function selectUser(user) {
    idInput.value = user.id;
    usernameInput.value = user.username || "";
    descriptionInput.value = user.description || "";
}

function applyFilter(description) {
    const filteredUsers = description === null
        ? allUsers
        : allUsers.filter(user => user.description === description);

    renderUsers(filteredUsers, selectUser);
}

async function getAll() {
    try {
        const result = await requester("GET");

        showResult(result.status, result.data);

        allUsers = Array.isArray(result.data) ? result.data : [];

        renderUsers(allUsers, selectUser);

        const descriptions = allUsers
            .map(user => user.description)
            .filter(Boolean);

        const uniqueDescriptions = uniq(descriptions);

        renderDescriptionFilters(
            uniqueDescriptions,
            applyFilter
        );

    } catch (error) {
        showResult(error.status || "Error", error.message);
    }
}

async function getOne() {
    const id = getId(idInput);

    if (id === null) return;

    try {
        const result = await requester("GET", id);

        showResult(result.status, result.data);

        if (result.data) {
            selectUser(result.data);
        }
    } catch (error) {
        showResult(error.status || "Error", error.message);
    }
}

async function create() {
    const user = validateUser(usernameInput, descriptionInput);

    if (user === null) return;

    try {
        const result = await requester("POST", "", user);

        showResult(result.status, result.data);

        await getAll();
    } catch (error) {
        showResult(error.status || "Error", error.message);
    }
}

async function put() {
    const id = getId(idInput);

    if (id === null) return;

    const user = validateUser(usernameInput, descriptionInput);

    if (user === null) return;

    try {
        const result = await requester("PUT", id, user);

        showResult(result.status, result.data);

        await getAll();
    } catch (error) {
        showResult(error.status || "Error", error.message);
    }
}

async function patch() {
    const id = getId(idInput);

    if (id === null) return;

    const payload = validatePatch(usernameInput, descriptionInput);

    if (payload === null) return;

    try {
        const result = await requester("PATCH", id, payload);

        showResult(result.status, result.data);

        await getAll();
    } catch (error) {
        showResult(error.status || "Error", error.message);
    }
}

async function deleteUser() {
    const id = getId(idInput);

    if (id === null) return;

    try {
        const result = await requester("DELETE", id);

        showResult(result.status, result.data);

        await getAll();
    } catch (error) {
        showResult(error.status || "Error", error.message);
    }
}

btnGetAll.addEventListener("click", getAll);
btnGetDetail.addEventListener("click", getOne);
btnPost.addEventListener("click", create);
btnPut.addEventListener("click", put);
btnPatch.addEventListener("click", patch);
btnDelete.addEventListener("click", deleteUser);

btnClearHistory.addEventListener("click", clearHistory);

startHistoryUpdates();
getAll();
