import React, { useState, useEffect } from 'react';
import './style.css'
const SettingsPage = ({ onCloseSettings }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('en');
    const [autoplay, setAutoplay] = useState(true);
    const [subtitles, setSubtitles] = useState(false);
    const [privacy, setPrivacy] = useState('public');
    const [billingInfo, setBillingInfo] = useState({});

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-mode' : '';
    }, [theme]);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save settings data to backend or local storage
        console.log('Settings saved:', { username, email, theme, language, autoplay, subtitles, privacy, billingInfo });
    };

    return (
        <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'dark-mode' : ''}`}>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full mt-1 px-4 py-2 border rounded-md" />
                    </label>
                </div>
                <div>
                    <label className="block mb-2">
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full mt-1 px-4 py-2 border rounded-md" />
                    </label>
                </div>
                <div>
                    <label className="block mb-2">
                        Theme:
                        <select value={theme} onChange={(e) => setTheme(e.target.value)} className="block w-full mt-1 px-4 py-2 border rounded-md">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="block mb-2">
                        Language:
                        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="block w-full mt-1 px-4 py-2 border rounded-md">
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            {/* Add more language options */}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="block mb-2">
                        Autoplay:
                        <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} className="mt-1" />
                    </label>
                </div>
                <div>
                    <label className="block mb-2">
                        Subtitles:
                        <input type="checkbox" checked={subtitles} onChange={(e) => setSubtitles(e.target.checked)} className="mt-1" />
                    </label>
                </div>
                <div>
                    <label className="block mb-2">
                        Privacy:
                        <select value={privacy} onChange={(e) => setPrivacy(e.target.value)} className="block w-full mt-1 px-4 py-2 border rounded-md">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </label>
                </div>
                {/* Add more settings options */}
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save Settings</button>
                    <button type="button" onClick={onCloseSettings} className="text-blue-500 py-2 px-4 rounded-md hover:text-blue-600">Back</button>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
