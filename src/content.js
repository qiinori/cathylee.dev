export const content = {
    meta: {
        title: "Cathy Lee",
        subtitle: "Portfolio 2026"
    },
    splashScreen: {
        title: "Cathy Lee",
        subtitle: "Portfolio 2026"
    },
    navbar: {
        logo: "Cathy Lee",
        links: [
            { id: "portfolio", label: "Portfolio" },
            { id: "services", label: "Services" },
            { id: "experience", label: "Experience" },
            { id: "contact", label: "Contact" }
        ]
    },
    hero: {
        corners: {
            bottomLeft: { label: "Role", text: "Software Developer" },
            bottomRight: { label: "Specialization", text: "Full-Stack Architecture" }
        }
    },
    portfolio: {
        items: [
            {
                meta: "FinTech / Data Visualization",
                title: "Real-time Stock Metrics Platform",
                description: "A high-performance trading platform serving 100+ internal users with live market data visualization. Achieved 30% latency reduction through strategic caching and query optimization.",
                techStack: ["React", "Python", "Redis"]
            },
            {
                meta: "AR / Mobile",
                title: "Data Center AR Navigation",
                description: "iOS prototype using ARKit to reduce asset tracking errors. Features real-time computer vision for equipment identification and QR-based verification.",
                techStack: ["SwiftUI", "ARKit", "Spring Boot"]
            },
            {
                meta: "E-commerce / Web",
                title: "Custom E-commerce Solutions",
                description: "Full-stack development for diverse freelance clients, including Shopify integrations and custom backend architectures for high-traffic online stores.",
                techStack: ["React", "Shopify", "Node.js"]
            },
            {
                meta: "Enterprise / Mobile",
                title: "IMI Employee Management App",
                description: "A centralized iOS application for managing thousands of employee records. Built from scratch with a secure Python/PostgreSQL backend.",
                techStack: ["React Native", "PostgreSQL", "Python"]
            }
        ]
    },
    services: {
        items: [
            {
                num: "01",
                title: "Scalable Full-Stack Engineering",
                description: "Delivering production-grade applications built for growth. By architecting high-performance React interfaces with robust Python or Java backends, I provide end-to-end digital products—not just code—designed to handle real-world traffic and complex business logic."
            },
            {
                num: "02",
                title: "Mobile Product Development",
                description: "Driving business results through intuitive mobile experiences. From enterprise-scale internal tools to niche AR solutions, I build high-performance applications using SwiftUI and React Native. My focus is on solving specific operational challenges with seamless, native-level performance."
            },
            {
                num: "03",
                title: "Data Intelligence & Real-Time Visualization",
                description: "Transforming raw data into a strategic asset. I specialize in building high-frequency monitoring platforms and interactive dashboards. By visualizing KPIs in real-time, I enable stakeholders to make precision, data-driven decisions at the speed of their business."
            },
            {
                num: "04",
                title: "Performance & Latency Optimization",
                description: "Maximizing retention by eliminating technical bottlenecks. Slow software is a silent conversion killer. With a proven track record of reducing API latency by ~30%, I conduct deep-dive audits to optimize database queries and backend logic, ensuring a frictionless user experience."
            },
            {
                num: "05",
                title: "Cloud Architecture & DevOps Automation",
                description: "Building resilient, cost-effective infrastructure. I facilitate seamless cloud transitions using Docker and Kubernetes for containerized reliability. By implementing automated CI/CD pipelines, I ensure deployments are fast, error-free, and require minimal manual overhead."
            },
            {
                num: "06",
                title: "Legacy Modernization & API Strategy",
                description: "Future-proofing your business by revitalizing aging tech. I specialize in refactoring legacy systems and building secure RESTful APIs. My approach breaks down information silos, allowing disparate tools to communicate and ensuring your stack remains modern and interoperable."
            }
        ]
    },
    experience: {
        items: [
            {
                company: "Morgan Stanley",
                date: "2022 — 2025",
                role: "Software Developer II",
                location: "Montreal, Canada"
            },
            {
                company: "Morgan Stanley",
                date: "2022",
                role: "Software Developer I",
                location: "Montreal, Canada | New York"
            },
            {
                company: "Freelance",
                date: "2021 — Present",
                role: "Full-stack Developer",
                location: "Remote"
            },
            {
                company: "IMI",
                date: "2021",
                role: "Software Developer",
                location: "Ottawa, Canada"
            }
        ],
        note: "* Detailed history available on request or detailed above."
    },
    footer: {
        links: [
            { label: "LinkedIn", url: "https://linkedin.com/in/icathy" },
            { label: "GitHub", url: "https://github.com/qiinori" },
            { label: "Email", url: "mailto:qiinori@gmail.com" }
        ],
        copyright: "© 2026 Cathy Lee."
    }
};
