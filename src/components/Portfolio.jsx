import { content } from '../content';

const Portfolio = () => {
    return (
        <section id="portfolio" className="section">
            <div className="container">
                <div className="portfolio-grid">
                    {content.portfolio.items.map((item, index) => (
                        <article className="portfolio-item" key={index}>
                            <div className="item-meta">{item.meta}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <ul className="tech-stack">
                                {item.techStack.map((tech, i) => (
                                    <li key={i}>{tech}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
