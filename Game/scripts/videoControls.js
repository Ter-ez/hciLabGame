function setupVideo () {
    // get video
      let video = document.getElementById('introVideo')
      // Play the video, this is optional
      video.play();
      // Add a listener to this video, so that when the video ends, the video is "hidden".
      video.addEventListener('ended', function() {
      // hide video
        video.style.display = "none";
        let infoDivEl = document.querySelector("#screenDiv");

        infoDivEl.innerHTML = "You are a perspective student of FI MU and a future member of the HCI Lab. <br> You were told to come here for an inteview, but no one is here and suddenly, the door slams shut. You try to open it, but it is locked.<br> You look around, see a little raccoon in the corner and decide to talk to him. What the hell is going on?! <br><br><br><br><br><br> GO TALK TO COO"

        setTimeout(() => {
            infoDivEl.style.display = "block"
        }, 500);

        setTimeout(() => {
            infoDivEl.style.display = "none"
        }, 8000); 
    })
    }