import { RootLayout } from "~/libs/layouts/layouts.js";
import { ArtworksPage } from "~/pages/artworks/artworks.js";

import { ModalProvider } from "./libs/contexts/modal/modal.js";

const App: React.FC = () => {
  return (
    <ModalProvider>
      <RootLayout>
        <ArtworksPage />
      </RootLayout>
    </ModalProvider>
  );
};

export default App;
