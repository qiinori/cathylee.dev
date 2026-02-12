import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        if (matchMedia('(pointer:fine)').matches) {
            document.body.classList.add('custom-cursor-active');

            const onMouseMove = (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            };

            const onMouseEnter = () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
                cursor.style.mixBlendMode = 'normal';
                cursor.style.opacity = '0.1';
            };

            const onMouseLeave = () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.mixBlendMode = 'difference';
                cursor.style.opacity = '';
            };

            document.addEventListener('mousemove', onMouseMove);

            // Use event delegation to handle dynamic elements

            const onMouseOver = (e) => {
                if (e.target.closest('a, button, .interactive')) {
                    onMouseEnter();
                }
            };

            const onMouseOut = (e) => {
                if (e.target.closest('a, button, .interactive')) {
                    onMouseLeave();
                }
            };

            document.addEventListener('mouseover', onMouseOver);
            document.addEventListener('mouseout', onMouseOut);


            return () => {
                document.body.classList.remove('custom-cursor-active');
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseover', onMouseOver);
                document.removeEventListener('mouseout', onMouseOut);
            };
        } else {
            cursor.style.display = 'none';
        }
    }, []);

    return <div className="cursor-follower" ref={cursorRef}></div>;
};

export default CustomCursor;
