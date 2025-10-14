'use client';

import { useState, useEffect } from 'react';
import { Switch } from './ui/switch';
import LightModeIcon from './icons/lightModelIcon';
import DarkModeIcon from './icons/darkModelIcon';
import Box from './box';

const Appearance = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  return (
    <Box>
      <div>
        <div>
          <LightModeIcon />
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            id="appearance-switcher"
          />
          <DarkModeIcon />
        </div>
      </div>
    </Box>
  );
};

export default Appearance;
