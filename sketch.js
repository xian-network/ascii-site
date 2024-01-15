const density = "XXIANxxxian{}();.,_   ".split("").reverse().join("");

let video;
let asciiDiv;

function setup() {
	asciiDiv = createDiv();
	asciiDiv.parent('p5-container'); // replace 'your-div-id' with the id of your div
	asciiDiv.id("moving-bg");
	noCanvas();
	video = createVideo("xian7_.mp4");
	let { height, width } = video;
	const true_width = width / 3;
	const true_height = height / 5;
	console.log({ true_width, true_height });
	video.size(true_width, true_height);
	video.elt.muted = true;

	video.hide();
	video.elt.onloadeddata = function () {
		video.loop();
		// video.time(0);
		video.elt.playbackRate = 0.75;
	};
}

function draw() {
	video.loadPixels();
	let asciiImage = "";
	let startX = 0;
	let startY = 0;
	let endX = video.width;
	let endY = video.height;
	for (let j = startY; j < endY; j += 1) {
		for (let i = startX; i < endX; i++) {
			const pixelIndex = (i + j * video.width) * 4;
			const r = video.pixels[pixelIndex];
			const g = video.pixels[pixelIndex + 1];
			const b = video.pixels[pixelIndex + 2];
			const avg = r;
			const len = density.length;
			const charIndex = floor(map(avg, 0, 255, 0, len));
			let c;
			c = density.charAt(charIndex); // Use a character based on pixel brightness
			const color = `rgb(0,${g},${b})`;
			if (c == " ") {
				asciiImage += "&nbsp;";
			} else {
				asciiImage += '<span style="color:' + color + '">' + c + "</span>";
			}
		}
		asciiImage += "<br/>";
	}
	asciiDiv.html(asciiImage);
}
