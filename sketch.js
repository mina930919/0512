let video;
let poseNet;
let pose;
let skeleton;
let earImage; // 用於存放耳朵圖片
let earImage2; // 用於存放耳2.png圖片
let eye2Image; // 用於存放eye 2.png圖片
let eyeImage; // 用於存放eye.png圖片
let noseImage; // 用於存放nose.png圖片

function preload() {
  earImage = loadImage('耳.png'); // 載入耳朵圖片
  earImage2 = loadImage('耳2.png'); // 載入耳2.png圖片
  eye2Image = loadImage('eye 2.png'); // 載入eye 2.png圖片
  eyeImage = loadImage('eye.png'); // 載入eye.png圖片
  noseImage = loadImage('nose.png'); // 載入nose.png圖片
}

function setup() {
  createCanvas(640, 480);
	//createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded); //呼叫在ml5.js上的net函數，用此函數來判斷各位置，呼叫成功即執行function modelLoaded 
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;  //把抓到的幾個點，都放置pose變數內
    skeleton = poses[0].skeleton; //把相關於骨架的點都放到skeleton變數內
  }
}


function modelLoaded() {   //顯示pose model已經準備就緒
  console.log('poseNet ready');
}

function draw() {
    background(0);
    translate(video.width, 0);  // 因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
    scale(-1, 1);  // 反轉畫面
    image(video, 0, 0);  // 顯示你的畫面在螢幕上

    if (pose) {
        let eyeR = pose.rightEye;  // 抓到右眼資訊，放到 eyeR
        let eyeL = pose.leftEye;   // 抓到左眼資訊，放到 eyeL
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y); // 算出左右眼的距離，當作鼻子顯示圓的直徑

        // 移除 keypoints[0] 的紅點
        // fill(255, 0, 0);
        // ellipse(pose.nose.x, pose.nose.y, d); // 畫出鼻子的圓

        fill(0, 0, 255);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 62); // 畫出右手腕圓圈
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 62); // 畫出左手腕圓圈

        // 在 keypoints[3] 的位置顯示耳朵圖片
        let earX1 = pose.keypoints[3].position.x;
        let earY1 = pose.keypoints[3].position.y;
        image(earImage, earX1 - 25, earY1 - 25, 50, 50); // 調整圖片大小為 50x50，並將中心對齊

        // 在 keypoints[4] 的位置顯示耳2.png圖片
        let earX2 = pose.keypoints[4].position.x;
        let earY2 = pose.keypoints[4].position.y;
        image(earImage2, earX2 - 25, earY2 - 25, 50, 50); // 調整圖片大小為 50x50，並將中心對齊

        // 在 keypoints[1] 的位置顯示 eye 2.png 圖片
        let eye2X = pose.keypoints[1].position.x;
        let eye2Y = pose.keypoints[1].position.y;
        image(eye2Image, eye2X - 25, eye2Y - 25, 50, 50); // 調整圖片大小為 50x50，並將中心對齊

        // 在 keypoints[2] 的位置顯示 eye.png 圖片
        let eyeX = pose.keypoints[2].position.x;
        let eyeY = pose.keypoints[2].position.y;
        image(eyeImage, eyeX - 25, eyeY - 25, 50, 50); // 調整圖片大小為 50x50，並將中心對齊

        // 在 keypoints[0] 的位置顯示 nose.png 圖片
        let noseX = pose.keypoints[0].position.x;
        let noseY = pose.keypoints[0].position.y;
        image(noseImage, noseX - 25, noseY - 25, 50, 50); // 調整圖片大小為 50x50，並將中心對齊

        drawKeypoints();
        drawSkeleton();
    }
}

function drawKeypoints()  {  
    for (let i = 0; i < pose.keypoints.length; i++) {
      // 移除 keypoints[0]~[4] 的點
      if (i >= 0 && i <= 4) continue;
      let x = pose.keypoints[i].position.x;//找出每一個點的x座標
      let y = pose.keypoints[i].position.y;//找出每一個點的y座標
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
    //print(pose.keypoints.length)
}
function drawSkeleton()  {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];			
      strokeWeight(2);
      stroke(255,0,0);
      line(a.position.x, a.position.y,b.position.x,b.position.y);			
    }
  }

