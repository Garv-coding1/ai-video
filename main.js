status = "";
video = "";
objects = [];
filterstat = "";
 
function preload() {
    video = createVideo('video.mp4');
    video.hide();
 
}

function setup() {
    canvas = createCanvas(370, 370);
    canvas.center();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_value").innerHTML = "Detecting Objects";
}

function draw() {
    image(video, 0, 0, 370, 370);

    if (filterstat == "INVERT") {
        filter(INVERT);
}
else if (filterstat == "GRAY") {
    filter(GRAY);
}

    

    if (status != "") {
        objectDetector.detect(video, getResults);
    
        for (i=0; i<objects.length; i++) {
            document.getElementById("status_value").innerHTML = "Objects Detected!";
            document.getElementById("number_value").innerHTML = objects.length;

            fill("#FFA500");
            percent = floor(objects[i].confidence*100) + "% ";
            text(objects[i].label + " " + percent, objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke("#FFA500");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function stop() {
video.stop();
}

function pause() {
video.pause();
}

function getResults(error, results) {
if (error) {
    console.error(error);
}
else {
    console.log(results);
    objects = results;
}
}

function invert() {
   filterstat = "INVERT";

}

function gray() {
    filterstat = "GRAY";
}
