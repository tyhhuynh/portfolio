'use client';

import MatrixBg from './components/matrix-bg';
import CLIBox from './components/cli-box';
import Options from './components/options';
import Typewriter from 'typewriter-effect';

import { useEffect } from 'react';
import { useTypewriter, useCLIInput, useCLICommands } from '@/lib/hooks';
import {
  createTypewriterConfig,
  handleContact,
  handleProjects,
  getOptions,
} from '@/lib/utils';
import { CLI_STYLES } from '@/lib/styles';
import { TIMING, LIMITS } from '@/lib/constants';
import { Toaster } from 'sonner';

export default function Home() {
  // const [showInput, setShowInput] = useState(false);
  const {
    showTypewriter,
    typewriterRef,
    removeTypewriterCursor,
    resetTypeWriter,
  } = useTypewriter();
  const { userInput, caretOffset, ghostRef, handleInputChange, clearInput } =
    useCLIInput(LIMITS.CLI_LINE_LENGTH);
  const {
    commandHistory,
    handleCommand,
    currentView,
    contactSelection,
    projectSelection,
    handleNavigation,
    handleSelection,
    updateContactSelection,
    updateProjectSelection,
    setShowInput,
    showInput,
  } = useCLICommands(clearInput);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (userInput.trim() === 'clear') {
        resetTypeWriter();
        handleCommand(userInput);
        clearInput();
      } else {
        handleCommand(userInput);
        clearInput();
      }
    }
  };

  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (currentView === 'contact' || currentView === 'projects') {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          handleNavigation('up');
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          handleNavigation('down');
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const options = getOptions(currentView as 'contact' | 'projects');
          const selectedIndex =
            currentView === 'contact' ? contactSelection : projectSelection;
          const selected = options[selectedIndex];
          const value = selected?.value ?? '';
          if (value) handleSelection(value);
        }
      }
    };

    if (currentView === 'contact' || currentView === 'projects') {
      document.addEventListener('keydown', handleGlobalKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, [
    currentView,
    handleNavigation,
    handleSelection,
    contactSelection,
    projectSelection,
  ]);

  return (
    <div className={CLI_STYLES.CONTAINER}>
      <Toaster position="top-center" />
      <MatrixBg />
      <CLIBox
        lines={
          currentView === 'contact' || currentView === 'projects'
            ? []
            : commandHistory
        }
      >
        <div
          className="whitespace-pre-wrap text-[#00ff00] font-mono"
          ref={typewriterRef}
        >

          {commandHistory.length === 0 && showTypewriter && (
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('> ')
                  .pauseFor(TIMING.TYPEWRITER_DELAY)
                  .typeString('hello world!')
                  .pauseFor(TIMING.TYPEWRITER_PAUSE)
                  .typeString('\n> im tyler')
                  .pauseFor(TIMING.TYPEWRITER_PAUSE)
                  .typeString(
                    "\n> welcome to my terminal. execute command 'help' to get started!"
                  )
                  .pauseFor(TIMING.TYPEWRITER_DELAY)
                  .callFunction(() => {
                    setShowInput(true);
                    removeTypewriterCursor();
                  })
                  .start();
              }}
              options={createTypewriterConfig()}
            />
          )}

          {currentView !== 'contact' &&
            currentView !== 'projects' &&
            showInput && (
              <div className="mt-0.5 flex items-center font-mono text-[#00ff00] w-full text-base">
                <span className="mr-2.5 shrink-0">&gt;</span>
                <div className="relative w-full" key={`input-${currentView}`}>
                  <span
                    ref={ghostRef}
                    className="invisible absolute top-0.5 left-0 whitespace-pre leading-none"
                    aria-hidden="true"
                  >
                    {userInput || '\u200B'}
                  </span>
                  <span
                    className="caret-underscore absolute top-0.5 left-0 leading-none"
                    style={{
                      transform: `translateX(${caretOffset}px)`,
                    }}
                  >
                    _
                  </span>
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if ((e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                        return;
                      }
                      handleKeyPress(e);
                    }}
                    className="w-full bg-transparent outline-none caret-transparent"
                    autoFocus
                    aria-label="CLI input"
                  />
                </div>
              </div>
            )}

          {currentView === 'contact' && (
            <Options
              options={handleContact()}
              selectedIndex={contactSelection}
              onSelect={(value) => handleSelection(value)}
              onHover={(index) => updateContactSelection(index)}
            />
          )}

          {currentView === 'projects' && (
            <Options
              options={handleProjects()}
              selectedIndex={projectSelection}
              onSelect={(value) => handleSelection(value)}
              onHover={(index) => updateProjectSelection(index)}
            />
          )}

        </div>
      </CLIBox>
    </div>
  );
}
