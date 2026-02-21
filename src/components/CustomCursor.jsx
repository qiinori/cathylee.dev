import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        if (matchMedia('(pointer:fine)').matches) {
            document.body.classList.add('custom-cursor-active');

            let rafId;
            let pendingX = 0, pendingY = 0;
            let isHovering = false;

            const onMouseMove = (e) => {
                pendingX = e.clientX;
                pendingY = e.clientY;
                if (!rafId) {
                    rafId = requestAnimationFrame(() => {
                        const scale = isHovering ? 'scale(2.5)' : 'scale(1)';
                        cursor.style.transform = `translate(${pendingX}px, ${pendingY}px) translate(-50%, -50%) ${scale}`;
                        rafId = null;
                    });
                }
            };

            const onMouseOver = (e) => {
                if (e.target.closest('a, button, .interactive')) {
                    isHovering = true;
                    cursor.style.mixBlendMode = 'normal';
                    cursor.style.opacity = '0.1';
                }
            };

            const onMouseOut = (e) => {
                if (e.target.closest('a, button, .interactive')) {
                    isHovering = false;
                    cursor.style.mixBlendMode = 'difference';
                    cursor.style.opacity = '';
                }
            };

            document.addEventListener('mousemove', onMouseMove, { passive: true });
            document.addEventListener('mouseover', onMouseOver);
            document.addEventListener('mouseout', onMouseOut);

            return () => {
                document.body.classList.remove('custom-cursor-active');
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseover', onMouseOver);
                document.removeEventListener('mouseout', onMouseOut);
                if (rafId) cancelAnimationFrame(rafId);
            };
        } else {
            cursor.style.display = 'none';
        }
    }, []);

    return <div className="cursor-follower" ref={cursorRef}></div>;
};

export default CustomCursor;
