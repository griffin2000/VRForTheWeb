
function Init() {
	const canvas = document.getElementById("MainCanvas");
	renderer = new THREE.WebGLRenderer( { canvas} );
	const vrButton = document.getElementById("VRButton");

	
					
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
		
		requestAnimationFrame(Update);
		
		
	}

	renderer.animate(Update);
	
	Update();
	
}

Init();
