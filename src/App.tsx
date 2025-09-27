import { motion } from 'motion/react';
import { 
  Mic, 
  FileText, 
  Languages, 
  FileSpreadsheet, 
  ArrowRight, 
  ArrowDown,
  Zap,
  MessageSquare,
  Volume2,
  Users,
  Database,
  Globe,
  Monitor,
  Code,
  Phone,
  Brain,
  Cpu,
  Cloud,
  Link,
  Shield,
  Moon,
  Sun,
  LogIn,
  ExternalLink,
  ChevronDown,
  Server,
  TestTube,
  Settings
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { UBSLogo } from './components/UBSLogo';
import { AzureLogo } from './components/AzureLogo';
import { EnvironmentSelector } from './components/EnvironmentSelector';

const AnimatedDot = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="w-2 h-2 bg-red-500 rounded-full"
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay: delay,
    }}
  />
);

const DataFlow = ({ isActive, delay = 0 }: { isActive: boolean; delay?: number }) => (
  <motion.div
    className="flex items-center gap-1"
    initial={{ opacity: 0 }}
    animate={{ opacity: isActive ? 1 : 0 }}
    transition={{ delay }}
  >
    <motion.div
      className="flex gap-1"
      animate={isActive ? { x: [0, 20, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <AnimatedDot delay={0} />
      <AnimatedDot delay={0.2} />
      <AnimatedDot delay={0.4} />
    </motion.div>
  </motion.div>
);

const ProcessingStage = ({ 
  icon: Icon, 
  title, 
  description, 
  isActive, 
  isProcessing,
  delay = 0,
  isInSpeechFoundation = false,
  isLanguageDetection = false,
  isTranscriptionRouting = false
}: { 
  icon: any; 
  title: string; 
  description: string; 
  isActive: boolean; 
  isProcessing: boolean;
  delay?: number;
  isInSpeechFoundation?: boolean;
  isLanguageDetection?: boolean;
  isTranscriptionRouting?: boolean;
}) => (
  <motion.div
    className={`relative p-4 rounded-lg border-2 transition-all duration-500 ${
      isActive 
        ? isInSpeechFoundation 
          ? 'border-red-500 bg-red-50 dark:bg-red-900/30 shadow-lg' 
          : 'border-red-500 bg-red-50 dark:bg-red-900/30 shadow-lg'
        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
    } ${(isLanguageDetection || isTranscriptionRouting) && isActive ? 'overflow-visible relative mb-8' : ''}`}
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ 
      scale: isActive ? 1.05 : 1, 
      opacity: 1,
      y: isActive ? -5 : 0
    }}
    transition={{ delay, duration: 0.5 }}
  >
    {/* Language Detection Special Visualization */}
    {isLanguageDetection && isActive && (
      <LanguageDetector isActive={isActive} />
    )}
    
    {/* Transcription Routing Special Visualization */}
    {isTranscriptionRouting && isActive && (
      <TranscriptionRouter isActive={isActive} />
    )}
    
    <div className="flex flex-col items-center text-center space-y-2">
      <motion.div
        animate={isProcessing && !isLanguageDetection ? { rotate: 360 } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={`p-2 rounded-full ${
          isActive ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        } ${(isLanguageDetection || isTranscriptionRouting) && isActive ? 'relative z-10' : ''}`}
      >
        <Icon size={20} />
      </motion.div>
      
      <div className={(isLanguageDetection || isTranscriptionRouting) && isActive ? 'relative z-10' : ''}>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-sm">{title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 max-w-28">{description}</p>
        
        {/* Enhanced description for Language Detection */}
        {isLanguageDetection && isActive && (
          <motion.p 
            className="text-xs text-green-600 dark:text-green-400 font-medium mt-1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AI Model Active
          </motion.p>
        )}
        
        {/* Enhanced description for Transcription Routing */}
        {isTranscriptionRouting && isActive && (
          <motion.p 
            className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Model Router Active
          </motion.p>
        )}
      </div>

      {isProcessing && !isLanguageDetection && !isTranscriptionRouting && (
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className="flex space-x-1">
            <motion.div
              className="w-1 h-1 bg-red-500 rounded-full"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-1 h-1 bg-red-500 rounded-full"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-1 h-1 bg-red-500 rounded-full"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>
      )}
    </div>
  </motion.div>
);

const SpeechWaves = ({ isActive }: { isActive: boolean }) => (
  <motion.div 
    className="flex items-center justify-center space-x-1"
    initial={{ opacity: 0 }}
    animate={{ opacity: isActive ? 1 : 0.3 }}
  >
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-green-500 rounded-full"
        animate={isActive ? {
          height: [8, 16, 8, 20, 8, 12, 8],
        } : { height: 8 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.1,
        }}
      />
    ))}
  </motion.div>
);

