import { useState, useCallback, useMemo, memo } from 'react';

// Componente memoizado para el contenido de la tab activa
const TabContent = memo(({ content }) => {
  return <div>{content}</div>;
});

TabContent.displayName = 'TabContent';

/**
 * TabsModule optimizado con React.memo y useCallback
 * @param {Array} tabs - [{ id: string, label: string, icon?: ReactNode, content: ReactNode }]
 * @param {string} initialTab - id de la pestaña activa inicial
 * @param {function} onTabChange - callback opcional para cambio de pestaña
 */
const TabsModule = ({ tabs, initialTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab || (tabs[0] && tabs[0].id));

  const handleTabChange = useCallback((id) => {
    setActiveTab(id);
    if (onTabChange) onTabChange(id);
  }, [onTabChange]);

  const activeTabObj = useMemo(() => 
    tabs.find(tab => tab.id === activeTab), 
    [tabs, activeTab]
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Tabs internos */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-2 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {IconComponent && (
                  <IconComponent className="w-5 h-5" />
                )}
                {tab.mobileLabel ? (
                  <>
                    <span className="md:hidden">{tab.mobileLabel}</span>
                    <span className="hidden md:inline">{tab.label}</span>
                  </>
                ) : (
                  <span className="inline">{tab.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
      {/* Contenido de la pestaña activa */}
      <TabContent content={activeTabObj?.content} />
    </div>
  );
};

export default memo(TabsModule);