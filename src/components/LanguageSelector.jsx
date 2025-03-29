import React from 'react';
import { Globe } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' }
];

const LanguageSelector = () => {
    const handleLanguageChange = (e) => {
        const selectedLang = e.target.value;
        console.log('Language changed to:', selectedLang);
        // Here you would typically update your app's language context/state
    };

    return (
        <div className="w-100 premium-panel p-4 md:p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Globe className="w-6 h-6 premium-icon" />
                </div>
                <h4 className="text-xl font-medium">Language</h4>
            </div>
            <select
                onChange={handleLanguageChange}
                defaultValue="en"
                className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;