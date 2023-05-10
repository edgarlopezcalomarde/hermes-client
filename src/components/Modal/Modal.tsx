import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  visible: boolean;
}

function Modal({ title, children, onClose, visible }: ModalProps) {
  useEffect(() => {
    const handleKeyUp = (event: any) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div
      className={
        visible
          ? 'fixed z-50 top-0 left-0 flex justify-center items-center w-full h-full p-4 overflow-y-auto'
          : 'hidden'
      }
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-inpt-primary rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
