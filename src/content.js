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
        categories: [
            {
                id: "ecommerce",
                label: "E-Commerce & Web Solutions",
                items: [
                    {
                        meta: "E-Commerce / Solutions",
                        title: "Integrated Shopify & Local Retail Ecosystems",
                        description: "Delivered end-to-end full-stack solutions for diverse clients, including a specialized installation firm and local retail businesses. Developed custom Shopify integrations and optimized backend architectures to handle high-traffic seasonal surges.",
                        techStack: ["React", "Shopify API", "Node.js", "Liquid", "Python"],
                        video: null
                    },
                    {
                        meta: "Web / Branding",
                        title: "Bespoke Personal Brand Portfolios",
                        description: "Designed and deployed high-performance personal websites for individual clients, focusing on responsive UI/UX and SEO optimization to enhance digital presence.",
                        techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
                        video: null
                    },
                    {
                        meta: "E-Commerce / Design",
                        title: "User-Centric UI/UX & Prototyping",
                        description: "Led the complete UI/UX design lifecycle for e-commerce platforms and web applications, from wireframing and user research to high-fidelity prototyping. Leveraged Figma to create intuitive user flows that significantly improved engagement metrics.",
                        techStack: ["Figma", "User Research", "Wireframing", "Prototyping"],
                        video: null
                    },
                    {
                        meta: "FinTech / Data Visualization",
                        title: "Real-time Stock Metrics Platform",
                        description: "A high-performance trading platform serving 100+ internal users with live market data visualization. Achieved 30% latency reduction through strategic caching and query optimization.",
                        techStack: ["React", "Python", "Redis"],
                        video: "/demo_video.mov"
                    }
                ]
            },
            {
                id: "ios",
                label: "IOS Innovation",
                items: [
                    {
                        meta: "Enterprise / Mobile",
                        title: "Employee Management App",
                        description: "A centralized cross-platform application for managing thousands of employee records. Built from scratch with a secure database architecture and role-based access control.",
                        techStack: ["React Native", "PostgreSQL", "Python"],
                        video: null
                    },
                    {
                        meta: "AR / Mobile",
                        title: "AR Navigation",
                        description: "iOS prototype using ARKit to reduce asset tracking errors. Features real-time computer vision for equipment identification and QR-based verification to streamline warehouse management.",
                        techStack: ["SwiftUI", "ARKit", "Spring Boot"],
                        video: null
                    },
                    {
                        meta: "Mobile / Data",
                        title: "Smart Inventory & Library Manager",
                        description: "A high-performance iOS application for large-scale book cataloging. Integrated Google Books API for automated metadata retrieval and implemented a local-first architecture for seamless offline access and synchronization.",
                        techStack: ["SwiftUI", "CoreData", "REST API", "Google Books API"],
                        video: null
                    },
                    {
                        meta: "AI / Mobile",
                        title: "AI-Powered Gaming Analytics Assistant [WIP]",
                        description: "A data-driven iOS application currently in development that analyzes individual player metrics to optimize gameplay. Utilizing machine learning to identify skill gaps and provide real-time strategic recommendations based on historical match data and playstyle analysis.",
                        techStack: ["SwiftUI", "Core ML", "Python", "Pandas", "Firebase"],
                        video: null
                    }
                ]
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
            { label: "Email", url: "mailto:hi@cathylee.dev" }
        ],
        copyright: "© 2026 Cathy Lee."
    }
};
