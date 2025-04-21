import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { useNavigate } from 'react-router-dom';

export default function PhaserSpaceshipQuiz() {
    const gameContainerRef = useRef(null);
    const navigate = useNavigate();
    const [finalScore, setFinalScore] = useState(null);

    useEffect(() => {
        let game;
        let ship, bubbles, cursors;
        let score = 0;
        let scoreText;
        const questions = [
            { prompt: '5 x 5 = ?', answer: '25' },
            { prompt: 'Capital of Japan?', answer: 'tokyo' },
            { prompt: 'Hex code for white?', answer: '#ffffff' }
        ];
        let questionIndex = 0;
        let asking = false;
        let panel;

        function preload() { }

        function create() {
            const cx = this.cameras.main.centerX;
            const cy = this.cameras.main.centerY;

            // Starfield
            this.cameras.main.setBackgroundColor('#000022');
            for (let i = 0; i < 200; i++) {
                const x = Phaser.Math.Between(0, this.scale.width);
                const y = Phaser.Math.Between(0, this.scale.height);
                const star = this.add.circle(x, y, Phaser.Math.Between(1, 2), 0xffffff);
                this.tweens.add({
                    targets: star,
                    alpha: { from: 0.2, to: 1 },
                    duration: Phaser.Math.Between(1000, 3000),
                    yoyo: true,
                    repeat: -1
                });
            }

            // Generate textures off-scene
            const g = this.make.graphics({ add: false });
            g.fillStyle(0x00ffff); g.fillTriangle(0, 32, 16, 0, 32, 32);
            g.generateTexture('ship', 32, 32);
            g.clear();
            g.fillStyle(0xaa00ff); g.fillCircle(16, 16, 16);
            g.generateTexture('bubble', 32, 32);

            // Add ship and bubbles
            ship = this.physics.add.sprite(cx, cy, 'ship').setCollideWorldBounds(true);
            bubbles = this.physics.add.group();
            for (let i = 0; i < 7; i++) {
                const x = Phaser.Math.Between(50, this.cameras.main.width - 50);
                const y = Phaser.Math.Between(50, this.cameras.main.height - 50);
                bubbles.create(x, y, 'bubble');
            }
            bubbles.children.iterate(c => {
                this.tweens.add({
                    targets: c,
                    y: c.y - 30,
                    yoyo: true,
                    repeat: -1,
                    duration: Phaser.Math.Between(1500, 2500),
                    ease: 'Sine.easeInOut'
                });
            });

            // Score text
            scoreText = this.add.text(20, 20, 'Score: 0', {
                font: '24px Courier', fill: '#0ff', stroke: '#000', strokeThickness: 4
            }).setShadow(2, 2, '#000', 2, true, true);

            this.physics.add.overlap(ship, bubbles, hitBubble, null, this);
            cursors = this.input.keyboard.createCursorKeys();

            // Create question panel via HTML string
            const html = `
        <div class="question-panel">
          <p id="qtext">Question?</p>
          <input id="qinput" type="text" placeholder="Type your answer..." />
          <br/>
          <button id="qbtn">Submit</button>
        </div>
      `;
            panel = this.add.dom(cx, cy)
                .createFromHTML(html)
                .setOrigin(0.5)
                .setVisible(false);

            panel.node.querySelector('#qbtn').addEventListener('click', () => {
                const user = panel.node.querySelector('#qinput').value.trim().toLowerCase();
                const correct = questions[questionIndex % questions.length].answer.toLowerCase();
                if (user === correct) {
                    score++;
                    scoreText.setText('Score: ' + score);
                }
                panel.setVisible(false);
                asking = false;
                questionIndex++;
                // Check if all bubbles are gone
                if (bubbles.countActive(true) === 0) {
                    endGame();
                }
            });
        }

        function update() {
            if (asking) {
                ship.setVelocity(0);
                return;
            }
            ship.setVelocity(0);
            if (cursors.left.isDown) ship.setVelocityX(-200);
            if (cursors.right.isDown) ship.setVelocityX(200);
            if (cursors.up.isDown) ship.setVelocityY(-200);
            if (cursors.down.isDown) ship.setVelocityY(200);
        }

        function hitBubble(s, bubble) {
            bubble.disableBody(true, true);
            asking = true;
            const q = questions[questionIndex % questions.length];
            panel.node.querySelector('#qtext').textContent = q.prompt;
            panel.node.querySelector('#qinput').value = '';
            panel.setVisible(true);
        }

        function endGame() {
            setFinalScore(score);
            console.log("Final Score:", score);
            setTimeout(() => {
                if (game) game.destroy(true);
            }, 500);
        }

        const config = {
            type: Phaser.AUTO,
            backgroundColor: '#000022',
            parent: gameContainerRef.current,
            physics: { default: 'arcade' },
            dom: { createContainer: true },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: '100%',
                height: '100%'
            },
            scene: { preload, create, update }
        };

        game = new Phaser.Game(config);

        window.addEventListener('resize', () => {
            game.scale.resize(window.innerWidth, window.innerHeight);
        });

        return () => {
            if (game) game.destroy(true);
        };
    }, []);

    return (
        <>
            <div
                ref={gameContainerRef}
                id="game"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                    padding: 0,
                    zIndex: 10,
                    overflow: 'hidden',
                }}
            />
            {/* Home button overlay */}
            <button
                onClick={() => navigate("/")}
                style={{
                    position: "fixed",
                    top: 24,
                    right: 32,
                    zIndex: 100,
                    background: "rgba(255,255,255,0.95)",
                    color: "#222",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 22px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    boxShadow: "0 2px 12px #0002",
                    cursor: "pointer",
                    transition: "background 0.2s"
                }}
            >
                Home
            </button>
            {/* Show final score overlay when game ends */}
            {finalScore !== null && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0,0,0,0.95)",
                        color: "#0ff",
                        padding: "40px 60px",
                        borderRadius: "16px",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        zIndex: 200,
                        textAlign: "center",
                        boxShadow: "0 0 40px #0ff8"
                    }}
                >
                    Game Over<br />
                    Your Score: {finalScore}
                    <br />
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            marginTop: "30px",
                            padding: "14px 36px",
                            fontSize: "1.2rem",
                            background: "#0ff",
                            color: "#000",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            boxShadow: "0 0 10px #0ff8"
                        }}
                    >
                        Go Home
                    </button>
                </div>
            )}
            <style>{`
        html, body, #root {
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        .question-panel {
          background: rgba(10,10,30,0.9);
          color: #0ff;
          padding: 20px;
          border: 2px solid #0ff;
          border-radius: 10px;
          width: 380px;
          text-align: center;
          font-family: 'Lucida Console', Monaco, monospace;
          box-shadow: 0 0 20px #0ff, 0 0 40px #00ccff;
        }
        .question-panel p { margin: 0 0 10px; font-size: 18px; }
        .question-panel input {
          width: 90%; padding: 10px; margin-top: 10px;
          font-size: 16px; background: #011; color: #0ff;
          border: 2px solid #0ff; border-radius: 5px;
          text-shadow: 0 0 5px #0ff;
        }
        .question-panel input::placeholder { color: #0aa; }
        .question-panel button {
          margin-top: 15px; padding: 12px 24px;
          font-size: 16px; border: none;
          background: linear-gradient(45deg, #0ff, #00aaff);
          color: #000; cursor: pointer; border-radius: 5px;
          box-shadow: 0 0 15px #0ff;
          transition: transform 0.1s ease;
        }
        .question-panel button:active { transform: scale(0.95); }
      `}</style>
        </>
    );
}