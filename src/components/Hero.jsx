import { content } from '../content';
import { useEffect, useRef } from 'react';

const Hero = () => {
    const { corners } = content.hero;
    return (
        <section id="hero" className="hero section">
            <div className="hero-corners">
                <div className="corner bottom-left">
                    <span className="label">{corners.bottomLeft.label}</span>
                    <p>{corners.bottomLeft.text}</p>
                </div>

                <div className="corner bottom-right">
                    <span className="label">{corners.bottomRight.label}</span>
                    <p>{corners.bottomRight.text}</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
