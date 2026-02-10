import { content } from '../content';

const Capabilities = () => {
    return (
        <section id="capabilities" className="section">
            <div className="container">
                <h2 className="mobile-section-title animate-on-scroll">CAPABILITIES</h2>
                <div className="capabilities-grid">
                    {content.capabilities.items.map((item, index) => (
                        <div
                            className="capability-card animate-on-scroll"
                            key={index}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <span className="capability-num">{item.num}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
