document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-button");
    const closeButton = document.getElementById("close-button");
    const saveButton = document.getElementById("save-button");
    const modalContainer = document.getElementById("modal-container");
    const notesList = document.getElementById("notes-list");
    getNotes();

    function getNotes() {
        // Cek di dalam local storage ada notes ga, kalau ada di ubah ke array javascript terus di render, kalau ga ada di buat empty array
        const notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];

        renderNotes(notes);
    }

    function renderNotes(notes) {
        //Kosongin dulu biar ga ada duplikasi
        notesList.innerHTML = '';

        //Create elemen buat Itemnya, terus di dalam noteitem kita tambahin titel sama description
        notes.forEach(note => {
            const noteItem = document.createElement("div");
            noteItem.classList.add("note-item");
            noteItem.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.description}</p>
                `;
            notesList.appendChild(noteItem);
        });
    }

    addButton.addEventListener("click", () => {
        modalContainer.classList.add("show");
    })

    closeButton.addEventListener("click", () => {
        modalContainer.classList.remove("show");
    })

    saveButton.addEventListener("click", () => {
        const title = document.getElementById("note-title").value;
        const description = document.getElementById("note-description").value;

        const newNote = {
            id: Date.now(),
            title: title,
            description: description
        }

        const notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
        notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(notes));

        document.getElementById("note-title").value = "";
        document.getElementById("note-description").value = "";

        modalContainer.classList.remove("show");
        getNotes();
        //1. Ambil isi dari title sama description
        //2. Buat object new note dengan id tanggal dna jam
        //3. Ambil notes dari local storage dan ubah lagi ke javascript array
        //4. Push newNotes ke array notes
        //5. Simpan lagi ke dalam localstorage dengan bentuk string json
    })
})