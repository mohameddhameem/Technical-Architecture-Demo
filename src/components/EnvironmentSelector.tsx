import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  LogIn, 
  ExternalLink, 
  ChevronDown, 
  Settings, 
  TestTube, 
  Server
} from 'lucide-react';

export const EnvironmentSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const environments = [
    {
      id: 'dev',
      name: 'Development',
      url: 'https://www.ubs.com/sg/en.html',
      icon: Settings,
      color: 'bg-blue-500'
    },
    {
      id: 'te1',
      name: 'TE1',
      url: 'https://www.ubs.com/sg/en.html',
      icon: TestTube,
      color: 'bg-orange-500'
    },
    {
      id: 'te2',
      name: 'TE2',
      url: 'https://www.ubs.com/sg/en.html',
      icon: Server,
      color: 'bg-green-500'
    }
  ];

  const handleLaunchEnvironment = (url: string, envName: string) => {
    console.log(`Launching ${envName} environment at: ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white border border-red-700 shadow-sm hover:shadow-md transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogIn size={16} />
          <span className="text-sm font-medium">Login</span>
          <ChevronDown 
            size={14} 
            className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-[9999] bg-transparent" 
                onClick={() => setIsOpen(false)}
              />
              
              {/* Dropdown */}
              <motion.div
                className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl z-[10000]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <div className="p-2">
                  {environments.map((env) => {
                    const IconComponent = env.icon;
                    return (
                      <div
                        key={env.id}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-full ${env.color} text-white`}>
                            <IconComponent size={14} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {env.name}
                          </span>
                        </div>
                        <button
                          onClick={() => handleLaunchEnvironment(env.url, env.name)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          title={`Launch ${env.name} environment`}
                        >
                          <ExternalLink size={12} className="text-gray-400 hover:text-red-600 transition-colors" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>


    </>
  );
};