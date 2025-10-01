'use client';

import { useEffect, useRef, useState } from 'react';
import { TIMING, LIMITS, CONTACT_DATA } from './constants';
import {
  handleHelp,
  handleAbout,
  handleResume,
  parseCLIInput,
  getOptionsTexts,
  successToast,
  errorToast
} from './utils';

// Custom hook for typewriter effect with delayed start
export const useTypewriter = (delay: number = TIMING.TYPEWRITER_DELAY) => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const removeTypewriterCursor = () => {
    const cursorEl = typewriterRef.current?.querySelector(
      '.Typewriter__cursor'
    );
    if (cursorEl) cursorEl.remove();
  };

  const resetTypeWriter = () => {
    setShowTypewriter(false);
  };

  return {
    showTypewriter,
    typewriterRef,
    removeTypewriterCursor,
    resetTypeWriter,
  };
};

/**
 * Custom hook for CLI input with character limit and caret positioning
 */
export const useCLIInput = (maxLength: number = LIMITS.CLI_LINE_LENGTH) => {
  const [userInput, setUserInput] = useState('');
  const [caretOffset, setCaretOffset] = useState(0);
  const ghostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ghostRef.current) {
        setCaretOffset(ghostRef.current.offsetWidth);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [userInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lines = value.split('\n');
    const limitedLines = lines.map((line) => line.slice(0, maxLength));
    const limitedValue = limitedLines.join('\n');
    setUserInput(limitedValue);
  };

  const clearInput = () => {
    setUserInput('');
    setCaretOffset(0);
  };

  return {
    userInput,
    setUserInput,
    caretOffset,
    ghostRef,
    handleInputChange,
    clearInput,
  };
};

export const useCLICommands = (clearInput?: () => void) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<
    'home' | 'help' | 'about' | 'contact' | 'projects' | 'resume'
  >('home');

  const [contactSelection, setContactSelection] = useState(0);
  const [projectSelection, setProjectSelection] = useState(0);
  const [showInput, setShowInput] = useState(false);

  const handleCommand = (input: string) => {
    const { command } = parseCLIInput(input);

    switch (command) {
      case 'help':
        setCurrentView('home');
        setCommandHistory([...handleHelp()]);
        break;
      case 'about':
        setCurrentView('about');
        setCommandHistory([`> ${input}`, ...handleAbout()]);
        break;
      case 'resume':
        setCurrentView('resume');
        setCommandHistory([`> ${input}`, ...handleResume()]);
        break;
      case 'contact':
        setCurrentView('contact');
        setContactSelection(0);
        setCommandHistory(['\u200B']);
        break;
      case 'projects':
        setCurrentView('projects');
        setProjectSelection(0);
        setCommandHistory(['\u200B']);
        break;
      case 'clear':
        setCurrentView('home');
        setCommandHistory([]);
        break;
      default:
        setCommandHistory((prev) => [
          ...prev,
          `> ${input}`,
          'ERROR: command not found',
        ]);
    }
  };

  const handleNavigation = (direction: 'up' | 'down') => {
    if (currentView !== 'contact' && currentView !== 'projects') return;

    const isContact = currentView === 'contact';
    const options = getOptionsTexts(currentView as 'contact' | 'projects');

    const currentSelection = isContact ? contactSelection : projectSelection;
    const setSelection = isContact ? setContactSelection : setProjectSelection;

    let newSelection = currentSelection;

    if (direction === 'up') {
      newSelection =
        currentSelection > 0 ? currentSelection - 1 : options.length - 1;
    } else {
      newSelection =
        currentSelection < options.length - 1 ? currentSelection + 1 : 0;
    }

    setSelection(newSelection);

    const updatedLines = options.map((option, index) =>
      index === newSelection ? `> ${option} <--` : `> ${option}`
    );

    setCommandHistory((prev) => {
      const commandLine = prev[0];
      return [commandLine, ...updatedLines];
    });
  };

  const handleSelection = (value: string) => {
    if (currentView !== 'contact' && currentView !== 'projects') return;

    if (value === 'exit') {
      setCurrentView('home');
      setCommandHistory([...handleHelp()]);
      if (clearInput) clearInput();
    } else if (currentView === 'contact') {
      // Contact-specific actions
      if (value === 'linkedin') {
        window.open(CONTACT_DATA.linkedin, '_blank');
        setCommandHistory((prev) => [...prev, 'Opening LinkedIn...']);
      } else if (value === 'github') {
        window.open(CONTACT_DATA.github, '_blank');
        setCommandHistory((prev) => [...prev, 'Opening GitHub...']);
      } else if (value === 'email') {
        navigator.clipboard
          .writeText(CONTACT_DATA.email)
          .then(() => {
            successToast('success: email copied to clipboard!')
          })
          .catch(() => {
            errorToast('ERROR: failed to copy email');
          });
        setCommandHistory((prev) => [...prev, 'email copied to clipboard']);
      }
    } else if (currentView === 'projects') {
      if (value === 'null-room') {
        window.location.href = '/projects/null-room';
      } else if (value === 'project-beta') {
        window.location.href = '/projects/phaser-arcade';
      } else if (value === 'project-gamma') {
        window.location.href = '/projects/naruto-hand-seals';
        // } else if (value === 'project-epsilon') {
        //   window.location.href = '/projects/project-epsilon';
      } else if (value === 'project-kappa') {
        window.location.href = '/projects/project-kappa';
      }
    }
  };

  const updateContactSelection = (index: number) => {
    setContactSelection(index);
  };

  return {
    commandHistory,
    currentView,
    contactSelection,
    projectSelection,
    handleCommand,
    handleNavigation,
    handleSelection,
    updateContactSelection,
    updateProjectSelection: (index: number) => setProjectSelection(index),
    setCommandHistory,
    setCurrentView,
    setShowInput,
    showInput,
  };
};

/**
 * Custom hook for canvas operations with resize handling
 */
export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return { canvas, ctx };
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    canvasRef,
    setupCanvas,
    handleResize,
  };
};

/**
 * Custom hook for time and date formatting
 */
export const useDateTime = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);

      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const dateNum = now.getDate();
      const year = now.getFullYear();
      setDate(`${month}.${dateNum}.${year}`);
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return { time, date };
};

/**
 * Custom hook for animation intervals with cleanup
 */
export const useAnimation = (
  callback: () => void,
  fps: number = TIMING.ANIMATION_FPS
) => {
  useEffect(() => {
    const interval = setInterval(callback, 1000 / fps);
    return () => clearInterval(interval);
  }, [callback, fps]);
};
