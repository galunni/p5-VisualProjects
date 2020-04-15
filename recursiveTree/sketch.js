/* recursiveTree generator 
//   giovanni 2020  */
"use strict";

// slider, label and value for leaves size
let slLeavesSize, txtLeavesSize, leavesSize = 5;
let slLevel, txtLevel, level = 6; //slider label and value for branches depth
let checkboxLeaves, showLeaves = true; // checkbox and switch for show leaves
// slider, label and default value for branches thickness
let slStrokeW, txtStrokeW, strokeW = 5;
// checkbox and boolean switch variable for progressive branches thickness
let checkboxStrokeW, progressiveBranches = true;
//label set and reset buttons for random branches angle and length
let ral = 0, txtRal, randomButton, restartButton;
let slAngle, txtAngle, angle = 0; // slider, label and value for tree angle
// slider, label and value for branches angle
let slBranchAngle, txtBranchAngle, branchAngle = 0.5;
// color pickers for background, branches stroke and leaves fill
let bgColorPicker, branchColorPicker, leavesColorPicker;
let txtBgC, txtBraC, txtLeavesC; // text labels for color pickers
let txtAutoRender;      // text label for autorender ON / OFF
let saveButton;         // saving file button

function setup() {
  createCanvas(650, 500); // width x height
  setupIDE();  // creates and setup sliders, labels checkboxes and buttons
}

function draw() {
  background(bgColorPicker.color());  // set background color
  stroke(branchColorPicker.color());  // set branches color
  fill(leavesColorPicker.color());    // set leaves color
  
  updateLabels();
  
  translate(width / 2, height - 100);  // move tree root to the center bottom
  
  createBranch(level);                // call recursive branches creator
}

function createBranch(level) { // level represents branch depth
  if (level > 0) {
    if(progressiveBranches && strokeW >=1){
      strokeWeight(level + strokeW/8);
    }
    else{
      strokeWeight(strokeW);
    }
    let len = 2 + level * 7 + random(-ral * 30, ral * 40);
    line(0, 0, 0, -len);  // draw branch
    translate(0, -len);   // move to the top of drawed branch
    
    push();  
    rotate(branchAngle + angle + random(-ral, ral));
    createBranch(level - 1); // recursive call for right side branches
    pop();
    
    push();
    rotate(-branchAngle + angle + random(-ral, ral));
    createBranch(level - 1); // recursive call for left side branches
    pop();
    
  } else {             // after last branch level
    if (showLeaves) {  // draw leaves
      noStroke();
      ellipse(0, 0, leavesSize * 2, leavesSize);
    }
  }
}

function setupIDE() {
  // LeavesSize
  slLeavesSize = createSlider(5, 50, 5, 1);
  txtLeavesSize = createDiv("");
  txtLeavesSize.position(10, height + 20);
  
  // branches level
  slLevel = createSlider(1, 10, 6, 1);
  txtLevel = createDiv("");
  txtLevel.position(140, height + 20);
  
  // show leaves checkbox
  checkboxLeaves = createCheckbox("show leaves", true);
  checkboxLeaves.position(10, height + 40);
  checkboxLeaves.changed( checkEventLeaves );
  
  // branches stroke thickness
  slStrokeW = createSlider(1, 25, 5, 1);
  txtStrokeW = createDiv("");
  txtStrokeW.position(270, height + 20);
  
  // branches angle
  slAngle = createSlider(-1, 1, 0, 0.01);
  txtAngle = createDiv("");
  txtAngle.position(430, height + 20);
  
  // branches progressive thickness checkbox
  checkboxStrokeW = createCheckbox("progressive thickness", true);
  checkboxStrokeW.position(130, height + 40);
  checkboxStrokeW.changed( checkEventStrokeW );
  
  // branch angle slider and text
  slBranchAngle = createSlider(0, 1.57, 0.5, 0.01);
  slBranchAngle.position(10, height+60);
  txtBranchAngle = createDiv("");
  txtBranchAngle.position(150, height + 60);
  
  // text for random branch angle and length
  txtRal = createDiv("");
  txtRal.position(430, height + 40); 
  
  // random branches angle and length button
  randomButton = createButton("randomize branches<br/>stop auto rendering");
  randomButton.position(300, height + 45);
  randomButton.mousePressed( increaseRandomValue );
  
  // reset random and restart auto render button
  restartButton = createButton("reset randomization<br/>" + 
  "restart auto rendering");
  restartButton.position(520, height + 45);
  restartButton.mousePressed( () => { ral = 0; loop(); });
  
  // text autoRender info
  txtAutoRender = createDiv("");
  txtAutoRender.position(540, height + 5); 
  
  // background color text label and color selector
  txtBgC = createDiv("");
  txtBgC.position(10, height + 100);
  txtBgC.html("background");
  bgColorPicker = createColorPicker("#eee"); // background picker
  bgColorPicker.position(95 , height + 95 );
  
  // branches color text label and color selector
  txtBraC = createDiv("");
  txtBraC.position(180, height + 100);
  txtBraC.html("branches");
  branchColorPicker = createColorPicker(color("#B48232"));  // branch picker
  branchColorPicker.position(240, height + 95);
  
  // leaves text label and color selector
  txtLeavesC = createDiv("");
  txtLeavesC.position(335, height + 100);
  txtLeavesC.html("leaves");
  leavesColorPicker = createColorPicker(color("#1E821E")); // leaves picker
  leavesColorPicker.position(380, height + 95);
  
  saveButton = createButton("Save Image");
  saveButton.position(500, height + 100);
  saveButton.mousePressed( () => { save("recursiveTree"); });
}

function checkEventLeaves() {
  showLeaves = !showLeaves;
}

function checkEventStrokeW() {
  progressiveBranches = !progressiveBranches;
}

function increaseRandomValue() { 
  loop();
  ral = (ral < .61) ? ral + 0.1 : 0.1; // looping random index
  noLoop();   // stop auto rendering
}


function updateLabels(){
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
  
  txtAutoRender.html('Autorender<b class="' +
  ( (ral === 0) ? 'on">ON' : 'off">OFF' ) + "</b>");
}
