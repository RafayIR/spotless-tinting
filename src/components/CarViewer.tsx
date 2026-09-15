import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
  useProgress,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const HDRI_PATH = '/models/range-rover/hansaplatz_4k.exr';
const GROUND_RADIUS = 140;
const GROUND_TINT = '#b0aca4';

const PAVEMENT = {
  diff: '/textures/pavement/diff.jpg',
  rough: '/textures/pavement/rough.jpg',
  nor: '/textures/pavement/nor.jpg',
};

export type TintLevel = 'light' | 'medium' | 'dark';
export type CarId = 'range-rover' | 'lamborghini';
export type ServiceMode = 'tint' | 'ppf' | 'wrap';
type WrapFinish = 'matte' | 'gloss' | 'satin' | 'chrome';

type CarConfig = {
  id: CarId;
  name: string;
  thumbnail: string;
  fileType: 'glb' | 'fbx' | 'obj';
  files: {
    glb?: string;
    fbx?: string;
    obj?: string;
    mtl?: string;
    textureBase?: string;
  };
  glassNameRe: RegExp;
  paintNameRe: RegExp;
  targetSize: number;
  loadHint?: string;
};

type PaintBaseline = {
  color: THREE.Color;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  envMapIntensity: number;
};

type WrapSwatch = {
  id: string;
  label: string;
  color: string;
  finish: WrapFinish;
};

type ConfiguratorOptions = {
  mode: ServiceMode;
  tint: TintLevel;
  ppfOn: boolean;
  wrapId: string;
};

export const CARS: CarConfig[] = [
  {
    id: 'range-rover',
    name: 'Range Rover Sport',
    thumbnail: '/portfolio-images/bmw-x-full-windows-legal-tint/bmw-2.jpeg',
    fileType: 'glb',
    files: { glb: '/models/range-rover/range-rover-sport-2018.glb' },
    glassNameRe: /glass|window|windshield|windscreen|glazing|verre/i,
    paintNameRe: /paint|body|carpaint|car.?paint|exterior|coating|lacquer|carbody/i,
    targetSize: 4.15,
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini Aventador',
    thumbnail: '/models/lamborghini/Lamborghinilogo.jpg',
    fileType: 'obj',
    files: {
      obj: '/models/lamborghini/Avent_sport.obj',
      mtl: '/models/lamborghini/Avent_sport.mtl',
      textureBase: '/models/lamborghini/textures/',
    },
    glassNameRe: /^glass$/i,
    paintNameRe: /^body$/i,
    targetSize: 4.55,
    loadHint: 'Large model (~44MB) — first load may take a moment',
  },
];

const SERVICE_MODES: { id: ServiceMode; label: string; heading: string; blurb: string }[] = [
  {
    id: 'tint',
    label: 'Window Tint',
    heading: 'Explore Our Tint Options in',
    blurb: 'Compare Light, Medium and Dark film on the glass.',
  },
  {
    id: 'ppf',
    label: 'PPF',
    heading: 'See PPF Protection in',
    blurb: 'Preview paint protection film coverage with a before/after sheen.',
  },
  {
    id: 'wrap',
    label: 'Vehicle Wrap',
    heading: 'Preview Your Wrap in',
    blurb: 'Try popular wrap colours and finishes on the body panels.',
  },
];

const TINT_PRESETS: Record<
  TintLevel,
  { label: string; color: string; opacity: number; transmissionHint: string }
> = {
  light: {
    label: 'Light',
    color: '#9eb6c8',
    opacity: 0.45,
    transmissionHint: 'Subtle privacy · higher VLT',
  },
  medium: {
    label: 'Medium',
    color: '#2a3540',
    opacity: 0.72,
    transmissionHint: 'Balanced heat & privacy',
  },
  dark: {
    label: 'Dark',
    color: '#0a0c0e',
    opacity: 0.9,
    transmissionHint: 'Maximum privacy · lower VLT',
  },
};

