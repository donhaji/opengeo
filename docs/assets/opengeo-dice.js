import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const outcomes = {
  1: {
    problemFace: "WHY CAN'T AI FIND OUR BEST INFORMATION?",
    solutionFace: "SHOW AI WHERE THE OFFICIAL ANSWER LIVES",
    activeLayers: ["D"],
    question: "Why can't AI systems find our authoritative content?",
    truth: "Publishing accurate information does not guarantee that every engine can discover the right representation.",
    response: "Discovery.",
    guidance: "Help AI find the publisher's official page or agent-legible representation."
  },
  2: {
    problemFace: "WHO IS AI TRUSTING ABOUT US?",
    solutionFace: "MAKE US THE SOURCE OF OUR OWN FACTS",
    activeLayers: ["S"],
    question: "Who defines the facts about our organisation?",
    truth: "AI systems may reconstruct identity and facts from whichever fragments they retrieve and trust.",
    response: "Semantic.",
    guidance: "Publish authoritative facts and identify where they came from."
  },
  3: {
    problemFace: "WHY IS AI USING OLD INFORMATION?",
    solutionFace: "SHOW WHEN OUR INFORMATION LAST CHANGED",
    activeLayers: ["S"],
    question: "Why is old information being presented as current?",
    truth: "A correct fact can become misleading when its source, timestamp, or volatility is unclear.",
    response: "Semantic with Assurance.",
    guidance: "State when information changed so consuming systems can judge whether it remains current."
  },
  4: {
    problemFace: "WHY IS AI SHOWING THE WRONG IMAGE?",
    solutionFace: "SHOW AI WHICH IMAGE IS OFFICIAL",
    activeLayers: ["S", "E"],
    question: "Why is AI substituting or generating the wrong image?",
    truth: "A visible image is not necessarily understood as the canonical media for a specific resource.",
    response: "Semantic and Execution.",
    guidance: "Identify the official image for each resource, then assess what AI actually displays."
  },
  5: {
    problemFace: "WHY DOES AI SOUND WRONG HERE?",
    solutionFace: "EXPLAIN THE TONE THIS MOMENT NEEDS",
    activeLayers: ["C"],
    question: "Why is AI using the wrong tone for this journey?",
    truth: "Facts alone do not communicate the intended tone, sensitivity, guidance, or human handoff.",
    response: "Context.",
    guidance: "Declare the tone, sensitivity, and guidance that the situation requires."
  },
  6: {
    problemFace: "WHO GETS TO DEFINE US TO AI?",
    solutionFace: "DEFINE OURSELVES BEFORE AI GUESSES",
    activeLayers: ["D", "S", "C", "E"],
    question: "Who represents your organisation to AI?",
    truth: "Without a direct declaration, intelligent systems reconstruct it from fragments.",
    response: "The publisher declares the meaning.",
    guidance: "Publish organisational meaning and context before AI reconstructs them from third-party fragments."
  }
};

const faceOrder = [1, 6, 2, 5, 3, 4];
const targetRotations = {
  1: { x: 0, y: -Math.PI / 2, z: 0 },
  6: { x: 0, y: Math.PI / 2, z: 0 },
  2: { x: Math.PI / 2, y: 0, z: 0 },
  5: { x: -Math.PI / 2, y: 0, z: 0 },
  3: { x: 0, y: 0, z: 0 },
  4: { x: 0, y: Math.PI, z: 0 }
};

const viewport = document.querySelector("#dice-viewport");
const canvas = document.querySelector("#opengeo-dice");
const rollButton = document.querySelector("#roll-dsce");
const result = document.querySelector("#dice-result");
const question = document.querySelector("#dice-question");
const response = document.querySelector("#dice-response");

let renderer;
let camera;
let problemDie;
let solutionDie;
let rolling = false;
let lastOutcome = 6;
let outcomeBag = [];

function wrapText(context, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = words.shift() || "";

  words.forEach((word) => {
    const candidate = `${line} ${word}`;
    if (context.measureText(candidate).width <= maxWidth) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  });

  lines.push(line);
  return lines;
}

function createFaceTexture(text, activeLayers, palette) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 512;
  textureCanvas.height = 512;
  const context = textureCanvas.getContext("2d");
  context.scale(2, 2);

  context.fillStyle = palette.background;
  context.fillRect(0, 0, 256, 256);
  context.strokeStyle = palette.edge;
  context.lineWidth = 5;
  context.strokeRect(8, 8, 240, 240);

  context.textAlign = "center";
  context.textBaseline = "middle";
  const edgeLetters = [
    { letter: "D", x: 30, y: 28 },
    { letter: "S", x: 226, y: 28 },
    { letter: "C", x: 30, y: 228 },
    { letter: "E", x: 226, y: 228 }
  ];
  context.font = "700 17px Arial, sans-serif";
  edgeLetters.forEach(({ letter, x, y }) => {
    const isActive = activeLayers.includes(letter);
    context.fillStyle = isActive ? palette.text : palette.quiet;
    context.fillText(letter, x, y);
  });

  context.fillStyle = palette.text;
  const fontSize = text.length > 34 ? 17 : text.length > 24 ? 19 : 22;
  context.font = `700 ${fontSize}px Arial, sans-serif`;
  const lines = wrapText(context, text, 148);
  const lineHeight = fontSize + 5;
  const startY = 128 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => context.fillText(line, 128, startY + index * lineHeight));

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function buildDie(kind) {
  const isProblem = kind === "problem";
  const palette = isProblem
    ? {
        background: "#8f3547",
        edge: "#c87584",
        quiet: "rgba(255,255,255,0.28)",
        text: "#ffffff"
      }
    : {
        background: "#075541",
        edge: "#5aa58e",
        quiet: "rgba(255,255,255,0.28)",
        text: "#ffffff"
      };

  const materials = faceOrder.map((face) => {
    const content = outcomes[face];
    return new THREE.MeshStandardMaterial({
      map: createFaceTexture(
        isProblem ? content.problemFace : content.solutionFace,
        content.activeLayers,
        palette
      ),
      roughness: 0.36,
      metalness: 0.02
    });
  });

  const geometry = new RoundedBoxGeometry(2.05, 2.05, 2.05, 5, 0.16);
  const die = new THREE.Mesh(geometry, materials);
  die.castShadow = true;
  return die;
}

