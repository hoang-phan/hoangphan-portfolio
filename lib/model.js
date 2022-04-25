import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function loadGLTFModel(
  scene,
  glbPath,
  name,
  position,
  scale,
  rotation,
  cloneMaterial,
  options = { receiveShadow: true, castShadow: true }
) {
  const { receiveShadow, castShadow } = options
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()

    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene
        obj.name = name
        obj.position.set(position.x, position.y, position.z)
        obj.scale.set(scale.x, scale.y, scale.z)
        obj.rotation.set(rotation.x, rotation.y, rotation.z)
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        scene.add(obj)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = castShadow
            child.receiveShadow = receiveShadow
          }
        });

        if (cloneMaterial) {
          const cloneObj = obj.clone(true);
          cloneObj.name = `${name}Cloned`;
          cloneObj.scale.y = 0;
          cloneObj.traverse(function (child) {
            if (child.material) {
              child.material = cloneMaterial;
            }
          })
          scene.add(cloneObj);
          
          obj.visible = false;
          cloneObj.visible = false;
        }

        resolve(obj);
      },
      undefined,
      function (error) {
        reject(error)
      }
    )
  })
}
