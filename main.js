document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-button");
    const closeButton = document.getElementById("close-button");
    const saveButton = document.getElementById("save-button");
    const modalContainer = document.getElementById("modal-container");
    const notesList = document.getElementById("notes-list");
    let editing = null;
    getNotes();

    function getNotes() {
        // Cek di dalam local storage ada notes ga, kalau ada di ubah ke array javascript terus di render, kalau ga ada di buat empty array
        const notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];

        renderNotes(notes);
    }

    function renderNotes(notes) {
        //Kosongin dulu biar ga ada duplikasi
        notesList.innerHTML = '';

        //Create elemen buat Itemnya, terus di dalam noteitem kita tambahin title sama description. buat button kita pakai class delete-button
        notes.forEach(note => {
            const noteItem = document.createElement("div");
            noteItem.classList.add("note-item");
            noteItem.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.description}</p>
                <button class="delete-button" data-note-id="${note.id}">Delete</button>
                <button class="edit-button" data-note-id="${note.id}">Edit</button>
                `; //tambahain data-node-id (data-* itu ngebuat custom data atribut) biar kita panggil nanti untuk cari id yang mau kita edit/delete/dll
            notesList.appendChild(noteItem);
        });
    }

    addButton.addEventListener("click", () => {
        const modalTitle = document.getElementById("modal-title");
        modalTitle.innerText = "Add a New Note"; //Kita set modal title jadi Add a New Note
        document.getElementById("note-title").value = ""; //Kosongin input title
        document.getElementById("note-description").value = ""; //Kosongin input description
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

        if(editing) {
            newNote.id = parseInt(editing); //Kalau editing, id di newNote kita ganti ke id dari editing
            const notes = JSON.parse(localStorage.getItem("notes")) || []; // Kita ambil dulu notes dari local storage terus ubah ke array js
            const updatedNotes = notes.map(note => note.id === parseInt(editing) ? newNote : note); //Terus kita buat map yang berisi semua notes yang ada, tapi kita cek apakah note id yang sedang kita tmabah sama ata ga
                                                                                                    // Kalau sama, kita ganti yang idnya sama pakai newNote, kalau ga pakai nilai lama
            localStorage.setItem("notes", JSON.stringify(updatedNotes)); //Kita set lagi notes ke json string
            editing = null;
        } else {
            const notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
            notes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(notes));
        }

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

    notesList.addEventListener("click", (event) => {
        //Kita pasang event listener di notesList (event delegation) biar kita gak pasang di setiap tombol delete
        if(event.target.classList.contains("delete-button")) { // Kalau yang dipencetnya tombol delete,
            const noteToDelete = event.target.dataset.noteId; //kita ambil id pakai custom atribut data-* tadi
            const notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []; //ambil notes kalau ada
            const updatedNotes = notes.filter(note => note.id !== parseInt(noteToDelete)); // Kita filter dan buat array baru updatedNotes yang isinya semua note item selain yang sama dengan note.id yang dicari
            localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Kita simpan lagi ke localstorage jadi json string
            getNotes();
        }
        if(event.target.classList.contains("edit-button")) {
            editing = event.target.dataset.noteId;
            const notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
            const modalTitle = document.getElementById("modal-title");
            const noteTitle = document.getElementById("note-title");
            const noteDescription = document.getElementById("note-description");
            modalTitle.innerText = "Edit Note";
            noteTitle.value = notes.find(note => note.id === parseInt(editing)).title;
            noteDescription.value = notes.find(note => note.id === parseInt(editing)).description;

            modalContainer.classList.add("show");
        }
    })
})