
function Init() {
	var canvas = document.getElementById("MainCanvas");
	var ctx = canvas.getContext("2d");
	let x=0;
	let y = canvas.height/2;

	function Update() {

		ctx.fillStyle = "#888888";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "#ff0808";
		ctx.fillText("Hello ForwardJS", x, y)
		x=(x+1)%canvas.width;
		requestAnimationFrame(Update);
	}


	
	Update();
	
}

Init();
