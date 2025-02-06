import { createContext, useCallback, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { ModalLayout } from "~/libs/layouts/layouts.js";

type ModalContextType = {
  onOpenModal: (content: ReactNode, rootPath?: string) => void;
  onCloseModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type Props = React.PropsWithChildren;

const ModalProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rootPath, setRootPath] = useState<string | null>(null);

  const handleOpenModal = (content: ReactNode, path?: string): void => {
    setModalContent(content);
    setIsOpen(true);
    setRootPath(path ?? null);
  };

  const handleCloseModal = useCallback((): void => {
    setIsOpen(false);
    setModalContent(null);

    if (rootPath) {
      setRootPath(null);
      void navigate(rootPath);
    }
  }, [navigate, rootPath]);

  return (
    <ModalContext.Provider
      value={{
        onCloseModal: handleCloseModal,
        onOpenModal: handleOpenModal,
      }}
    >
      {children}

      {isOpen && (
        <ModalLayout onClose={handleCloseModal}>{modalContent}</ModalLayout>
      )}
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext, type ModalContextType };