const WRAP_SWATCHES: WrapSwatch[] = [
  { id: 'matte-black', label: 'Matte Black', color: '#111111', finish: 'matte' },
  { id: 'gloss-black', label: 'Gloss Black', color: '#0a0a0a', finish: 'gloss' },
  { id: 'satin-white', label: 'Satin White', color: '#e8e6e1', finish: 'satin' },
  { id: 'racing-red', label: 'Racing Red', color: '#b91c1c', finish: 'gloss' },
  { id: 'deep-blue', label: 'Deep Blue', color: '#1e3a5f', finish: 'satin' },
  { id: 'chrome-silver', label: 'Chrome Silver', color: '#c5c8cc', finish: 'chrome' },
  { id: 'matte-grey', label: 'Matte Grey', color: '#6b6e72', finish: 'matte' },
  { id: 'gloss-yellow', label: 'Gloss Yellow', color: '#eab308', finish: 'gloss' },
];

const FINISH_PROPS: Record<
  WrapFinish,
  { roughness: number; clearcoat: number; clearcoatRoughness: number; metalness: number; envMapIntensity: number }
> = {
  matte: { roughness: 0.78, clearcoat: 0.05, clearcoatRoughness: 0.6, metalness: 0.05, envMapIntensity: 0.55 },
  satin: { roughness: 0.42, clearcoat: 0.45, clearcoatRoughness: 0.28, metalness: 0.12, envMapIntensity: 1.0 },
  gloss: { roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.05, metalness: 0.18, envMapIntensity: 1.45 },
  chrome: { roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.02, metalness: 0.95, envMapIntensity: 2.1 },
};

function clearCarCache(car: CarConfig) {
  if (car.fileType === 'glb' && car.files.glb) {
    useGLTF.clear(car.files.glb);
  } else if (car.fileType === 'fbx' && car.files.fbx) {
    useLoader.clear(FBXLoader, car.files.fbx);
  } else if (car.fileType === 'obj' && car.files.obj) {
    useLoader.clear(OBJLoader, car.files.obj);
    if (car.files.mtl) useLoader.clear(MTLLoader, car.files.mtl);
  }
}

function collectMaterials(root: THREE.Object3D): THREE.Material[] {
  const mats: THREE.Material[] = [];
  const seen = new Set<THREE.Material>();
  root.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    list.forEach((mat) => {
      if (mat && !seen.has(mat)) {
        seen.add(mat);
        mats.push(mat);
      }
    });
  });
  return mats;
}

function isGlassMaterial(mat: THREE.Material, glassRe: RegExp): boolean {
  return glassRe.test(mat.name || '');
}

function isPaintMaterial(mat: THREE.Material, car: CarConfig): boolean {
  const name = mat.name || '';
  if (isGlassMaterial(mat, car.glassNameRe)) return false;
  if (
    car.paintNameRe.test(name) &&
    !/tire|rubber|trim|interior|chrome|metal|glass|light|lamp|plastic|carbon|grille|wheel/i.test(name)
  ) {
    return true;
  }
  if (
    (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) &&
    mat.color &&
    mat.color.getHex() < 0x222222 &&
    !/tire|rubber|interior|plastic|grille|trim|chrome|metal|carbon|brake|disc/i.test(name)
  ) {
    return true;
  }
  return false;
}

/** Canonical paint materials for tint/PPF/wrap modes. */
function getPaintMaterials(model: THREE.Object3D, car: CarConfig): THREE.Material[] {
  return collectMaterials(model).filter((mat) => isPaintMaterial(mat, car));
}

/** Canonical glass materials for window-tint mode. */
function getGlassMaterials(model: THREE.Object3D, car: CarConfig): THREE.Material[] {
  return collectMaterials(model).filter((mat) => isGlassMaterial(mat, car.glassNameRe));
}

function fitToGround(model: THREE.Object3D, targetSize: number) {
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  model.scale.set(1, 1, 1);

  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetSize / maxDim;

  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

  const fitted = new THREE.Box3().setFromObject(model);
  model.position.y -= fitted.min.y;
}

function readMatColor(mat: THREE.Material): THREE.Color {
  if ('color' in mat && (mat as THREE.MeshPhongMaterial).color) {
    return (mat as THREE.MeshPhongMaterial).color.clone();
  }
  return new THREE.Color(0xffffff);
}

function readMatMap(mat: THREE.Material): THREE.Texture | null {
  if ('map' in mat) return ((mat as THREE.MeshPhongMaterial).map as THREE.Texture | null) ?? null;
  return null;
}

function replaceMeshMaterial(mesh: THREE.Mesh, from: THREE.Material, to: THREE.Material) {
  if (Array.isArray(mesh.material)) {
    mesh.material = mesh.material.map((m) => (m === from ? to : m));
  } else {
    mesh.material = to;
  }
  from.dispose();
}

