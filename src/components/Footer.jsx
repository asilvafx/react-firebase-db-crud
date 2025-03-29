import React from 'react';

const footerMenuItems = [
    {
        title: "Protocol",
        links: [
            { name: "Tokenomics", href: "#" },
            { name: "Whitepaper", href: "#" },
            { name: "Roadmap", href: "#" },
            { name: "Governance", href: "#" },
        ],
    },
    {
        title: "Developers",
        links: [
            { name: "Documentation", href: "#" },
            { name: "GitHub", href: "#" },
            { name: "Bug Bounty", href: "#" },
            { name: "Audits", href: "#" },
        ],
    },
    {
        title: "Community",
        links: [
            { name: "Discord", href: "#" },
            { name: "Telegram", href: "#" },
            { name: "X", href: "#" },
            { name: "Blog", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "FAQ", href: "#" },
            { name: "Media Kit", href: "#" },
            { name: "Careers", href: "#" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="text-gray-300">
            <div className="w-full max-w-screen-lg mx-auto">

                {/* Main Footer Content */}
                <div className="py-16 px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
                    {footerMenuItems.map((section, index) => (
                        <div key={index} className="space-y-6">
                            <h3 className="text-white text-lg font-semibold tracking-wide">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href={link.href} className="inline-block text-gray-400 hover:text-primary transition-colors duration-200">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;