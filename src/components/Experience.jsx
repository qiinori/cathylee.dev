import { content } from '../content';

const Experience = () => {
    return (
        <section id="experience" className="section">
            <div className="container">
                <div className="experience-grid">
                    {content.experience.items.map((item, index) => (
                        <div className="experience-item" key={index}>
                            <div className="exp-row">
                                <h3 className="exp-company">{item.company}</h3>
                                <span className="exp-date">{item.date}</span>
                            </div>
                            <div className="exp-row">
                                <p className="exp-role">{item.role}</p>
                                <span className="exp-location">{item.location}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: '2rem', opacity: 0.5, fontSize: '0.9rem' }}>
                    {content.experience.note}
                </p>
            </div>
        </section>
    );
};

export default Experience;
