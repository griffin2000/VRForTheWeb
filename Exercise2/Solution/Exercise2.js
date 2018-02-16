
function Init() {
	var canvas = document.getElementById("MainCanvas");
	renderer = new THREE.WebGLRenderer( { canvas} );

	function Update() {
		renderer.setClearColor ( 0x00ff00 )
		renderer.clearColor (  )
			
		requestAnimationFrame(Update);
	}


	
	Update();
	
}

Init();
