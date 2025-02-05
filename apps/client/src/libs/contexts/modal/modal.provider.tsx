import { createContext, useState, type ReactNode } from "react";
import { ModalLayout } from "~/libs/layouts/layouts.js";

type ModalContextType = {
  onOpenModal: (content: ReactNode) => void;
  onCloseModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type Props = React.PropsWithChildren;

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (content: ReactNode): void => {
    setModalContent(content);
    setIsOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsOpen(false);
    setModalContent(null);
  };

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
