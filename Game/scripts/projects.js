const projectsDiv = document.querySelector("#projectsDiv");
const projectsTextDiv = document.querySelector("#projectsTextDiv");

document.querySelector("#iMareCultureBtn").addEventListener("click", () => {
    projectsTextDiv.innerHTML = "This project aims in bringing inherenty ureachable underwater cultural heritage within reach of the wide public by implementing virtual visits, serious games with immersive technologies and underwater AR."
    projectsTextDiv.style.display = "block"
})

document.querySelector("#arGogglesBtn").addEventListener("click", () => {
    projectsTextDiv.innerHTML = "This project aims to develop a sw application for an existing hardware (AR glasses) as an advanced form of flight support for pilots of ultralight aircraft (ULL). The AR glasses technology allows information to be displayed directly into the pilots' field of view or projected onto the glasses."
    projectsTextDiv.style.display = "block"
})

document.querySelector("#caverBtn").addEventListener("click", () => {
    projectsTextDiv.innerHTML = "CAVER is a software tool for analysis and visualization of tunnels and channels in protein tructures. Studying of these pathways is highly imporant for drug design and molecular enzymology."
    projectsTextDiv.style.display = "block"
})

AFRAME.registerComponent('projects-info', {
    init: function() {
        this.el.addEventListener("markerFound", showProjectBtns);
        this.el.addEventListener("markerLost", hideProjectBtns);
    }
});

function showProjectBtns() {
    projectsDiv.style.display = "block"
}

function hideProjectBtns() {
    projectsDiv.style.display = "none";
    projectsTextDiv.style.display = "none"
}