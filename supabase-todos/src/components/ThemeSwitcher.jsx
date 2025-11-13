import { useTheme } from '../hooks/useTheme'

export function ThemeSwitcher() {
    const { theme, setTheme, mode } = useTheme();

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <div>
            <p>Active Mode: **{mode}** (User preference: {theme})</p>
            <label htmlFor='theme-select'>Select Theme:</label>
            <select
                id='theme-select'
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
            >
                <option value='system'>System Standard</option>
                <option value='light'>Light Mode</option>
                <option value='dark'>Dark Mode</option>
                <option value='vibrant'>Vibrant Mode</option> {/* <-- New Option */}
            </select>
        </div>
    );
}