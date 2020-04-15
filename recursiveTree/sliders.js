function setupSliders() {
    slLeavesSize = createSlider(5, 50, 5, 1);
    txtLeavesSize = createDiv("");
    txtLeavesSize.position(10, height + 20);
    
    slLevel = createSlider(1, 10, 6, 1);
    txtLevel = createDiv("");
    txtLevel.position(140, height + 20);
    
    checkboxLeaves = createCheckbox('show leaves', true);
    checkboxLeaves.position(10, height + 40);
    checkboxLeaves.changed(checkEventLeaves);
    
    slStrokeW = createSlider(1, 25, 5, 1);
    txtStrokeW = createDiv("");
    txtStrokeW.position(270, height + 20);
    
    slAngle = createSlider(-1, 1, 0, 0.01);
    txtAngle = createDiv("");
    txtAngle.position(430, height + 20);
    
    checkboxStrokeW = createCheckbox('progressive thickness', true);
    checkboxStrokeW.position(130, height + 40);
    checkboxStrokeW.changed(checkEventStrokeW);
    
    slBranchAngle = createSlider(0, 1.57, 0.5, 0.01);
    slBranchAngle.position(10, height+60);
    txtBranchAngle = createDiv("");
    txtBranchAngle.position(150, height + 60);

    txtRal = createDiv("");
    txtRal.position(430, height + 40); 
    
    txtAutoRender = createDiv("");
    txtAutoRender.position(540, height + 5); 
    
    randomButton = createButton('randomize branches<br/>stop auto rendering');
    randomButton.position(300, height + 45);
    randomButton.mousePressed( () => { 
        loop();
        ral = (ral < .61) ? ral + 0.1 : 0.1; // looping random index
        noLoop();   // stop auto rendering
    });
    
    restartButton = createButton('reset randomization<br/>restart auto rendering');
    restartButton.position(520, height + 45);
    restartButton.mousePressed( () => { ral = 0; loop(); });
    
    txtBg = createDiv("");
    txtBg.position(10, height + 100);
    txtBg.html("background");
    bgColorPicker = createColorPicker('#eee'); // background picker
    bgColorPicker.position(95 , height + 95 );
    txtBg = createDiv("");
    txtBg.position(180, height + 100);
    txtBg.html("branches");
    branchColorPicker = createColorPicker(color('#B48232'));  // branch picker
    branchColorPicker.position(240, height + 95);
    txtBg = createDiv("");
    txtBg.position(335, height + 100);
    txtBg.html("leaves");
    leavesColorPicker = createColorPicker(color('#1E821E')); // leaves picker
    leavesColorPicker.position(380, height + 95);
    
    saveButton = createButton('Save Image');
    saveButton.position(500, height + 100);
    saveButton.mousePressed( () => { save("recursiveTree"); });
}

function checkEventLeaves() {
    showLeaves = !showLeaves;
}

function checkEventStrokeW() {
    progressiveBranches = !progressiveBranches;
}
