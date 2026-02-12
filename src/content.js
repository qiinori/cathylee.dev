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
            // { id: "capabilities", label: "CAPABILITIES" },
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
            id: "fullstack",
            label: "Full-Stack Web & E-Commerce",
            items: [
                {
                    meta: "FinTech / Real-Time",
                    title: "Stock Metrics Platform",
                    description: "Enterprise trading platform. 100+ senior-level users. 30% faster responses.",
                    techStack: ["React", "Python", "Grafana", "PostgreSQL", "REST API", "WebSocket", "Redis", "Docker"],
                    video: null
                },
                {
                    meta: "E-Commerce / Full-Stack",
                    title: "End-to-End E-Commerce Solutions & Brand Platforms",
                    description: "Enterprise e-commerce. Built for traffic spikes.",
                    techStack: ["React", "LiquidJS", "Shopify API", "Python", "PostgreSQL", "3D animation", "Vercel"],
                    video: null
                },
                {
                    meta: "Data Visualization / Analytics",
                    title: "Interactive Business Intelligence Dashboards",
                    description: "Complex data. Instant insights.",
                    techStack: ["Python", "PostgreSQL", "Grafana", "Plotly", "REST API", "Flask"],
                    video: null
                },
                {
                    meta: "Product Design / UX",
                    title: "Data-Driven Product Design & User Research",
                    description: "Research-driven design. 40% engagement lift.",
                    techStack: ["Figma", "User Research", "Wireframing", "Prototyping", "UserTesting"],
                    video: null
                },
            ]
        },
        {
            id: "mobile",
            label: "Mobile & iOS Development",
            items: [
                {
                    meta: "Enterprise / Cross-Platform",
                    title: "Enterprise Workforce Management System",
                    description: "Developed cross-platform employee management system handling 10,000+ records with PostgreSQL backend. Implemented role-based access control (RBAC) and secure authentication for enterprise compliance.",
                    techStack: ["React Native", "PostgreSQL", "Python"],
                    video: null
                },
                {
                    meta: "AR / Computer Vision",
                    title: "ARKit-Powered Warehouse Navigation",
                    description: "Prototyped ARKit-based warehouse navigation tool that reduced asset tracking errors by 25%. Integrated computer vision for real-time equipment identification and QR code verification workflows.",
                    techStack: ["SwiftUI", "ARKit", "Spring Boot"],
                    video: null
                },
                {
                    meta: "iOS / Offline-First",
                    title: "Large-Scale Library Cataloging App [Beta]",
                    description: "Built offline-first iOS cataloging app with SwiftUI and CoreData, supporting 50,000+ item library. Integrated Google Books API for automated metadata enrichment with background sync capabilities.",
                    techStack: ["Flutter", "Python", "REST API", "Google Books API"],
                    video: null
                },
                {
                    meta: "AI / Gaming",
                    title: "ML-Powered Gaming Performance Analyzer [Beta]",
                    description: "Developing machine learning-powered gaming analytics platform (iOS) that analyzes player performance metrics using Core ML. Provides personalized improvement recommendations based on historical match data and meta analysis.",
                    techStack: ["Flutter", "Core ML", "Python", "Pandas", "Firebase"],
                    video: null
                }
            ]
        }
    ]
    },
    capabilities: {
        items: [
            {
                num: "01",
                title: "Full-Stack Application Development",
                description: "Building production-ready applications designed for scale and maintainability. I architect performant React frontends paired with Python/Java backends, delivering complete digital solutions that handle high-traffic demands and complex business requirements from day one."
            },
            {
                num: "02",
                title: "Native iOS & Mobile Engineering",
                description: "Shipping native-quality mobile experiences that solve real business problems. Using SwiftUI and React Native, I build enterprise tools and consumer apps with focus on performance, offline reliability, and intuitive UX that drives user adoption."
            },
            {
                num: "03",
                title: "Real-Time Monitoring & Data Visualization",
                description: "Converting complex data into actionable insights through real-time dashboards and monitoring systems. I build high-throughput visualization platforms using modern observability stacks (Grafana, Prometheus) that empower teams to make data-driven decisions instantly."
            },
            {
                num: "04",
                title: "Performance Engineering & Optimization",
                description: "Eliminating performance bottlenecks that impact user retention and revenue. Through systematic profiling and optimization—including database query tuning, caching strategies, and API optimization—I've consistently achieved 30%+ latency reductions in production systems."
            },
            {
                num: "05",
                title: "Cloud Infrastructure & CI/CD Automation",
                description: "Designing resilient cloud infrastructure with automated deployment pipelines. I implement containerized architectures using Docker/Kubernetes and establish CI/CD workflows that enable fast, reliable releases while reducing operational overhead and cloud costs."
            },
            {
                num: "06",
                title: "Legacy Modernization & API Architecture",
                description: "Modernizing legacy systems through strategic refactoring and API-first design. I transform monolithic architectures into maintainable, scalable services with well-documented RESTful APIs, enabling system interoperability and reducing technical debt."
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
                company: "IMI - A Global People Company",
                date: "2021",
                role: "Software Developer",
                location: "Ottawa, Canada"
            }
        ]
    },
    footer: {
        links: [
            { label: "LinkedIn", url: "https://linkedin.com/in/cathyleedev" },
            { label: "GitHub", url: "https://github.com/qiinori" },
            { label: "Email", url: "mailto:hi@cathylee.dev" }
        ],
        copyright: "© 2026 Cathy Lee."
    }
};
