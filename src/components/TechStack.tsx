import * as THREE from "three";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

/** WebGL is often disabled in sandboxed/embed previews, remote desktops, or when GPU is off. */
function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const ctx =
      canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        failIfMajorPerformanceCaveat: false,
      }) ??
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        failIfMajorPerformanceCaveat: false,
      });
    return ctx !== null;
  } catch {
    return false;
  }
}

class TechStackWebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("TechStack 3D unavailable:", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];
const imageLabels = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "TypeScript",
  "JavaScript",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

function TechStackStaticFallback() {
  return (
    <div className="techstack-fallback" aria-label="Tech stack logos">
      <div className="techstack-fallback-grid">
        {imageUrls.map((url, i) => (
          <figure key={url} className="techstack-fallback-item">
            <img
              src={url}
              alt={imageLabels[i]}
              loading="lazy"
              width={120}
              height={120}
            />
            <figcaption>{imageLabels[i]}</figcaption>
          </figure>
        ))}
      </div>
      <p className="techstack-fallback-note">
        3D preview needs WebGL. Open this page in Chrome, Edge, or Firefox with
        hardware acceleration enabled if the interactive view does not load.
      </p>
    </div>
  );
}

function TechStackCanvasContent({ isActive }: { isActive: boolean }) {
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <Canvas
      shadows
      gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
      camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
      onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      className="tech-canvas"
    >
      <ambientLight intensity={1} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color="white"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[0, 5, -4]} intensity={2} />
      <Physics gravity={[0, 0, 0]}>
        <Pointer isActive={isActive} />
        {spheres.map((props, i) => (
          <SphereGeo
            key={i}
            {...props}
            material={materials[Math.floor(Math.random() * materials.length)]}
            isActive={isActive}
          />
        ))}
      </Physics>
      <Environment
        files="/models/char_enviorment.hdr"
        environmentIntensity={0.5}
        environmentRotation={[0, 4, 2]}
      />
      <EffectComposer enableNormalPass={false}>
        <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
      </EffectComposer>
    </Canvas>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [webglOk] = useState(detectWebGL);
  const staticFallback = useMemo(() => <TechStackStaticFallback />, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="techstack">
      <h2> My Data Toolkit</h2>

      {webglOk ? (
        <TechStackWebGLErrorBoundary fallback={staticFallback}>
          <TechStackCanvasContent isActive={isActive} />
        </TechStackWebGLErrorBoundary>
      ) : (
        staticFallback
      )}
    </div>
  );
};

export default TechStack;