function capturePaintBaselines(
  model: THREE.Object3D,
  car: CarConfig,
  store: WeakMap<THREE.Material, PaintBaseline>,
) {
  getPaintMaterials(model, car).forEach((mat) => {
    if (!(mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial)) {
      return;
    }
    const physical = mat instanceof THREE.MeshPhysicalMaterial ? mat : null;
    store.set(mat, {
      color: mat.color.clone(),
      roughness: mat.roughness,
      metalness: mat.metalness,
      clearcoat: physical?.clearcoat ?? 0,
      clearcoatRoughness: physical?.clearcoatRoughness ?? 0.2,
      envMapIntensity: mat.envMapIntensity,
    });
  });
}

function restorePaintBaseline(
  mat: THREE.Material,
  baseline: PaintBaseline | undefined,
) {
  if (!baseline) return;
  if (!(mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial)) {
    return;
  }
  mat.color.copy(baseline.color);
  mat.roughness = baseline.roughness;
  mat.metalness = baseline.metalness;
  mat.envMapIntensity = baseline.envMapIntensity;
  if (mat instanceof THREE.MeshPhysicalMaterial) {
    mat.clearcoat = baseline.clearcoat;
    mat.clearcoatRoughness = baseline.clearcoatRoughness;
  }
  mat.needsUpdate = true;
}

function applyTint(model: THREE.Object3D, car: CarConfig, tint: TintLevel) {
  const preset = TINT_PRESETS[tint];
  getGlassMaterials(model, car).forEach((mat) => {
    if (mat instanceof THREE.MeshPhysicalMaterial || mat instanceof THREE.MeshStandardMaterial) {
      mat.color.set(preset.color);
      mat.transparent = true;
      mat.opacity = preset.opacity;
      mat.depthWrite = preset.opacity > 0.85;
      if (mat instanceof THREE.MeshPhysicalMaterial) {
        mat.transmission = Math.max(0, 0.55 - preset.opacity * 0.45);
      }
      mat.needsUpdate = true;
    }
  });
}

function applyPpfSheen(
  model: THREE.Object3D,
  car: CarConfig,
  on: boolean,
  baselines: WeakMap<THREE.Material, PaintBaseline>,
) {
  // Whole-body fallback — mesh zones aren't cleanly separable on these models.
  getPaintMaterials(model, car).forEach((mat) => {
    const baseline = baselines.get(mat);
    if (!(mat instanceof THREE.MeshPhysicalMaterial || mat instanceof THREE.MeshStandardMaterial)) {
      return;
    }
    if (!on) {
      restorePaintBaseline(mat, baseline);
      return;
    }
    if (baseline) mat.color.copy(baseline.color).lerp(new THREE.Color('#dce9f5'), 0.07);
    mat.roughness = Math.min(baseline?.roughness ?? 0.2, 0.12);
    mat.metalness = baseline?.metalness ?? 0.15;
    mat.envMapIntensity = 1.9;
    if (mat instanceof THREE.MeshPhysicalMaterial) {
      mat.clearcoat = 1;
      mat.clearcoatRoughness = 0.02;
    }
    mat.needsUpdate = true;
  });
}

function applyWrap(
  model: THREE.Object3D,
  car: CarConfig,
  wrapId: string,
  baselines: WeakMap<THREE.Material, PaintBaseline>,
) {
  const swatch = WRAP_SWATCHES.find((s) => s.id === wrapId) ?? WRAP_SWATCHES[0];
  const finish = FINISH_PROPS[swatch.finish];

  getPaintMaterials(model, car).forEach((mat) => {
    if (!(mat instanceof THREE.MeshPhysicalMaterial || mat instanceof THREE.MeshStandardMaterial)) {
      return;
    }
    // Ignore base color maps so wrap colour reads cleanly
    if ('map' in mat && mat.map) {
      mat.map = null;
    }
    mat.color.set(swatch.color);
    mat.roughness = finish.roughness;
    mat.metalness = finish.metalness;
    mat.envMapIntensity = finish.envMapIntensity;
    if (mat instanceof THREE.MeshPhysicalMaterial) {
      mat.clearcoat = finish.clearcoat;
      mat.clearcoatRoughness = finish.clearcoatRoughness;
    } else if (finish.clearcoat > 0.2) {
      // Promote to physical if wrap needs clearcoat
      // Keep mutating Standard when possible; gloss still reads via low roughness
    }
    mat.needsUpdate = true;
    void baselines;
  });
}

