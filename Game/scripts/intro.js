function showIntro (){
    let introDiv = document.querySelector("#infoDiv")
    introDiv.innerHTML = "You are a perspective student of FI MU and you came to visit the HCI Laboratory. Suddenly, the door slams shut behind you. It's locked. After a quick look around, you spot a little raccoon near the door, and you decide to talk to him.. Is he the one who locked you here? <br><br> GO TALK TO COO, THE RACCOON"
    introDiv.style.display = "block"
    setTimeout(() => {
        introDiv.style.display = "none";
    }, 18000);  
}