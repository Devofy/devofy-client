import { useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useSprings, a } from "@react-spring/three";

const number = 5;

// Your blue-based color scheme
const colors = ["#ADD7F6", "#87BFFF", "#3F8EFC", "#2667FF", "#3B28CC"];

const random = (i: number) => {
  const r = Math.random();
  return {
    // Increased spread to fill more of the viewport
    position: [200 - Math.random() * 400, 200 - Math.random() * 400, i * 2],
    color: colors[Math.floor(Math.random() * colors.length)],
    // Increased scale to make each box noticeably larger
    scale: [2 + r * 30, 2 + r * 30, 2],
    rotation: [0, 0, THREE.MathUtils.degToRad(Math.round(Math.random()) * 90)],
  };
};

// Increased the geometry size for each cube
const data = new Array(number).fill(null).map(() => ({
  color: colors[Math.floor(Math.random() * colors.length)],
  args: [2 + Math.random() * 18, 2 + Math.random() * 18, 20],
}));

function Content() {
  const [springs, api] = useSprings(number, (i) => ({
    from: random(i),
    ...random(i),
    config: { mass: 20, tension: 150, friction: 50 },
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      api.start((i) => ({ ...random(i), delay: i * 50 }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {data.map((d, index) => (
        <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
          <boxGeometry args={d.args} />
          <a.meshStandardMaterial
            color={springs[index].color}
            roughness={0.7}
            metalness={0.6}
          />
        </a.mesh>
      ))}
    </>
  );
}

function Lights() {
  return (
    <group>
      <ambientLight intensity={1.5} />
      <pointLight intensity={0.5} position={[0, 0, 200]} />
      <spotLight
        castShadow
        intensity={0.6}
        angle={Math.PI / 6}
        position={[200, 200, 400]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}

export default function Shapes() {
  return (
    <div className="w-screen h-screen overflow-y-hidden">
      <Canvas
        linear
        flat
        shadows
        camera={{ position: [0, 0, 200], fov: 85 }}
        className=""
      >
        <Lights />
        <Content />
      </Canvas>
    </div>
  );
}