function applyConfigurator(
  model: THREE.Object3D,
  car: CarConfig,
  options: ConfiguratorOptions,
  baselines: WeakMap<THREE.Material, PaintBaseline>,
) {
  // Always restore paint first so modes don't stack
  getPaintMaterials(model, car).forEach((mat) => restorePaintBaseline(mat, baselines.get(mat)));

  if (options.mode === 'tint') {
    applyTint(model, car, options.tint);
    return;
  }

  // Keep a neutral medium tint while previewing body services
  applyTint(model, car, 'medium');

  if (options.mode === 'ppf') {
    applyPpfSheen(model, car, options.ppfOn, baselines);
    return;
  }

  applyWrap(model, car, options.wrapId, baselines);
}

function enhanceOutdoorMaterials(model: THREE.Object3D, car: CarConfig, maxAnisotropy: number) {
  const names: string[] = [];

  model.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach((mat) => {
      if (!mat) return;
      names.push(mat.name || '(unnamed)');

      const textured = mat as THREE.MeshStandardMaterial;
      (['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap'] as const).forEach(
        (key) => {
          const tex = textured[key];
          if (tex) {
            tex.anisotropy = Math.min(8, maxAnisotropy);
            tex.needsUpdate = true;
          }
        },
      );

      if (isGlassMaterial(mat, car.glassNameRe)) {
        if (mat instanceof THREE.MeshPhysicalMaterial || mat instanceof THREE.MeshStandardMaterial) {
          const g = mat as THREE.MeshPhysicalMaterial;
          g.transparent = true;
          g.opacity = Math.min(Math.max(g.opacity || 0.55, 0.2), 0.95);
          g.roughness = 0.05;
          g.metalness = 0;
          g.envMapIntensity = 1.4;
          g.side = THREE.DoubleSide;
          g.depthWrite = false;
          if (g instanceof THREE.MeshPhysicalMaterial) {
            g.transmission = Math.max(g.transmission || 0, 0.35);
            g.thickness = Math.max(g.thickness || 0, 0.35);
          }
          g.needsUpdate = true;
        } else {
          const glass = new THREE.MeshPhysicalMaterial({
            color: readMatColor(mat),
            map: readMatMap(mat),
            transparent: true,
            opacity: 0.55,
            roughness: 0.05,
            metalness: 0,
            transmission: 0.35,
            thickness: 0.35,
            envMapIntensity: 1.4,
            depthWrite: false,
            side: THREE.DoubleSide,
            name: mat.name,
          });
          replaceMeshMaterial(mesh, mat, glass);
        }
      } else if (isPaintMaterial(mat, car)) {
        if (mat instanceof THREE.MeshPhysicalMaterial) {
          mat.roughness = Math.min(mat.roughness, 0.22);
          mat.clearcoat = 1;
          mat.clearcoatRoughness = 0.05;
          mat.envMapIntensity = 1.55;
          mat.metalness = Math.min(Math.max(mat.metalness, 0.05), 0.35);
          mat.needsUpdate = true;
        } else if (mat instanceof THREE.MeshStandardMaterial) {
          const paint = new THREE.MeshPhysicalMaterial({
            color: mat.color.clone(),
            map: mat.map,
            normalMap: mat.normalMap,
            roughnessMap: mat.roughnessMap,
            metalnessMap: mat.metalnessMap,
            aoMap: mat.aoMap,
            metalness: 0.15,
            roughness: 0.2,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            envMapIntensity: 1.55,
            name: mat.name,
          });
          replaceMeshMaterial(mesh, mat, paint);
        } else {
          const paint = new THREE.MeshPhysicalMaterial({
            color: readMatColor(mat),
            map: readMatMap(mat),
            metalness: 0.15,
            roughness: 0.2,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            envMapIntensity: 1.55,
            name: mat.name,
          });
          replaceMeshMaterial(mesh, mat, paint);
        }
      } else if (
        mat instanceof THREE.MeshPhongMaterial ||
        mat instanceof THREE.MeshLambertMaterial ||
        mat instanceof THREE.MeshBasicMaterial
      ) {
        const next = new THREE.MeshStandardMaterial({
          color: readMatColor(mat),
          map: readMatMap(mat),
          metalness: /chrome|mirror|mss02/i.test(mat.name) ? 0.9 : 0.15,
          roughness: /chrome|mirror/i.test(mat.name)
            ? 0.15
            : /tire|reifen|interior|plastik/i.test(mat.name)
              ? 0.85
              : 0.45,
          envMapIntensity: /chrome|mirror/i.test(mat.name) ? 1.4 : 0.8,
          name: mat.name,
          transparent: 'opacity' in mat ? (mat as THREE.MeshPhongMaterial).opacity < 1 : false,
          opacity: 'opacity' in mat ? (mat as THREE.MeshPhongMaterial).opacity : 1,
        });
        replaceMeshMaterial(mesh, mat, next);
      }
    });
  });

  console.log(`[CarViewer] ${car.name} material names:`, [...new Set(names)].sort());
}

