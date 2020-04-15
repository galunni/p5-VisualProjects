/*   labyrinthTiles 
Tiles generator - giovanni 2020
// inspired by 10 PRINT book   */
"use strict";

let sketch = function( p5 ) {
  
  let spc = 24;   //tile size: value btw. 5 and 200
  let r = 0.5;    // tile pattern orientation probability, value btw. 0 and 1
  let weight = 1; // strokeWeight (line thickness), value btw. 1 and 10
  // checkboxes for tile boundaries and shape filling
  let checkBoxBoundaries, checkBoxFilled;
  let slSpc, slR, slWeight; // sliders for size, rotation and strokeWeight
  let txtSpc, txtR, txtWeight ; // sliders labels: size rotation, strokeWeight
  let renderUpdate = false, showTilesBoundaries = false, showFillShapes =false;
  // color pickers for background, line stroke and shapes filler
  let bgColorPicker, strokeColorPicker, fillColorPicker;
  let saveButton;
  
  p5.checkEventBoundaries = function(){
    showTilesBoundaries = !showTilesBoundaries;
    renderUpdate = true;
  };
  
  p5.checkEventFilled = function(){
    showFillShapes = !showFillShapes;
    renderUpdate = true;
  };
  
  
  p5.setup = function() {
    p5.createCanvas(800, 500);
    slSpc = p5.createSlider(5, 200, 25, 1); // slider for size
    slSpc.position(10, p5.height + 70);
    slR = p5.createSlider(0, 1, 0.5, 0.01);  // slider for rotation
    slR.position(200, p5.height + 70);
    slWeight = p5.createSlider(1, 10, 1, 1);  // slider for strokeWeight
    slWeight.position(400, p5.height + 70);
    
    txtSpc = p5.createDiv("tiles size: " + spc );
    txtSpc.position(30, p5.height + 90);
    txtR = p5.createDiv("orientation: " + r );
    txtR.position(210, p5.height + 90);
    txtWeight = p5.createDiv("strokeWeight: " + weight );
    txtWeight.position(420, p5.height + 90);
    
    checkBoxBoundaries = p5.createCheckbox( "show tiles boundaries ", false);
    checkBoxBoundaries.changed(p5.checkEventBoundaries);
    
    checkBoxFilled = p5.createCheckbox( "fill shapes ", false);
    checkBoxFilled.changed(p5.checkEventFilled);
    
    bgColorPicker = p5.createColorPicker( "#0554F2 "); // background picker
    bgColorPicker.position(245, p5.height + 30);
    bgColorPicker.input( () => renderUpdate = true );
    strokeColorPicker = p5.createColorPicker(p5.color( "#4CB1F7 "));//strk picker
    strokeColorPicker.position(450, p5.height + 30);
    strokeColorPicker.input( () => renderUpdate = true );
    fillColorPicker = p5.createColorPicker(p5.color( "#9af ")); // fill picker
    fillColorPicker.position(115, p5.height + 45);
    fillColorPicker.input( () => { if(showFillShapes) renderUpdate = true; } );
    
    saveButton = p5.createButton( "Save Image ");
    saveButton.position(600, p5.height + 50);
    saveButton.mousePressed( () => { p5.save("labyrinthTiles"); });
    
    p5.frameRate(5);
  };
  
  p5.draw = function() {
    if (spc !== slSpc.value() || r !== slR.value() || 
    weight !== slWeight.value() || renderUpdate) {
      renderUpdate = false;
      spc = slSpc.value();
      r = slR.value();
      weight = slWeight.value();
      txtSpc.html("tiles size: " + spc );
      txtR.html("orientation: " + r );
      txtWeight.html("strokeWeight: " + weight );
      
      p5.strokeWeight(slWeight.value());
      p5.stroke(strokeColorPicker.color());
      p5.background(bgColorPicker.color());
      
      if(showFillShapes) p5.fill(fillColorPicker.color());
      else p5.noFill();
      
      for (var x = 0; x < p5.width; x += spc) {
        for (var y = 0; y < p5.height; y += spc) {
          if (p5.random() < r) {  // UP LEFT oriented lines and arcs
            p5.line(x, y, x + spc, y + spc);
            p5.arc(x + spc/2, y + spc/2, spc, spc, 
                            p5.PI+ p5.HALF_PI, p5.TWO_PI);
            p5.arc(x + spc/2, y + spc/2, spc, spc, p5.HALF_PI, p5.PI);
          } else {    // UP RIGHT oriented lines and arcs
            p5.line(x + spc, y, x, y + spc);
            p5.arc(x + spc/2, y + spc/2, spc, spc, p5.PI, p5.PI+ p5.HALF_PI);
            p5.arc(x + spc/2, y + spc/2, spc, spc, 0, p5.HALF_PI);
          }
          if(showTilesBoundaries){ 
            p5.noFill();
            p5.rect(x,y,spc,spc);
            if(showFillShapes) p5.fill(fillColorPicker.color());
          }
        }
      }
    }
  };
};

let myp5 = new p5(sketch);