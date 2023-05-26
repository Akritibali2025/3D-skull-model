async function createScene() {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera", 1.5, 1.3, 111, BABYLON.Vector3.Zero(), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'ground' shape.
    var vortex = BABYLON.MeshBuilder.CreateGround("vortex", { width: 100, height: 100, subdivisions: 1024 }, scene);

    let twirlMaterial = await BABYLON.NodeMaterial.ParseFromSnippetAsync("LLZ3TW#3", scene);

    vortex.material = twirlMaterial;
    vortex.material.backFaceCulling = false;

    let Legos = await BABYLON.SceneLoader.ImportMeshAsync("", Assets.meshes.blackPearl.rootUrl, Assets.meshes.blackPearl.filename, scene);
    let blackPearl = Legos.meshes[0];

    blackPearl.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
    blackPearl.rotationQuaternion = null;
    blackPearl.rotation.y -= BABYLON.Tools.ToRadians(90);
    blackPearl.rotation.x += BABYLON.Tools.ToRadians(25);
    blackPearl.position.x += 37;

    var rotationParent = BABYLON.MeshBuilder.CreateSphere("rotationParent", { diameter: 1 }, scene);
    blackPearl.setParent(rotationParent);

    let animations = await BABYLON.Animation.CreateFromSnippetAsync("J71VFJ");
    rotationParent.animations = animations;
    scene.beginAnimation(rotationParent, 0, 400, true);

    rotationParent.visibility = 0;


    return scene;
}