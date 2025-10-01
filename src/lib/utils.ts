import { ABOUT_DATA, COLORS, LIMITS } from './constants';
import { toast } from 'sonner';

export const limitTextLength = (
  text: string,
  maxLength: number = LIMITS.CLI_LINE_LENGTH
): string => {
  const lines = text.split('\n');
  const limitedLines = lines.map((line) => line.slice(0, maxLength));
  return limitedLines.join('\n');
};

// HH:MM:SS format
export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// MM.DD.YYYY format
export const formatDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}.${day}.${year}`;
};

// Sets up canvas with proper dimensions and context
export const setupCanvas = (
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D | null => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return ctx;
};

// Generates random number between min and max (inclusive)
export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Generates random integer between min and max (inclusive)
export const randomIntBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Clamps a value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Debounces a function call
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttles a function call
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Generates a random character from a given string
export const getRandomChar = (characters: string): string => {
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

// Creates a typewriter configuration object
export const createTypewriterConfig = (
  options: {
    cursor?: string;
    delay?: number;
    autoStart?: boolean;
    wrapperClassName?: string;
  } = {}
) => ({
  cursor: options.cursor || '_',
  delay: options.delay || 50,
  autoStart: options.autoStart ?? true,
  wrapperClassName: options.wrapperClassName || 'inline font-mono leading-none',
});

// valid CLI commands
export const isValidCLICommand = (command: string): boolean => {
  const validCommands = [
    'help',
    'about',
    'contact',
    'resume',
    'projects',
    'clear',
  ];
  return validCommands.includes(command.toLowerCase().trim());
};

export const handleHelp = (): string[] => {
  return [
    '===COMMANDS===',
    '',
    '  about    \t--learn more about me',
    '  projects \t--view my projects',
    '  resume   \t--view my resume',
    '  contact  \t--ping me',
    '  clear    \t--clear terminal',
    '',
  ];
};

export const handleAbout = (): string[] => {
  const formatSummary = (text: string) => {
    const maxLength = 80;
    if (text.length <= maxLength) {
      return [`  "summary": "${text}"`];
    }

    const words = text.split(' ');
    const lines = [];
    let currentLine = '  "summary": "';

    for (const word of words) {
      const testLine = currentLine + word + ' ';
      if (testLine.length > maxLength) {
        lines.push(currentLine.slice(0, -1));
        currentLine = '    ' + word + ' ';
      } else {
        currentLine = testLine;
      }
    }

    lines.push(currentLine.slice(0, -1) + '"');
    return lines;
  };

  const formatInterests = (interests: string[]) => {
    const maxLength = 80;
    const interestsString = interests.map((i) => `"${i}"`).join(', ');

    if (interestsString.length <= maxLength) {
      return [`  "interests": [${interestsString}]`];
    }
  
    const words = interestsString.split(' ');
    const lines = [];
    let currentLine = '  "interests": [';
  
    for (const word of words) {
      const testLine = currentLine + word + ' ';
      if (testLine.length > maxLength) {
        lines.push(currentLine.slice(0, -1));
        currentLine = '    ' + word + ' ';
      } else {
        currentLine = testLine;
      }
    }
  
    lines.push(currentLine.slice(0, -1) + ']');
    return lines;
  };
  

  return [
    '{',
    `  "name": "${ABOUT_DATA.name}",`,
    `  "title": "${ABOUT_DATA.title}",`,
    `  "location": "${ABOUT_DATA.location}",`,
    ...formatInterests(ABOUT_DATA.interests),
    ...formatSummary(ABOUT_DATA.summary),
    '}',
  ];
};

export const handleResume = (): string[] => {
  window.open('/tyhuynh-resume.pdf', '_blank');
  return ['opening resume...'];
};

type View = 'contact' | 'projects' | (string & {});

export type Option = { text: string, type: string; value: string };

export const getOptions = (view: View): Option[] => {
  switch (view) {
    case 'contact':
      return handleContact();
    case 'projects':
      return handleProjects();
    default:
      return  [];
  }
};

export const getOptionsTexts = (view: View): string[] =>
  getOptions(view).map(o => o.text);

export const handleContact = (): Array<{
  text: string;
  type: string;
  value: string;
}> => {
  return [
    { text: 'LinkedIn', type: 'button', value: 'linkedin' },
    { text: 'GitHub', type: 'button', value: 'github' },
    { text: 'Email', type: 'button', value: 'email' },
    { text: '[EXIT]', type: 'button', value: 'exit' },
  ];
};

export const handleProjects = (): Array<{
  text: string;
  type: string;
  value: string;
}> => {
  return [
    { text: 'Null-Room', type: 'button', value: 'null-room' },
    { text: 'Project Beta', type: 'button', value: 'project-beta' },
    { text: 'Project Gamma', type: 'button', value: 'project-gamma' },
    { text: 'Project Kappa', type: 'button', value: 'project-kappa' },
    { text: '[EXIT]', type: 'button', value: 'exit' },
  ];
};


export const parseCLIInput = (
  input: string
): { command: string; args: string[] } => {
  const parts = input.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase() || '';
  const args = parts.slice(1);
  return { command, args };
};

export const generateMatrixCharacters = (): string => {
  //   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
  const chars = 'hello';
  return getRandomChar(chars);
};


export const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      background: COLORS.BLACK,
      color: '#ff0000',
      border: '2px dashed #ff0000',
    },
  });
};

export const successToast = (message: string) => {
  toast.success(message, {
    style: {
      background: COLORS.BLACK,
      color: '#00ff00',
      border: '2px dashed #00ff00',
    },
  });
};

// Creates a canvas animation frame with proper cleanup
export const createAnimationFrame = (
  callback: (timestamp: number) => void,
  fps: number = 60
): (() => void) => {
  let animationId: number;
  let lastTime = 0;
  const interval = 1000 / fps;

  const animate = (timestamp: number) => {
    if (timestamp - lastTime >= interval) {
      callback(timestamp);
      lastTime = timestamp;
    }
    animationId = requestAnimationFrame(animate);
  };

  animationId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(animationId);
};
