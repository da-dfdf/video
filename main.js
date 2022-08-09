video = "";
status = "";
objects = [];

function preload(){
 video = createVideo("video.mp4");
 video.hide();
}

function setup(){
    canvas = createCanvas(580,480);
    canvas.center();
}

function draw(){
    image(video,0,0,580,480);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
           document.getElementById("status").innerHTML = "Status: Objects Detected";
           document.getElementById("objects").innerHTML = "Objects Detected:" + objects.length;

           fill("green");
           confidence = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + confidence + "%", objects[i].x, objects[i].y);
           stroke("green");
           noFill();
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
    

}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
     console.log("model loaded");
     status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
} 
function gotResults(error, results){
     if(error){
        console.error(error);
     }
     console.log(results);
    objects = results;

}
