import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const GAME_CONFIG = {
  width: 800,
  height: 600,
  lanes: [200, 300, 400],
  gateDistance: 1000,
  totalGates: 6,
};

const questions = [
  { question: "Which HTML tag creates an unordered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], correct: 1 },
  { question: "What does CSS 'display: flex' create?", options: ["Grid layout", "Flexbox container", "Block element", "Inline element"], correct: 1 },
  { question: "How do you declare a constant in JavaScript?", options: ["var x = 5", "let x = 5", "const x = 5", "constant x = 5"], correct: 2 },
  { question: "Which CSS selector targets elements by class?", options: ["#classname", ".classname", "*classname", "@classname"], correct: 1 },
  { question: "What does '===' check in JavaScript?", options: ["Assignment", "Equality only", "Strict equality", "Not equal"], correct: 2 },
  { question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
];

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  init() {
    // game state
    this.currentLane = 1;
    this.gameTimer = 0;
    this.timeModifier = 0;
    this.isGameActive = true;
    this.gateNumber = 0;
    this.quizModal = null;
  }

  create() {
    // background
    this.add.rectangle(GAME_CONFIG.width/2, GAME_CONFIG.height/2, GAME_CONFIG.width, GAME_CONFIG.height, 0x808080);

    // runner
    this.runner = this.add.circle(100, GAME_CONFIG.lanes[1], 25, 0x4caf50).setStrokeStyle(3, 0x2e7d32);
    this.tweens.add({ targets: this.runner, rotation: Math.PI*2, duration: 1000, repeat: -1, ease: "Linear" });

    // UI
    this.timerText = this.add.text(20, 20, "Time: 0.0s", { fontSize: "20px", color: "#fff" });
    this.progressText = this.add.text(GAME_CONFIG.width-140, 20, "Gate: 0/6", { fontSize: "20px", color: "#fff" });

    // input: only up/down arrows
    const cursors = this.input.keyboard.createCursorKeys();
    cursors.up.on("down", () => { if (this.isGameActive && this.currentLane>0) this.moveLane(-1); });
    cursors.down.on("down", () => { if (this.isGameActive && this.currentLane<2) this.moveLane(+1); });

    // groups
    this.obstacles = this.add.group();
    this.gates = this.add.group();

    // spawners & timer
    this.time.addEvent({ delay:1200, callback: this.spawnObstacle, callbackScope:this, loop:true });
    this.time.addEvent({ delay:3000, callback: this.spawnGate, callbackScope:this, loop:true });
    this.time.addEvent({ delay:100, callback: this.updateTimer, callbackScope:this, loop:true });
  }

  moveLane(delta) {
    this.currentLane += delta;
    this.tweens.add({ targets:this.runner, y: GAME_CONFIG.lanes[this.currentLane], duration:200, ease:"Power2" });
  }

  spawnObstacle() {
    if (!this.isGameActive) return;
    const lane = Phaser.Math.Between(0,2);
    const obs = this.add.rectangle(GAME_CONFIG.width+20, GAME_CONFIG.lanes[lane], 40,40, 0xff0000).setStrokeStyle(2,0xcc0000);
    this.tweens.add({ targets:obs, x:-50, duration:3000, ease:"Linear", onComplete:()=>obs.destroy() });
  }

  spawnGate() {
    if (!this.isGameActive || this.gateNumber>=GAME_CONFIG.totalGates) return;
    this.gateNumber++;
    const xStart = GAME_CONFIG.width+20;
    // vertical line
    const gate = this.add.rectangle(xStart, GAME_CONFIG.height/2, 10, GAME_CONFIG.height, 0x2196f3);
    const label = this.add.text(xStart, 50, `${this.gateNumber}`, { fontSize:"24px", color:"#fff" }).setOrigin(0.5);
    this.gates.addMultiple([gate, label]);
    this.tweens.add({
      targets:[gate,label], x:-50, duration:3000, ease:"Linear",
      onComplete: () => { gate.destroy(); label.destroy(); }
    });
  }

  updateTimer() {
    if (!this.isGameActive || this.quizModal) return;
    this.gameTimer += 0.1;
    this.timerText.setText(`Time: ${(this.gameTimer+this.timeModifier).toFixed(1)}s`);
    this.progressText.setText(`Gate: ${this.gateNumber}/${GAME_CONFIG.totalGates}`);
  }

  update() {
    // collision with obstacles
    this.obstacles.getChildren().forEach(ob => {
      if (Phaser.Math.Distance.Between(ob.x, ob.y, this.runner.x, this.runner.y) < 30) {
        this.scene.restart();
      }
    });
    // collision with gates triggers quiz
    this.gates.getChildren().forEach(g => {
      if (g.x && Math.abs(g.x - this.runner.x)<30) {
        this.showQuiz();
      }
    });
  }

  showQuiz() {
    this.isGameActive = false;

    // overlay
    this.add.rectangle(GAME_CONFIG.width/2, GAME_CONFIG.height/2, GAME_CONFIG.width, GAME_CONFIG.height, 0x000000, 0.8);

    const gateIdx = this.gateNumber - 1;
    const q = questions[gateIdx];

    // modal
    this.add.rectangle(GAME_CONFIG.width/2, GAME_CONFIG.height/2, 500,300, 0x2196f3).setStrokeStyle(3,0x1976d2);
    this.add.text(GAME_CONFIG.width/2, 150, q.question, { fontSize:"18px", color:"#fff", align:"center", wordWrap:{width:450} }).setOrigin(0.5);

    q.options.forEach((opt, idx) => {
      const y = 250 + idx*40;
      const btn = this.add.rectangle(GAME_CONFIG.width/2, y, 440, 35, 0x4caf50).setInteractive();
      const txt = this.add.text(GAME_CONFIG.width/2, y, `${String.fromCharCode(65+idx)}. ${opt}`, { fontSize:"16px", color:"#fff" }).setOrigin(0.5);

      btn.on("pointerover", ()=>btn.setFillStyle(0x66bb6a));
      btn.on("pointerout", ()=>btn.setFillStyle(0x4caf50));
      btn.on("pointerdown", ()=>{
        this.timeModifier += (idx===q.correct ? -5 : +3);
        this.isGameActive = true;
        // destroy modal elements
        btn.destroy(); txt.destroy();
        this.children.list.filter(c=>c.depth>0).forEach(c=>{ if (c!==this.runner && c!==this.timerText && c!==this.progressText) c.destroy() });
      });
    });
  }
}

export default function ObstacleCourse() {
  const gameDiv = useRef(null);
  const phaserRef = useRef(null);

  useEffect(() => {
    if (gameDiv.current && !phaserRef.current) {
      phaserRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: GAME_CONFIG.width,
        height: GAME_CONFIG.height,
        parent: gameDiv.current,
        scene: GameScene,
        backgroundColor: "#808080",
        scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH, width:"100%", height:"100%" },
      });
    }
    return () => phaserRef.current && phaserRef.current.destroy(true);
  }, []);

  return (
    <div
      ref={gameDiv}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    />
  );
}
