import { createContext, useState, useEffect, useMemo } from 'react';

// 1. Create the Context object
export const ThemeContext = createContext({
    // 'vibrant' added as a possible user preference
    theme: 'system', // 'light', 'dark', 'system', or 'vibrant'
    mode: 'light',   // 'light' or 'dark' (the actual color scheme being displayed)
    setTheme: () => { },
});

// 2. Create the Provider component
export const ThemeProvider = ({ children }) => {
    // Get initial state from localStorage. We'll default to 'system'.
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'system'
    );

    // 3. Determine the actual color mode based on theme state
    // NOTE: The 'mode' is primarily used to know if the system preference is dark or light
    // when 'theme' is set to 'system'. The 'vibrant' theme bypasses this.
    const mode = useMemo(() => {
        if (theme === 'system') {
            // Check OS preference
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        }
        // If theme is 'light', 'dark', or 'vibrant', return the explicit theme name
        return theme;
    }, [theme]);

    // 4. Update localStorage and the DOM on theme change
    useEffect(() => {
        // A. Persist the user's choice (theme preference: 'light', 'dark', 'system', or 'vibrant')
        localStorage.setItem('theme', theme);

        // B. Apply the correct data-theme attribute to the <body> element
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else if (theme === 'vibrant') {
            // Apply the 'vibrant' attribute for the third theme's CSS
            document.body.setAttribute('data-theme', 'vibrant');
        } else {
            // This covers 'light' and 'system' (which resolves to 'light' if OS is light).
            // When 'system' resolves to 'dark', the CSS media query takes over.
            document.body.removeAttribute('data-theme');
        }
    }, [theme]); // We only need 'theme' here, as 'mode' is derived from 'theme' or OS.

    // The value exposed to consumers
    const contextValue = { theme, mode, setTheme };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};