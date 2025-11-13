const confirmados = [
    { nombre: "Pedro Rodenas", estado: "confirmado", aporte: "S/ 50.00" },
    { nombre: "Carlos Ore", estado: "confirmado", aporte: "S/ 50.00" },
    { nombre: "Junior Ynga", estado: "confirmado", aporte: "S/ 50.00" },
    { nombre: "Hugo Sanchez", estado: "confirmado", aporte: "S/ 50.00" },
    { nombre: "Damaris Palma", estado: "pendiente", aporte: "S/ --" },
    { nombre: "Michelle Alanya", estado: "pendiente", aporte: "S/ --" },
    { nombre: "Daniel Calderon", estado: "pendiente", aporte: "S/ --" },
    { nombre: "Daniel Villafranqui", estado: "pendiente", aporte: "S/ --" },
    { nombre: "Carlos Ramirez", estado: "pendiente", aporte: "S/ --" },
    { nombre: "Josue Huayapa", estado: "pendiente", aporte: "S/ --" },
    { nombre: "Gianfranco Huillca", estado: "confirmado", aporte: "S/ 60.00" },
    { nombre: "Nathali Reyna", estado: "no-ira", aporte: "S/ 00.00" },
];

const btnVerLista = document.getElementById("verListaBtn");
const modal = document.getElementById("modalConfirmados");
const cerrarModal = document.getElementById("cerrarModal");
const listaConfirmados = document.getElementById("listaConfirmados");

let currentPage = 1;
const perPage = 4;

function renderLista(page = 1) {
    listaConfirmados.innerHTML = "";

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const currentItems = confirmados.slice(start, end);

    currentItems.forEach(p => {
        const li = document.createElement("li");
        let estadoClass = "";
        let estadoTexto = "";

        switch (p.estado) {
            case "confirmado":
                estadoClass = "confirmado";
                estadoTexto = "Confirmado";
                break;
            case "pendiente":
                estadoClass = "pendiente";
                estadoTexto = "Pendiente";
                break;
            default:
                estadoClass = "no-ira";
                estadoTexto = "No podrá";
                break;
        }

        li.innerHTML = `
            <span>${p.nombre}</span>
            <span class="estado ${estadoClass}">${estadoTexto}</span>
            <span class="aporte">${p.aporte}</span>
        `;
        listaConfirmados.appendChild(li);
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(confirmados.length / perPage);
    const paginationDiv = document.createElement("div");
    paginationDiv.classList.add("pagination");

    // Crear los botones de páginas
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            renderLista(currentPage);
        });
        paginationDiv.appendChild(btn);
    }

    listaConfirmados.appendChild(paginationDiv);
}

btnVerLista.addEventListener("click", () => {
    currentPage = 1;
    renderLista(currentPage);
    modal.style.display = "flex";
});

cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});
