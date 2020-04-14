/* 
// labyrinthTiles - giovanni 2020
// inspired by 10 PRINT book 
*/

let spc = 24;   //tile size: value btw. 5 and 200
let r = 0.5;    // rotation: value btw. 0 and 1
let weight = 1; // strokeWeight value btw. 1 and 10
let slSpc;      // slider for size
let slR;        // slider for rotation
let slWeight;   // slider for strokeWeight
let txtSpc;     // text of slider for size
let txtR;       // text of slider for rotation
let txtWeight;  // text of slider for weight
let renderUpdate = false; // true if render update needed
let showTilesBoundaries = false; // tile boundaries check box
let showFillShapes = false;  // true if shapes should be filled
let bgColorPicker;       // background colorPicker
let strokeColorPicker;   // line stroke colorPicker
let fillColorPicker;     // shapes fill colorPicker
let saveButton;

function setup() {
	createCanvas(800, 500);
	slSpc = createSlider(5, 200, 25, 1); // slider for size
	slSpc.position(10, height + 70);
	slR = createSlider(0, 1, 0.5, 0.01);  // slider for rotation
	slR.position(200, height + 70);
	slWeight = createSlider(1, 10, 1, 1);  // slider for strokeWeight
	slWeight.position(400, height + 70);
	
	txtSpc = createDiv("tiles size: " + spc );
	txtSpc.position(30, height + 90);
	txtR = createDiv("orientation: " + r );
	txtR.position(210, height + 90);
	txtWeight = createDiv("strokeWeight: " + weight );
	txtWeight.position(420, height + 90);
	
	checkBoxBoundaries = createCheckbox('show tiles boundaries', false);
	checkBoxBoundaries.changed(checkEventBoundaries);
	
	checkBoxFilled = createCheckbox('fill shapes', false);
	checkBoxFilled.changed(checkEventFilled);
	
	bgColorPicker = createColorPicker('#0554F2'); // background picker
	bgColorPicker.position(245, height + 30);
	bgColorPicker.input( () => renderUpdate = true );
	strokeColorPicker = createColorPicker(color('#4CB1F7'));  // stroke picker
	strokeColorPicker.position(450, height + 30);
	strokeColorPicker.input( () => renderUpdate = true );
	fillColorPicker = createColorPicker(color('#9af')); // fill picker
	fillColorPicker.position(115, height + 45);
	fillColorPicker.input( () => {if(showFillShapes) renderUpdate = true;} );
	
	saveButton = createButton('Save Image');
	saveButton.position(600, height + 50);
	saveButton.mousePressed( () => { save("labyrinthTiles"); });
	
	frameRate(5);
}

function draw() {
	if (spc !== slSpc.value() || r !== slR.value() || 
	weight !== slWeight.value() || renderUpdate) {
		renderUpdate = false;
		spc = slSpc.value();
		r = slR.value();
		weight = slWeight.value();
		txtSpc.html("tiles size: " + spc );
		txtR.html("orientation: " + r );
		txtWeight.html("strokeWeight: " + weight );
		
		strokeWeight(slWeight.value());
		stroke(strokeColorPicker.color());
		background(bgColorPicker.color());
		
		if(showFillShapes) fill(fillColorPicker.color());
		else noFill();
		
		for (var x = 0; x < width; x += spc) {
			for (var y = 0; y < height; y += spc) {
				if (random() < r) {
					line(x, y, x + spc, y + spc);
					arc(x + spc/2, y + spc/2, spc, spc, PI + HALF_PI, TWO_PI);
					arc(x + spc/2, y + spc/2, spc, spc, HALF_PI, PI);
				} else {
					line(x + spc, y, x, y + spc);
					arc(x + spc/2, y + spc/2, spc, spc, PI, PI + HALF_PI);
					arc(x + spc/2, y + spc/2, spc, spc, 0, HALF_PI);
				}
				if(showTilesBoundaries){ 
					noFill();
					rect(x,y,spc,spc);
					if(showFillShapes) fill(fillColorPicker.color());
				}
			}
		}
	}
	//save();
}

function checkEventBoundaries(){
	showTilesBoundaries = !showTilesBoundaries;
	renderUpdate = true;
}

function checkEventFilled(){
	showFillShapes = !showFillShapes;
	renderUpdate = true;
}