const TranscriptionRouter = ({ isActive }: { isActive: boolean }) => {
  const [routingPhase, setRoutingPhase] = useState<'analyzing' | 'deciding' | 'selected'>('analyzing');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [factorIndex, setFactorIndex] = useState(0);
  
  const models = [
    { 
      name: 'Azure Speech-to-Text', 
      provider: 'Microsoft Azure',
      score: 94, 
      color: 'bg-blue-500',
      strengths: ['Multi-language', 'Enterprise Security'],
      icon: '🔷',
      match: 'Best Match'
    },
    { 
      name: 'OpenAI Whisper', 
      provider: 'OpenAI',
      score: 88, 
      color: 'bg-green-500',
      strengths: ['High accuracy', 'Noise handling'],
      icon: '🤖',
      match: 'Good'
    },
    { 
      name: 'Wav2Vec 2.0', 
      provider: 'Meta (Open Source)',
      score: 82, 
      color: 'bg-purple-500',
      strengths: ['Cost-effective', 'Customizable'],
      icon: '🔓',
      match: 'Limited'
    },
    { 
      name: 'SpeechT5', 
      provider: 'Microsoft (Open Source)',
      score: 79, 
      color: 'bg-orange-500',
      strengths: ['Lightweight', 'Fast processing'],
      icon: '⚡',
      match: 'Limited'
    }
  ];

  const routingFactors = [
    { text: 'Language: German + English', weight: 'High' },
    { text: 'Audio quality: High (48kHz)', weight: 'Medium' },
    { text: 'Enterprise security required', weight: 'Critical' },
    { text: 'Real-time processing needed', weight: 'High' }
  ];

  useEffect(() => {
    if (!isActive) {
      setSelectedModel(null);
      setRoutingPhase('analyzing');
      setFactorIndex(0);
      return;
    }
    
    // Phase 1: Analyze routing factors
    const factorInterval = setInterval(() => {
      setFactorIndex((prev) => {
        if (prev >= routingFactors.length - 1) {
          clearInterval(factorInterval);
          setTimeout(() => setRoutingPhase('deciding'), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1400);

    // Phase 2: Make routing decision after analyzing factors
    const decisionTimeout = setTimeout(() => {
      setRoutingPhase('selected');
      setSelectedModel('Azure Speech-to-Text');
    }, (routingFactors.length * 1400) + 2500);
    
    return () => {
      clearInterval(factorInterval);
      clearTimeout(decisionTimeout);
    };
  }, [isActive, routingFactors.length]);

  if (!isActive) return null;

  return (
    <motion.div 
      className="absolute top-full left-0 mt-2 w-80 max-w-[90vw] bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-600 rounded-lg p-3 shadow-xl z-[60]"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-center mb-3">
        <motion.div
          className="flex items-center space-x-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Cpu className="text-blue-600" size={16} />
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Intelligent Model Router</span>
        </motion.div>
      </div>
      
      {/* Routing Factors Analysis */}
      <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
        <div className="font-medium text-gray-700 dark:text-gray-300 mb-2">
          {routingPhase === 'analyzing' ? 'Analyzing Requirements:' : 
           routingPhase === 'deciding' ? 'Making Routing Decision...' : 
           'Requirements Analyzed:'}
        </div>
        {routingFactors.map((factor, index) => (
          <motion.div 
            key={index}
            className={`text-gray-600 dark:text-gray-400 flex items-center justify-between mb-1 ${
              routingPhase === 'analyzing' && index === factorIndex ? 'bg-blue-100 dark:bg-blue-900/30 px-1 py-0.5 rounded' : ''
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index <= factorIndex ? 1 : 0.3 }}
            transition={{ delay: index * 0.3 }}
          >
            <div className="flex items-center space-x-1">
              <span className={`w-1 h-1 rounded-full ${
                index <= factorIndex ? 'bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
              }`}></span>
              <span>{factor.text}</span>
            </div>
            <span className={`text-xs font-medium ${
              factor.weight === 'Critical' ? 'text-red-600' :
              factor.weight === 'High' ? 'text-orange-600' : 'text-blue-600'
            }`}>
              {factor.weight}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Routing Decision Display */}
      {routingPhase !== 'analyzing' && (
        <motion.div 
          className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/30 rounded text-xs border border-blue-200 dark:border-blue-600"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">Routing Decision:</div>
          <div className="text-blue-600 dark:text-blue-400">
            Enterprise security + multi-language → <strong>Azure Speech-to-Text</strong>
          </div>
        </motion.div>
      )}
      
      {/* Available Models with Match Score */}
      <div className="space-y-2">
        {models.map((model, index) => (
          <motion.div
            key={model.name}
            className={`flex items-center justify-between p-2 rounded transition-all ${
              selectedModel === model.name 
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 shadow-sm' 
                : 'bg-gray-50 dark:bg-gray-700'
            }`}
            animate={selectedModel === model.name ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 1.2 }}
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <span className="text-sm flex-shrink-0">{model.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{model.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{model.provider}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
              {selectedModel === model.name && (
                <motion.div
                  className="text-xs text-green-600 dark:text-green-400 font-medium whitespace-nowrap"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✓ Routed
                </motion.div>
              )}
              <span className={`text-xs font-medium whitespace-nowrap ${
                model.match === 'Best Match' ? 'text-green-600 dark:text-green-400' : 
                model.match === 'Good' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {model.match}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Status */}
      <motion.div 
        className="mt-3 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {routingPhase === 'analyzing' && (
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            Analyzing requirements... ({factorIndex + 1}/{routingFactors.length})
          </span>
        )}
        {routingPhase === 'deciding' && (
          <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
            Computing optimal route...
          </span>
        )}
        {routingPhase === 'selected' && selectedModel && (
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
            ✓ Routed to {selectedModel}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

const LanguageDetector = ({ isActive }: { isActive: boolean }) => {
  const [currentAnalyzing, setCurrentAnalyzing] = useState(0);
  
  const languages = [
    { code: 'EN', name: 'English', confidence: 28, color: 'bg-blue-500' },
    { code: '中文', name: 'Mandarin', confidence: 35, color: 'bg-red-500' },
    { code: '粵語', name: 'Cantonese', confidence: 22, color: 'bg-orange-500' },
    { code: 'DE', name: 'German', confidence: 12, color: 'bg-gray-500' },
    { code: 'FR', name: 'French', confidence: 3, color: 'bg-purple-500' }
  ];

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setCurrentAnalyzing((prev) => (prev + 1) % languages.length);
    }, 800);
    
    return () => clearInterval(interval);
  }, [isActive, languages.length]);

  if (!isActive) return null;

  return (
    <motion.div 
      className="absolute top-full left-0 mt-2 w-72 max-w-[90vw] bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-600 rounded-lg p-3 shadow-xl z-[60]"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-center mb-3">
        <motion.div
          className="flex items-center space-x-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="text-green-600" size={16} />
          <span className="text-xs font-semibold text-green-700 dark:text-green-400">AI Language Analysis</span>
        </motion.div>
      </div>
      
      {/* Language Analysis List */}
      <div className="space-y-2">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.code}
            className={`flex items-center justify-between p-2 rounded ${
              index === currentAnalyzing ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-600' : 'bg-gray-50 dark:bg-gray-700'
            }`}
            animate={index === currentAnalyzing ? {
              scale: [1, 1.02, 1],
              backgroundColor: ['#f0fdf4', '#dcfce7', '#f0fdf4']
            } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${lang.color} ${
                index === currentAnalyzing ? 'animate-pulse' : ''
              }`} />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{lang.code}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{lang.name}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {index === currentAnalyzing && (
                <motion.div
                  className="text-xs text-green-600 dark:text-green-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Analyzing...
                </motion.div>
              )}
              <span className={`text-xs font-medium ${
                lang.confidence >= 30 ? 'text-green-600' : 
                lang.confidence >= 15 ? 'text-orange-500' : 'text-gray-500'
              }`}>
                {lang.confidence}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Status */}
      <motion.div 
        className="mt-3 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
          Detecting primary language...
        </span>
      </motion.div>
    </motion.div>
  );
};

const ConversationPhone = ({ isActive }: { isActive: boolean }) => (
  <div className="relative flex items-center justify-center">
    {/* Phone Icon with pulse */}
    <motion.div
      animate={isActive ? {
        scale: [1, 1.1, 1],
      } : { scale: 1 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Phone 
        className={`${isActive ? 'text-green-500' : 'text-gray-400'} transition-colors duration-500`} 
        size={20} 
      />
    </motion.div>
    
    {/* Conversation bubbles floating around phone */}
    {isActive && (
      <>
        {/* Left bubble (Client) */}
        <motion.div
          className="absolute -left-6 -top-2 w-2 h-2 bg-blue-500 rounded-full"
          animate={{
            x: [0, 8, 0],
            y: [0, -2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0,
          }}
        />
        
        {/* Right bubble (Advisor) */}
        <motion.div
          className="absolute -right-6 -bottom-2 w-2 h-2 bg-green-500 rounded-full"
          animate={{
            x: [0, -8, 0],
            y: [0, 2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1.5,
          }}
        />
        
        {/* Signal waves */}
        <motion.div
          className="absolute -top-1 -left-1 w-6 h-6 border-2 border-green-300 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
        
        <motion.div
          className="absolute -top-2 -left-2 w-8 h-8 border border-green-200 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </>
    )}
  </div>
);

const OutputPreview = ({ isVisible, content }: { isVisible: boolean; content: string }) => (
  <motion.div
    className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
    initial={{ opacity: 0, height: 0 }}
    animate={{ 
      opacity: isVisible ? 1 : 0,
      height: isVisible ? 'auto' : 0
    }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center space-x-2 mb-2">
      <FileText size={16} className="text-gray-600 dark:text-gray-400" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Output Preview</span>
    </div>
    <motion.p 
      className="text-sm text-gray-600 dark:text-gray-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ delay: 0.3 }}
    >
      {content}
    </motion.p>
  </motion.div>
);



export default function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode and apply to document
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const stages = [
    { 
      id: 0, 
      title: 'Call & Storage', 
      description: 'UBS Client-Advisor call saved to Verba',
      output: 'Audio file: "client_advisor_call_20241226_143022.wav" - Duration: 45:32'
    },
    { 
      id: 1, 
      title: 'Language Detection', 
      description: 'Identify spoken language',
      output: 'Detected Languages: Mandarin (Primary: 82%), English (Secondary: 18%) - Confidence: 96%'
    },
    { 
      id: 2, 
      title: 'Transcription', 
      description: 'Speech to text conversion',
      output: 'Mandarin Transcript: "您好，王先生，很高兴见到您。我想讨论一下我的投资组合策略。目前市场波动很大，我希望了解更多关于资产配置和风险管理的建议..."'
    },
    { 
      id: 3, 
      title: 'Translation', 
      description: 'Translation to English',
      output: 'English Translation: "Hello, Mr. Wang, it\'s great to meet you. I would like to discuss my investment portfolio strategy. The market is currently very volatile, and I hope to learn more about asset allocation and risk management recommendations..."'
    },
    { 
      id: 4, 
      title: 'Summarization', 
      description: 'Content summarization',
      output: 'Summary: Client (Mr. Wang) initiated consultation about investment portfolio strategy. Key discussion points: market volatility concerns, asset allocation optimization, and risk management strategies. Client requested follow-up meeting with detailed investment recommendations.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        const next = (prev + 1) % stages.length;
        if (next === 0) {
          setCycleCount(c => c + 1);
        }
        return next;
      });
    }, 4000); // Slightly longer timing for more stages

    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative mb-4">
            {/* UBS Logo - Positioned absolutely on the left */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <UBSLogo className="text-red-600" width={100} height={34} />
            </div>
            
            {/* Controls - Positioned absolutely on the right */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
              {/* Environment Selector */}
              <EnvironmentSelector />
              
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="text-yellow-500" size={20} />
                ) : (
                  <Moon className="text-gray-600" size={20} />
                )}
              </motion.button>
            </div>
            
            {/* Center - Title and Brain Icon aligned with Speech Foundation Service */}
            <div className="flex items-center justify-center space-x-3">
              <Brain className="text-red-600" size={32} />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Speech Foundation - AI Platform
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-center mx-auto">
            Foundational Speech Services to enable conversational analytics
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <div className="relative">
          
          {/* Input Section */}
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center space-x-6 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
              <div className="flex items-center space-x-3">
                <Users className="text-blue-600" size={24} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">UBS Client</span>
              </div>
              <ConversationPhone isActive={currentStage === 0} />
              <div className="flex items-center space-x-3">
                <Users className="text-green-600" size={24} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Client Advisor</span>
              </div>
              <ArrowRight className="text-gray-400 dark:text-gray-500" size={20} />
              <div className="flex items-center space-x-3">
                <Volume2 className="text-green-500" size={24} />
                <SpeechWaves isActive={currentStage === 0} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Call Audio</span>
              </div>
            </div>
          </motion.div>

          {/* Call & Storage Section - Condensed */}
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-col items-center space-y-1">
              <ArrowDown className="text-gray-400" size={16} />
              <div className="px-2 py-1">
                <div className="flex items-center space-x-1">
                  <Database className={`${currentStage === 0 ? 'text-red-500' : 'text-gray-400'} transition-colors`} size={14} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Call & Storage → Verba</span>
                </div>
              </div>
              <ArrowDown className="text-gray-400" size={16} />
            </div>
          </motion.div>

          {/* Processing Stages */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {/* Speech Foundation Service Container with LLM Integration */}
            <div className="w-full">
              <div className="relative flex items-center gap-6">
                {/* Speech Foundation Service - Made Bigger */}
                <motion.div 
                  className="flex-1 border-2 border-green-200 dark:border-green-600 rounded-xl p-8 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {/* Azure Deployment Badge */}
                  <motion.div 
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                      <AzureLogo size={14} />
                      <span className="text-xs">Deployed in Azure</span>
                    </div>
                  </motion.div>

                  {/* Speech Foundation Header */}
                  <motion.div 
                    className="flex items-center justify-center mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-green-200 dark:border-green-600">
                      <Cpu className="text-green-600" size={20} />
                      <h2 className="font-bold text-green-700 dark:text-green-400">Speech Foundation Service</h2>
                    </div>
                  </motion.div>
                  
                  {/* Speech Foundation Components - Made Bigger */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    <ProcessingStage
                      icon={Globe}
                      title="Language Detection"
                      description="Identify spoken language"
                      isActive={currentStage === 1}
                      isProcessing={currentStage === 1}
                      delay={0.2}
                      isInSpeechFoundation={true}
                      isLanguageDetection={true}
                    />
                    
                    <ProcessingStage
                      icon={FileText}
                      title="Transcription"
                      description="Speech to text conversion"
                      isActive={currentStage === 2}
                      isProcessing={currentStage === 2}
                      delay={0.3}
                      isInSpeechFoundation={true}
                      isTranscriptionRouting={true}
                    />
                    
                    <ProcessingStage
                      icon={Languages}
                      title="Translation"
                      description="Translation to English"
                      isActive={currentStage === 3}
                      isProcessing={currentStage === 3}
                      delay={0.4}
                      isInSpeechFoundation={true}
                    />
                    
                    <ProcessingStage
                      icon={MessageSquare}
                      title="Summarization"
                      description="Content summarization"
                      isActive={currentStage === 4}
                      isProcessing={currentStage === 4}
                      delay={0.5}
                      isInSpeechFoundation={true}
                    />
                  </div>
                  

                </motion.div>

                {/* Connection Lines to LLM Services */}
                <motion.div 
                  className="flex flex-col items-center space-y-2 hidden lg:flex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  {/* To Azure OpenAI */}
                  <motion.div 
                    className="flex items-center space-x-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-1 h-1 bg-blue-500 rounded-full"
                        animate={{ x: [0, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-1 h-1 bg-blue-500 rounded-full"
                        animate={{ x: [0, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                    <ArrowRight className="text-blue-500" size={16} />
                  </motion.div>
                  
                  {/* To AI Gateway */}
                  <motion.div 
                    className="flex items-center space-x-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-1 h-1 bg-purple-500 rounded-full"
                        animate={{ x: [0, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      <motion.div
                        className="w-1 h-1 bg-purple-500 rounded-full"
                        animate={{ x: [0, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                      />
                    </div>
                    <ArrowRight className="text-purple-500" size={16} />
                  </motion.div>
                </motion.div>

                {/* LLM Services (Right Side) */}
                <motion.div 
                  className="flex-none w-72 space-y-4 hidden lg:block"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  {/* Azure OpenAI */}
                  <motion.div 
                    className="p-4 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-600 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Cloud className="text-blue-600 dark:text-blue-400" size={20} />
                      <span className="font-semibold text-blue-700 dark:text-blue-300">Azure OpenAI</span>
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 text-center mt-1">GPT Models | Enterprise Security</div>
                  </motion.div>

                  {/* AI Platform Container */}
                  <motion.div 
                    className="p-4 bg-purple-50 dark:bg-purple-900/30 border-2 border-purple-200 dark:border-purple-600 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Brain className="text-purple-600 dark:text-purple-400" size={18} />
                        <span className="font-semibold text-purple-700 dark:text-purple-300">AI Platform</span>
                      </div>
                    </div>
                    
                    {/* AI Gateway Service inside AI Platform */}
                    <motion.div 
                      className="p-3 bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-600 rounded-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Link className="text-purple-600 dark:text-purple-400" size={16} />
                        <span className="font-medium text-purple-700 dark:text-purple-300">AI Gateway Service</span>
                      </div>
                      <div className="text-xs text-purple-600 dark:text-purple-400 text-center mt-1">
                        LLM Routing | Load Balancing | Security
                      </div>
                    </motion.div>
                  </motion.div>


                </motion.div>
              </div>
            </div>
          </div>





          {/* Access Methods */}
          <motion.div
            className="mt-12 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Speech Foundation Service Access</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available through multiple access methods for different UBS teams</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div
                className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Monitor className="text-red-600" size={24} />
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">End User UI</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Web-based interface for direct access to Speech Foundation Service components
                </p>
                
                {/* Example Teams */}
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Example Teams:</div>
                  <div className="flex flex-wrap gap-2">
                    <motion.span 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-600"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Users size={12} className="mr-1" />
                      GWM APAC BRO Team
                    </motion.span>
                    <motion.span 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-600"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Users size={12} className="mr-1" />
                      Front Line Support Team
                    </motion.span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Code className="text-red-600" size={24} />
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">API Integration</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  RESTful API endpoints for programmatic access to Speech Foundation Service
                </p>
                
                {/* Example Teams */}
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Example Teams:</div>
                  <div className="flex flex-wrap gap-2">
                    <motion.span 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-600"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Code size={12} className="mr-1" />
                      Conversational Banking Team
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Output Preview */}
          <motion.div
            className="mt-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <OutputPreview
              isVisible={currentStage >= 0}
              content={stages[currentStage]?.output || ''}
            />
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            className="mt-8 flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStage 
                    ? 'bg-red-600 scale-125' 
                    : index < currentStage 
                      ? 'bg-red-400' 
                      : 'bg-gray-300'
                }`}
                animate={{
                  scale: index === currentStage ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: index === currentStage ? Infinity : 0 }}
              />
            ))}
          </motion.div>

          {/* Cycle Counter */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Processing Cycle: {cycleCount + 1} | Stage: {currentStage + 1}/{stages.length}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}