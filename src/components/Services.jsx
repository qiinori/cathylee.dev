import { content } from '../content';

const Services = () => {
    return (
        <section id="services" className="section">
            <div className="container">
                <h2 className="mobile-section-title animate-on-scroll">Services</h2>
                <div className="services-grid">
                    {content.services.items.map((item, index) => (
                        <div
                            className="service-card animate-on-scroll"
                            key={index}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <span className="service-num">{item.num}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
