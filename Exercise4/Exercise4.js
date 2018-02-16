
function Init() {
	const canvas = document.getElementById("MainCanvas");
	renderer = new THREE.WebGLRenderer( { canvas} );

	renderer.setSize( window.innerWidth, window.innerHeight );
	

	function onPointerRestricted() {
		var pointerLockElement = renderer.domElement;
		if ( pointerLockElement && typeof(pointerLockElement.requestPointerLock) === 'function' ) {
			pointerLockElement.requestPointerLock();

		}
	}

	function onPointerUnrestricted() {
		var currentPointerLockElement = document.pointerLockElement;
		var expectedPointerLockElement = renderer.domElement;
		if ( currentPointerLockElement && currentPointerLockElement === expectedPointerLockElement && typeof(document.exitPointerLock) === 'function' ) {
			document.exitPointerLock();
		}
	}

                           

	let vrDisplay = null;
	
	function enableVR()
	{
		if(!vrDisplay)
			return;
		
		if (vrDisplay.isPresenting)
			vrDisplay.exitPresent()

		vrDisplay.requestPresent([{ source: canvas }]).then((res) => {
			console.log("VR enabled")
		})
	}
	
	const vrButton = document.getElementById("VRButton");
    vrButton.addEventListener("click", enableVR);
	
	
	{
		if (navigator.getVRDisplays === undefined) {
			console.warn("WebVR not available")
		}
		else {
			navigator.getVRDisplays().then((displays ) =>{
				if (displays && displays.length > 0) {
					vrDisplay = displays[0];
					renderer.vr.enabled = true;
					renderer.vr.setDevice(vrDisplay);

					window.addEventListener('vrdisplaypointerrestricted', onPointerRestricted, false);
					window.addEventListener('vrdisplaypointerunrestricted', onPointerUnrestricted, false);

				
				}
				else console.warn("No WebVR devices - not enabled")
				

			}, (err)=>{
				console.error("Error gettting WebVR display "+err)
				
			})
			
		}
	}

					
	const scene = new THREE.Scene();
	
	scene.background = new THREE.Color( 0xC8C8C8 );

	const camera = new THREE.PerspectiveCamera( 70, canvas.width/canvas.height, 0.1, 1000.0 );

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}


	window.addEventListener( 'resize', onWindowResize, false );

	scene.add( camera );

	
	const cubeGeometry = new THREE.BoxGeometry( 6, 6, 6, 8, 8, 8 );
	const cubeMaterial = new THREE.MeshBasicMaterial( {color:0xff0000} );
	
	const cubeMesh = new THREE.Mesh(cubeGeometry,cubeMaterial);
	cubeMesh.name="cube"
	cubeMesh.position.set(0,0,-20)
	
	scene.add(cubeMesh);

			
	let moveAmount=0.1;
	function Update() {


		renderer.render( scene, camera );
	
		cubeMesh.position.z+=moveAmount;
		
		if(cubeMesh.position.z>0.0)
		{
			moveAmount=-0.1;
			cubeMesh.position.z = moveAmount;
		}
		else if(cubeMesh.position.z<-100.0)
		{
			moveAmount=+0.1;
			cubeMesh.position.x = -100+moveAmount;
		}
		
		
		
	}

	renderer.animate(Update);
	
	Update();
	
}

Init();
