import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  initialLanguage?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ initialLanguage = 'en' }) => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Load language preference from localStorage on component mount
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // If no language preference is saved, use the initialLanguage prop
      i18n.changeLanguage(initialLanguage);
    }
  }, [i18n, initialLanguage]);
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  
  return (
    <div className={styles.languageSwitcher}>
      <select
        className={styles.languageSelect}
        value={i18n.language}
        onChange={handleLanguageChange}
        aria-label="Select language"
      >
        <option value="en">{t('language.en')}</option>
        <option value="hi">{t('language.hi')}</option>
      </select>
      <span className={styles.arrow}></span>
    </div>
  );
};

export default LanguageSwitcher; 