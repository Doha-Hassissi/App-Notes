const showform=document.querySelector("#showform");
const overlay=document.querySelector(".overlay");
const addnoteform = document.querySelector(".form");
// show form
showform.addEventListener("click",()=>{
    overlay.classList.add("showoverlay");
    addnoteform.style.bottom="0%";
});
// remove ovelay
overlay.addEventListener("click",()=>{
    overlay.classList.remove("showoverlay");
    addnoteform.style.bottom="-100%";
});

// btn(span)
const allbtn=document.getElementById("allbtn");
const donebtn=document.getElementById("donebtn");
const pendingbtn=document.getElementById("pendingbtn");

function countnote(){
    // les notes
    const notes=document.querySelectorAll(".note");
    const doneNotes = document.querySelectorAll(".note-done");
    const pendingNotes = document.querySelectorAll(".note-pending");
    allbtn.textContent=notes.length;
    donebtn.textContent=doneNotes.length;
    pendingbtn.textContent=pendingNotes.length;
   
}

// add note 
const addNoteBtn = document.getElementById("addnotebtn");
const textarea = document.querySelector(".form textarea");
const noteContainer = document.querySelector(".notes_container");

// cree note

function createNote(text) {
    const newnote = document.createElement("div");
    newnote.classList.add("note", "note-pending"); 
    newnote.innerHTML = `
        <p>${text}</p>
        <button></button>
        <span>${new Date().toLocaleString()}</span>
    `;

    noteContainer.appendChild(newnote);

    // (pending <=> done)
    const btn = newnote.querySelector("button");
    btn.addEventListener("click", () => {
        if (newnote.classList.contains("note-pending")) {
            newnote.classList.remove("note-pending");
            newnote.classList.add("note-done");
        } else {
            newnote.classList.remove("note-done");
            newnote.classList.add("note-pending");
        }
        countnote(); 
    });

    countnote(); 
}
//  ajouter note est masquer overlay form
addNoteBtn.addEventListener("click", () => {
    const text = textarea.value.trim();
    if (!text) return; 

    createNote(text);     
    textarea.value = "";   

    overlay.classList.remove("showoverlay");
    addnoteform.style.bottom = "-100%";
});

// search

const searchinput = document.getElementById("searchinput");
searchinput.addEventListener("input", () => {
    const searchTerm = searchinput.value.toLowerCase();
    const notes = noteContainer.querySelectorAll(".note");

    notes.forEach(note => {
        const text = note.querySelector("p").textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            note.style.display = "block";  // afficher
        } else {
            note.style.display = "none"; //cacher
        }
    });
});
