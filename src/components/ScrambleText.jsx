import { useState, useRef, useEffect } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

const ScrambleText = ({ text, triggerOnMount = false, delay = 0 }) => {
    const [display, setDisplay] = useState(text);
    const intervalRef = useRef(null);

    const scramble = () => {
        let iteration = 0;

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplay(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        // Keep spaces as spaces to preserve word structure
                        if (char === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
            }

            iteration += 1 / 3; // Controls the speed of the reveal
        }, 30);
    };

    useEffect(() => {
        if (triggerOnMount) {
            const timeout = setTimeout(() => {
                scramble();
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [triggerOnMount, delay]);

    return (
        <span
            onMouseEnter={scramble}
            className="scramble-text"
            // Use monospace to prevent jitter, but inherit size/color
            style={{
                fontFamily: '"Space Mono", monospace',
                display: 'inline-block'
            }}
        >
            {display}
        </span>
    );
};

export default ScrambleText;
