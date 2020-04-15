"use strict";
/* recursiveTree - giovanni 2020  */

// slider, label and value for leaves size
let slLeavesSize, txtLeavesSize, leavesSize = 5;
let slLevel, txtLevel, level = 6; //slider label and value for branches depth
let checkboxLeaves, showLeaves = true; // checkbox and switch for show leaves
// slider, label and default value for branches thickness
let slStrokeW, txtStrokeW, strokeW = 5;
// checkbox and boolean switch variable for progressive branches thickness
let checkboxStrokeW, progressiveBranches = true;
//switch value label set and reset buttons for random branches angle and length
let randomAL = false, ral = 0, txtRal, randomButton, restartButton;
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
  setupSliders();  // creates and setup sliders, labels checkboxes and buttons
}

function draw() {
  background(bgColorPicker.color());  // set background color
  stroke(branchColorPicker.color());  // set branches color
  fill(leavesColorPicker.color());    // set leaves color
  
  updateLabels();
  
  translate(width / 2, height - 100);  // move tree root to the center bottom
  
  createBranch(level);
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