function LoaderOverlay({ hint }: { hint?: string }) {
  const { progress, active } = useProgress();
  if (!active && progress >= 100) return null;

  return (
    <Html center>
      <div className="flex w-64 flex-col items-center gap-3 rounded-xl bg-ink-950/90 px-5 py-4 text-white shadow-xl backdrop-blur-sm">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-accent-500 transition-[width] duration-200"
            style={{ width: `${Math.min(100, Math.round(progress))}%` }}
          />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">
          Loading 3D model · {Math.min(100, Math.round(progress))}%
        </p>
        {hint ? <p className="text-center text-[10px] leading-snug text-white/55">{hint}</p> : null}
      </div>
    </Html>
  );
}

function OutdoorGround() {
  const { gl } = useThree();
  const [diffMap, roughMap, norMap] = useTexture([
    PAVEMENT.diff,
    PAVEMENT.rough,
    PAVEMENT.nor,
  ]);

  useLayoutEffect(() => {
    // Cap anisotropy — full GPU max on 4K pavement maps is costly while orbiting
    const maxAniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
    const tile = 18;
    const tiled = [diffMap, roughMap, norMap];
    tiled.forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(tile, tile);
      tex.anisotropy = maxAniso;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.needsUpdate = true;
    });

    diffMap.colorSpace = THREE.SRGBColorSpace;
    roughMap.colorSpace = THREE.NoColorSpace;
    norMap.colorSpace = THREE.NoColorSpace;
  }, [gl, diffMap, roughMap, norMap]);

  return (
    <group>
      {/* Standard pavement — MeshReflectorMaterial was re-rendering every orbit frame and felt “stuck” */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]} receiveShadow>
        <circleGeometry args={[GROUND_RADIUS, 64]} />
        <meshStandardMaterial
          map={diffMap}
          roughnessMap={roughMap}
          normalMap={norMap}
          normalScale={new THREE.Vector2(0.35, 0.35)}
          color={GROUND_TINT}
          roughness={0.92}
          metalness={0.04}
          envMapIntensity={0.35}
        />
      </mesh>
      <ContactShadows
        frames={1}
        position={[0, 0.006, 0]}
        opacity={0.4}
        scale={28}
        blur={2.6}
        far={8}
        resolution={512}
        color="#2a2926"
      />
    </group>
  );
}

