import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
  initialTheme?: 'light' | 'dark';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ initialTheme = 'light' }) => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  
  useEffect(() => {
    // Load theme from localStorage on component mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // If no theme is saved, use the initialTheme prop
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, [initialTheme]);
  
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <div className={styles.themeToggle} onClick={toggleTheme}>
      <div className={`${styles.option} ${theme === 'light' ? styles.active : ''}`}>
        {t('theme.light')}
      </div>
      <div className={`${styles.option} ${theme === 'dark' ? styles.active : ''}`}>
        {t('theme.dark')}
      </div>
      <div className={`${styles.slider} ${theme === 'dark' ? styles.right : ''}`} />
    </div>
  );
};

export default ThemeToggle; 