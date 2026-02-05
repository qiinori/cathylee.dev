import { content } from '../content';

const Services = () => {
    return (
        <section id="services" className="section">
            <div className="container">
                <div className="services-grid">
                    {content.services.items.map((item, index) => (
                        <div className="service-card" key={index}>
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
