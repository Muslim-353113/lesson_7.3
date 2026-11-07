
function getId(idInput) {
    const id = idInput.value.trim();

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        alert("Укажите корректный ID");
        return null;
    }

    return id;
}

function validateUser(usernameInput, descriptionInput) {
    const username = usernameInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!username || !description) {
        alert("Укажите username и description");
        return null;
    }

    return { username, description };
}

function validatePatch(usernameInput, descriptionInput) {
    const payload = {};

    const username = usernameInput.value.trim();
    const description = descriptionInput.value.trim();

    if (username) payload.username = username;
    if (description) payload.description = description;

    if (Object.keys(payload).length === 0) {
        alert("Укажите хотя бы одно поле для изменения");
        return null;
    }

    return payload;
}

module.exports = {
    getId,
    validateUser,
    validatePatch
};
    