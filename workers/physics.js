import * as CANNON from 'cannon';

let world;
let objects = {};

const setupPhysics = () => {
  world = new CANNON.World();
  world.gravity = new CANNON.Vec3(0, -5, 0);
}

const createPhysicsObject = (obj) => {
  const shape = new CANNON.Box(new CANNON.Vec3(obj.width / 2, obj.height / 2, obj.depth / 2));
  const body = new CANNON.Body({ mass: obj.mass, shape });
  body.position.set(obj.x, obj.y, obj.z);
  body.quaternion.x = obj.quaternionX || 0
  body.quaternion.Y = obj.quaternionY || 0
  body.quaternion.z = obj.quaternionZ || 0

  world.add(body);

  objects[obj.id] = {body, bounds: [obj.width, obj.height, obj.depth]};
}

addEventListener('message', ({data}) => {
  if (data.type == "setup") {
    setupPhysics();
    postMessage({});
    return;
  }

  if (data.type == "create-object") {
    createPhysicsObject(data.obj);
    postMessage({});
    return;
  }

  world.step(1 / 60);

  let result = {};

  Object.keys(objects).forEach((id) => {
    const obj = objects[id];
    
    const pos = obj.body.position;
    const { bounds } = obj;
    let resultPos = pos;


    if (id.indexOf("letter") == 0) {
      resultPos = pos.clone();
      resultPos.x = pos.x - bounds[0] / 2;
      resultPos.y = pos.y - bounds[1] / 2;
      resultPos.z = pos.z - bounds[2] / 2;
    }

    result[id] = {
      quaternion: obj.body.quaternion,
      position: resultPos,
    }
  });

  postMessage(result);
})