function usePreparedModel(
  source: THREE.Object3D,
  car: CarConfig,
  options: ConfiguratorOptions,
) {
  const group = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
  const model = useMemo(() => source.clone(true), [source]);
  const baselines = useRef(new WeakMap<THREE.Material, PaintBaseline>());

  useLayoutEffect(() => {
    const root = group.current;
    if (!root) return;

    root.clear();
    root.add(model);
    fitToGround(model, car.targetSize);
    enhanceOutdoorMaterials(model, car, maxAnisotropy);
    baselines.current = new WeakMap();
    capturePaintBaselines(model, car, baselines.current);
    applyConfigurator(model, car, options, baselines.current);

    return () => {
      root.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setup once per model/car
  }, [model, car.id, maxAnisotropy]);

  useEffect(() => {
    applyConfigurator(model, car, options, baselines.current);
  }, [model, car, options]);

  return group;
}

function GlbCarModel({ car, options }: { car: CarConfig; options: ConfiguratorOptions }) {
  const { scene } = useGLTF(car.files.glb!);
  const group = usePreparedModel(scene, car, options);

  useEffect(() => {
    return () => clearCarCache(car);
  }, [car]);

  return <group ref={group} />;
}

function FbxCarModel({ car, options }: { car: CarConfig; options: ConfiguratorOptions }) {
  const object = useLoader(FBXLoader, car.files.fbx!, (loader) => {
    if (car.files.textureBase) loader.setResourcePath(car.files.textureBase);
  });
  const group = usePreparedModel(object, car, options);

  useEffect(() => {
    return () => clearCarCache(car);
  }, [car]);

  return <group ref={group} />;
}

function ObjCarModel({ car, options }: { car: CarConfig; options: ConfiguratorOptions }) {
  const materials = useLoader(MTLLoader, car.files.mtl!, (loader) => {
    if (car.files.textureBase) loader.setResourcePath(car.files.textureBase);
  });

  useMemo(() => {
    materials.preload();
  }, [materials]);

  const object = useLoader(OBJLoader, car.files.obj!, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const group = usePreparedModel(object, car, options);

  useEffect(() => {
    return () => clearCarCache(car);
  }, [car]);

  return <group ref={group} />;
}

function CarModel({ car, options }: { car: CarConfig; options: ConfiguratorOptions }) {
  if (car.fileType === 'glb') return <GlbCarModel car={car} options={options} />;
  if (car.fileType === 'obj') return <ObjCarModel car={car} options={options} />;
  return <FbxCarModel car={car} options={options} />;
}

function Scene({
  car,
  options,
}: {
  car: CarConfig;
  options: ConfiguratorOptions;
}) {
  const [autoRotate, setAutoRotate] = useState(true);
  const resumeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  useEffect(() => {
    setAutoRotate(true);
  }, [car.id]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        position={[6, 10, 4]}
        intensity={1.05}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00015}
        color="#fff6e8"
      />

      <Suspense fallback={<LoaderOverlay hint={car.loadHint} />}>
        <Environment files={HDRI_PATH} background backgroundBlurriness={0.02} environmentIntensity={1.0} />
        <OutdoorGround />
        <Suspense key={car.id} fallback={<LoaderOverlay hint={car.loadHint} />}>
          <CarModel car={car} options={options} />
        </Suspense>
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate
        enableZoom
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={1.35}
        zoomSpeed={1.1}
        autoRotate={autoRotate}
        autoRotateSpeed={0.4}
        minDistance={2.2}
        maxDistance={5.4}
        minPolarAngle={Math.PI / 2.7}
        maxPolarAngle={Math.PI / 2.14}
        target={[0, 0.95, 0]}
        onStart={() => {
          if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
          setAutoRotate(false);
        }}
        onEnd={() => {
          if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
          resumeTimer.current = window.setTimeout(() => setAutoRotate(true), 2200);
        }}
      />
    </>
  );
}

export default function CarViewer({ className = '' }: { className?: string }) {
  const [mode, setMode] = useState<ServiceMode>('tint');
  const [tint, setTint] = useState<TintLevel>('medium');
  const [ppfOn, setPpfOn] = useState(true);
  const [wrapId, setWrapId] = useState(WRAP_SWATCHES[0].id);
  const [carId, setCarId] = useState<CarId>('range-rover');
  const car = CARS.find((c) => c.id === carId) ?? CARS[0];
  const service = SERVICE_MODES.find((s) => s.id === mode) ?? SERVICE_MODES[0];

  const options = useMemo<ConfiguratorOptions>(
    () => ({ mode, tint, ppfOn, wrapId }),
    [mode, tint, ppfOn, wrapId],
  );

  return (
    <section className={`overflow-hidden bg-ink-950 ${className}`}>
      <div className="container pt-12 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-500">
            Interactive 3D Preview
          </p>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
            {service.heading} <span className="text-accent-500">3D</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{service.blurb}</p>
        </div>

        {CARS.length > 1 ? (
          <div className="mx-auto mt-8 flex max-w-lg flex-wrap items-stretch justify-center gap-3 sm:mt-10">
            {CARS.map((option) => {
              const active = option.id === carId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setCarId(option.id)}
                  className={`group flex min-w-[9.5rem] flex-1 items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    active
                      ? 'border-accent-500 bg-accent-500/15 ring-1 ring-accent-500/40'
                      : 'border-white/15 bg-white/5 hover:border-accent-500/50 hover:bg-white/10'
                  }`}
                >
                  <img
                    src={option.thumbnail}
                    alt=""
                    className="h-12 w-16 shrink-0 rounded-md object-cover"
                  />
                  <span className="min-w-0">
                    <span
                      className={`block text-[11px] font-bold uppercase tracking-wide ${
                        active ? 'text-accent-400' : 'text-white'
                      }`}
                    >
                      {option.name}
                    </span>
                    {option.loadHint ? (
                      <span className="mt-0.5 block text-[9px] leading-snug text-white/45">
                        Larger file · first load slower
                      </span>
                    ) : (
                      <span className="mt-0.5 block text-[9px] leading-snug text-white/45">
                        Quick load
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="relative mt-6 h-[60vh] w-full md:mt-8 md:h-[70vh]">
        <Canvas
          className="h-full w-full touch-none"
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [2.75, 0.88, 3.55], fov: 28, near: 0.1, far: 160 }}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <Scene car={car} options={options} />
        </Canvas>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 via-ink-950/35 to-transparent px-4 pb-5 pt-28">
          <div className="pointer-events-auto mx-auto flex max-w-2xl flex-col items-center gap-3">
            {/* Service mode tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/15 bg-ink-950/60 p-1 backdrop-blur-sm">
              {SERVICE_MODES.map((item) => {
                const active = mode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMode(item.id)}
                    className={`rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors sm:px-4 sm:text-[11px] ${
                      active
                        ? 'bg-accent-500 text-white shadow-md shadow-accent-500/25'
                        : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mode-specific controls */}
            {mode === 'tint' ? (
              <>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {(Object.keys(TINT_PRESETS) as TintLevel[]).map((level) => {
                    const active = tint === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setTint(level)}
                        className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                          active
                            ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                            : 'border border-white/35 bg-ink-950/55 text-white/90 backdrop-blur-sm hover:border-accent-500 hover:text-accent-400'
                        }`}
                      >
                        {TINT_PRESETS[level].label}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-white/70">
                  {TINT_PRESETS[tint].transmissionHint}
                </p>
              </>
            ) : null}

            {mode === 'ppf' ? (
              <>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPpfOn(false)}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                      !ppfOn
                        ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                        : 'border border-white/35 bg-ink-950/55 text-white/90 backdrop-blur-sm hover:border-accent-500 hover:text-accent-400'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    type="button"
                    onClick={() => setPpfOn(true)}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                      ppfOn
                        ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                        : 'border border-white/35 bg-ink-950/55 text-white/90 backdrop-blur-sm hover:border-accent-500 hover:text-accent-400'
                    }`}
                  >
                    After · PPF On
                  </button>
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-white/70">
                  Whole-body clear-film sheen · before/after compare
                </p>
              </>
            ) : null}

            {mode === 'wrap' ? (
              <>
                <div className="flex max-w-xl flex-wrap items-center justify-center gap-2">
                  {WRAP_SWATCHES.map((swatch) => {
                    const active = wrapId === swatch.id;
                    return (
                      <button
                        key={swatch.id}
                        type="button"
                        onClick={() => setWrapId(swatch.id)}
                        title={swatch.label}
                        className={`group flex flex-col items-center gap-1 rounded-lg px-1.5 py-1 transition-transform ${
                          active ? 'scale-105' : 'hover:scale-105'
                        }`}
                      >
                        <span
                          className={`h-8 w-8 rounded-full border-2 shadow-md ${
                            active ? 'border-accent-500 ring-2 ring-accent-500/40' : 'border-white/40'
                          }`}
                          style={{ backgroundColor: swatch.color }}
                        />
                        <span
                          className={`max-w-[4.5rem] text-center text-[8px] font-semibold uppercase leading-tight tracking-wide ${
                            active ? 'text-accent-400' : 'text-white/65'
                          }`}
                        >
                          {swatch.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-white/70">
                  Body wrap only · glass, wheels & trim unchanged
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container pb-12 pt-4 md:pb-16">
        <p className="text-center text-[10px] text-ink-400">
          Demo preview for illustration — final film, PPF or wrap choice depends on your vehicle and
          goals. Talk to Spotless for a tailored recommendation.
        </p>
      </div>
    </section>
  );
}
