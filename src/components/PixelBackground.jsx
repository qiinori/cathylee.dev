import { useEffect, useRef } from 'react';

const PixelBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const gridSize = 40;
        let mouseX = 0;
        let mouseY = 0;
        let animationFrameId;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const initParticles = () => {
            particles = [];
            const cols = Math.ceil(width / gridSize);
            const rows = Math.ceil(height / gridSize);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    if (Math.random() > 0.5) {
                        particles.push({
                            x: i * gridSize + gridSize / 2,
                            y: j * gridSize + gridSize / 2,
                            baseAlpha: Math.random() * 0.15 + 0.05,
                            pulseSpeed: 0.02 + Math.random() * 0.05,
                            phase: Math.random() * Math.PI * 2
                        });
                    }
                }
            }
        };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const particleColor = isDark ? '255, 255, 255' : '0, 0, 0';

            particles.forEach(p => {
                p.phase += p.pulseSpeed;
                const alpha = p.baseAlpha + Math.sin(p.phase) * 0.08;

                if (alpha > 0) {
                    ctx.save();
                    ctx.translate(p.x, p.y);

                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const angle = Math.atan2(dy, dx);

                    ctx.rotate(angle);

                    ctx.fillStyle = `rgba(${particleColor}, ${Math.max(0, alpha)})`;
                    ctx.fillRect(-gridSize / 2 + 1, -gridSize / 2 + 1, gridSize - 2, gridSize - 2);

                    ctx.restore();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', resize);

        resize();
        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="pixel-bg" ref={canvasRef}></canvas>;
};

export default PixelBackground;
