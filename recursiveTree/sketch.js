let slLeavesSize;    // slider for leaves size
let leavesSize = 15; // default leaves size
let slLevel;         // slider for branches depth
let level = 6;       // branches depth
let slStrokeW;       // slider for strokeWeight
let strokeW = 5;     // default strokeWeight
let showLeaves = true;
let progressiveBranches = true;  // progressive thickness of branches
let randomAL = false; // random branch angle and length
let ral = 0;         // random angle and length index
let angle = 0;
let slAngle;         // slider for angle
let slBranchAngle;   // slider for branch angle
let branchAngle = 0.5;
let randomButton;
let restartButton;
let bgColorPicker;       // background colorPicker
let branchColorPicker;   // branch stroke colorPicker
let leavesColorPicker;     // leaves fill colorPicker

function setup() {
  createCanvas(650, 500);
  setupSliders();
}

function draw() {
  background(bgColorPicker.color());
  stroke(branchColorPicker.color());
  fill(leavesColorPicker.color());

  leavesSize = slLeavesSize.value();
  txtLeavesSize.html("leaves size: " + leavesSize);
  
  level = slLevel.value();
  txtLevel.html("branches level: " + level);
  
  strokeW = slStrokeW.value();
  txtStrokeW.html("branches thickness: " + strokeW);

  angle = slAngle.value();
  txtAngle.html("tree angle: " + angle);
  
  branchAngle = slBranchAngle.value();
  txtBranchAngle.html("Branch angle: " + branchAngle);

  txtRal.html("Random</br>level " + Math.floor(ral * 10));

  txtAutoRender.html('Autorender<b class="' + (
      (ral === 0) ? 
      'on">ON' : 
      'off">OFF'
      ) + "</b>");
  
  translate(width / 2, height - 100);  // move root to the center bottom

  rami(level);
}

function rami(level) { // level represents branch depth
  if (level > 0) {
    if(progressiveBranches && strokeW >=1){
      strokeWeight(level + strokeW/8);
    }
    else{
      strokeWeight(strokeW);
    }
    let len = 2 + level * 7 + random(-ral*30,ral*40);
    line(0, 0, 0, -len);  // draw branch
    translate(0, -len);   // move to the top of drawed branch

    push();  // draw right side branches
    rotate(branchAngle + angle + random(-ral, ral));
    rami(level - 1);
    pop();

    push();  // draw left side branches
    rotate(-branchAngle + angle + random(-ral, ral));
    rami(level - 1);
    pop();
    
  } else {             // after last branch level
    if (showLeaves) {  // draw leaves
      noStroke();
      ellipse(0, 0, leavesSize*2, leavesSize);
    }
  }
}
