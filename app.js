// app.js
let scene, camera, renderer;

function init() {
    // Create scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Add a light
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Create AR button
    document.body.appendChild(ARButton.createButton(renderer));

    // Add event listeners for hit testing
    renderer.xr.addEventListener('sessionstart', onSessionStart);
}

function onSessionStart(event) {
    const session = event.target;

    // Enable hit testing
    session.addEventListener('select', onSelect);
}

function onSelect(event) {
    // Logic for handling the selection of a hit test surface
}

// Adjust camera and renderer on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start the application
init();
async function onSessionStart(event) {
    const session = event.target;

    // Enable hit testing
    session.addEventListener('select', onSelect);
    
    // Enable hit test feature
    const referenceSpace = await session.requestReferenceSpace('local');
    session.updateRenderState({ baseLayer: new XRWebGLLayer(session, renderer.getContext()) });
    
    // Set up a hit test source
    const hitTestSource = await session.requestHitTestSource({ space: referenceSpace });
    
    // Create a loop to continuously check for hit test results
    const hitTestResults = session.requestHitTestSourceForTransientInput({ profiles: ['generic-trigger'] });
    session.requestAnimationFrame((timestamp) => {
        checkHitTest(hitTestResults);
    });
}

// Check hit test results
async function checkHitTest(hitTestResults) {
    const results = await hitTestResults;

    if (results.length) {
        const hit = results[0]; // Get the first hit result

        // Create a mesh at the hit position
        const mesh = createMesh(hit);
        scene.add(mesh);
    }
}

function createMesh(hit) {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // Position the cube at the hit point
    const position = hit.getPose(hit.targetSpace).transform.position;
    cube.position.set(position.x, position.y, position.z);
    
    return cube;
}
