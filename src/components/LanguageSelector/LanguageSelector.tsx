import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');

    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

  return (
    <div>
      <label
        htmlFor="language-select"
        className="flex flex-col text-sm font-medium text-text-base "
      >
        {t('selectlanguage')}
        <select
          id="language-select"
          className=" bg-inpt-primary border-inpt-bord-primary placeholder-gray-400"
          onChange={handleLanguageChange}
          defaultValue={i18n.language}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </label>
    </div>
  );
}

export default LanguageSelector;