function setOutcomeCopy(face) {
  const outcome = outcomes[face];
  question.innerHTML = `<strong>${outcome.question}</strong> ${outcome.truth}`;
  response.innerHTML = `<strong>${outcome.response}</strong> ${outcome.guidance}`;
}

function shuffle(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function nextOutcome() {
  if (outcomeBag.length === 0) {
    outcomeBag = shuffle([1, 2, 3, 4, 5, 6]);
    if (outcomeBag[outcomeBag.length - 1] === lastOutcome) {
      [outcomeBag[0], outcomeBag[outcomeBag.length - 1]] = [outcomeBag[outcomeBag.length - 1], outcomeBag[0]];
    }
  }
  lastOutcome = outcomeBag.pop();
  return lastOutcome;
}

function easeOutQuart(value) {
  return 1 - Math.pow(1 - value, 4);
}

function rollDice() {
  if (rolling) return;
  rolling = true;
  rollButton.disabled = true;
  rollButton.textContent = "Rolling";
  result.classList.add("is-rolling");

  const face = nextOutcome();
  const target = targetRotations[face];
  const start1 = { x: problemDie.rotation.x, y: problemDie.rotation.y, z: problemDie.rotation.z };
  const start2 = { x: solutionDie.rotation.x, y: solutionDie.rotation.y, z: solutionDie.rotation.z };
  const turns1 = { x: 2, y: 3, z: 2 };
  const turns2 = { x: 3, y: 2, z: 3 };
  const final1 = {
    x: target.x + Math.PI * 2 * turns1.x,
    y: target.y + Math.PI * 2 * turns1.y,
    z: target.z + Math.PI * 2 * turns1.z
  };
  const final2 = {
    x: target.x + Math.PI * 2 * turns2.x,
    y: target.y + Math.PI * 2 * turns2.y,
    z: target.z + Math.PI * 2 * turns2.z
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reducedMotion ? 120 : 920;
  const startTime = performance.now();

  function animate(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = easeOutQuart(progress);

    problemDie.rotation.set(
      start1.x + (final1.x - start1.x) * eased,
      start1.y + (final1.y - start1.y) * eased,
      start1.z + (final1.z - start1.z) * eased
    );
    solutionDie.rotation.set(
      start2.x + (final2.x - start2.x) * eased,
      start2.y + (final2.y - start2.y) * eased,
      start2.z + (final2.z - start2.z) * eased
    );
    renderer.render(problemDie.parent, camera);

    if (progress < 1) {
      requestAnimationFrame(animate);
      return;
    }

    problemDie.rotation.set(target.x, target.y, target.z);
    solutionDie.rotation.set(target.x, target.y, target.z);
    setOutcomeCopy(face);
    renderer.render(problemDie.parent, camera);
    result.classList.remove("is-rolling");
    rollButton.disabled = false;
  rollButton.textContent = "Roll the Dice";
    rolling = false;
  }

  requestAnimationFrame(animate);
}

function resize() {
  if (!renderer || !camera) return;
  const width = Math.max(viewport.clientWidth, 1);
  const height = Math.max(viewport.clientHeight, 1);
  camera.aspect = width / height;
  camera.position.z = width < 520 ? 6.5 : 5.6;
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  renderer.render(problemDie.parent, camera);
}

function init() {
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
  camera.position.set(0, 0.75, 5.6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xcbd8d0, 2.1));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(3, 6, 8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xb8d9ed, 1.2);
  fillLight.position.set(-5, 1, 4);
  scene.add(fillLight);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 8),
    new THREE.ShadowMaterial({ color: 0x17211b, opacity: 0.13 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.5;
  floor.receiveShadow = true;
  scene.add(floor);

  problemDie = buildDie("problem");
  solutionDie = buildDie("solution");
  problemDie.position.x = -1.95;
  solutionDie.position.x = 1.95;
  const initial = targetRotations[6];
  problemDie.rotation.set(initial.x, initial.y, initial.z);
  solutionDie.rotation.set(initial.x, initial.y, initial.z);
  scene.add(problemDie, solutionDie);

  viewport.classList.add("is-ready");
  rollButton.disabled = false;
  resize();
  new ResizeObserver(resize).observe(viewport);
  rollButton.addEventListener("click", rollDice);
  canvas.addEventListener("click", rollDice);
}

init();
