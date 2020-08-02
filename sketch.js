let classifier;
let video;
let label = "";

let constraints=0;    //カメラ変更


function setup() {

    if (!constraints) {
        //constraints = { video: true, audio: false };
        constraints = {video: {facingMode: 'environment'}, audio: false }; //'user'          
    }
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();

    classifier = ml5.imageClassifier("MobileNet", video, modelLoaded);

    //ボタンの追加
    CamChangeButton1=createButton("CamChange[背面]");
    CamChangeButton1.mousePressed(CamChangeBak);
    CamChangeButton1.size(200,30);
    CamChangeButton1.position(width/2 - 210, height);
    
    CamChangeButton2=createButton("CamChange[顔面]");
    CamChangeButton2.mousePressed(CamChangeFront);
    CamChangeButton2.size(200,30);
    CamChangeButton2.position(width/2 + 10, height);
}
function CamChangeBak(){
    //if (!constraints) {
        //constraints = { video: true, audio: true };
        constraints = {
           video: {
            // スマホのバックカメラを使用
            facingMode: 'user'//'environment' //'user'BAK
        }, audio: false };          
    //}
    //createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
}
function CamChangeFront(){
    //if (!constraints) {
        //constraints = { video: true, audio: true };
        constraints = {
           video: {
            // スマホのバックカメラを使用
            facingMode: 'environment'//'environment' //'user'BAK
        }, audio: false };          
    //}
    //createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
}


function draw() {
    image(video, 0, 0);
    fill(0);
    textSize(20);
    strokeWeight(5);
    stroke(255, 255, 255);
    text("これは何でしょう？",10,height - 50)
    text(label, 10, height - 10);
}

function modelLoaded() {
    console.log("Model Loaded!");
    classifier.predict(gotResults);
}

function gotResults(err, results) {
    if (err) {
        console.error(err);
    } else {
        console.log(results);
        label = results[0].className;
        classifier.predict(gotResults);
    }
}