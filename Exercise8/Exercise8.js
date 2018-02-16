
function Init() {
	const canvas = document.getElementById("MainCanvas");
	const renderer = new THREE.WebGLRenderer({canvas})

	renderer.setSize(window.innerWidth,window.innerHeight);

	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0.25,0.25,0.25);

	
	const spongebobMaterial = new THREE.MeshLambertMaterial({map:new THREE.Texture()});
	
	// instantiate a loader
	var loader = new THREE.TextureLoader();

	// load a resource
	loader.load(
		// resource URL
		'Spongebob.png',

		// onLoad callback
		function ( texture ) {
			spongebobMaterial.map = texture;
		},

		// onProgress callback currently not supported
		undefined,

		// onError callback
		function ( err ) {
			console.error( 'An error happened.' );
		}
	);
	
	
		

	
	const directLight = new THREE.DirectionalLight();
	directLight.position.set(0,1,0.5);
	
	const directLightTarget = new THREE.Object3D();
	directLightTarget.position.set(0,0,0);
	directLight.target = directLightTarget;
	
	scene.add(directLight);
	scene.add(directLightTarget);
	
	const pointLight = new THREE.PointLight();
	pointLight.intensity = 0.5;
	pointLight.distance = 10.0;
	pointLight.decay = 2.0;
	scene.add(pointLight);
	
	const cubeGeometry = new THREE.BoxGeometry(1.0,1.0,1.0);
	//const cubeMaterial = new THREE.MeshLambertMaterial({color:0x00FF00});
	
	const cubeMesh = new THREE.Mesh(cubeGeometry,spongebobMaterial);
	cubeMesh.position.set(0,0,-20);
	scene.add(cubeMesh);

	
	const torusGeometry = new THREE.TorusGeometry(1.0, 0.2, 20, 40)
	const torusMaterial = new THREE.MeshLambertMaterial({color:0x0000FF});
	const torusMesh = new THREE.Mesh(torusGeometry,torusMaterial);
	torusMesh.position.set(5,0,0);	cubeMesh.position.set(0,0,-20);
	cubeMesh.add(torusMesh);	
	
	
	// instantiate a loader
	var objLoader = new THREE.OBJLoader();

	// load a resource
	objLoader.load(
		// resource URL
		'teapot.obj',

		// onLoad callback
		function ( object ) {
			object.scale.set(0.01,0.01,0.01);
			object.position.set(0,8,0);
			object.children[0].material.side = THREE.BackSide;
			object.children[0].material.shininess = 50;
			object.children[0].material.specular.r = 0.2;
			object.children[0].material.specular.g = 0.9;
			object.children[0].material.specular.b = 0.2;
			cubeMesh.add(object);
		},

		// onProgress callback currently not supported
		undefined,

		// onError callback
		function ( err ) {
			console.error( 'An error happened.' );
		}
	);
	
	
	
	const camera = new THREE.PerspectiveCamera(70.0, canvas.width/canvas.height, 0.1, 1000.0);
	scene.add(camera);
	
	let vrDisplay = null;
	
	
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

	let isVREnabled = false;
	
	function onVREnable() {
		if(!vrDisplay)
			return;
			
		if(vrDisplay.isPresenting)
			vrDisplay.exitPresent();
		
		vrDisplay.requestPresent([{source:canvas}]).then(
			(res)=>{
				console.log("Successfully enabled VR");
			},
			(err)=>{
				console.error(`Failed to enable VR ${err}`)
			}
		)
		
	}
	
	const enableVRButton = document.getElementById("VRButton");
	enableVRButton.addEventListener("click", onVREnable, false);
	
	
	if(navigator.getVRDisplays)
	{
		navigator.getVRDisplays().then(
			(displays)=>{
				console.log(`Found ${displays.length} displays`)
				if(displays.length>0)
				{
					vrDisplay = displays[0];
					
					renderer.vr.enabled = true;
					renderer.vr.setDevice(vrDisplay);

					window.addEventListener('vrdisplaypointerrestricted', onPointerRestricted, false);
					window.addEventListener('vrdisplaypointerunrestricted', onPointerUnrestricted, false);
					
					
				}
			},
			(err)=>{
				console.error(err);
			}
		)
	}
	else
	{
		console.warn("WebVR not supported");
	}
	
	
	let moveAmount = 0.1;
	function Update() {
		renderer.render(scene, camera);
		
		cubeMesh.position.z = cubeMesh.position.z+moveAmount;
		if(cubeMesh.position.z>0.0)
		{
			cubeMesh.position.z= -moveAmount;
			moveAmount*=-1.0;
			
		}
		else if (cubeMesh.position.z<-50.0)
		{
			cubeMesh.position.z= -50-moveAmount;
			moveAmount*=-1.0;			
		}
		
		torusMesh.rotation.y += 0.05;
		cubeMesh.rotation.z += 0.01;
		
	}
	renderer.animate(Update);
	
	Update();
	
}

Init();
