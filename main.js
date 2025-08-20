document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-button");
    const closeButton = document.getElementById("close-button");
    const saveButton = document.getElementById("save-button");
    const modalContainer = document.getElementById("modal-container");

    addButton.addEventListener("click", () => {
        console.log("Kepencet");
        modalContainer.classList.add("show");
    })

    closeButton.addEventListener("click", () => {
        modalContainer.classList.remove("show");
    })
})