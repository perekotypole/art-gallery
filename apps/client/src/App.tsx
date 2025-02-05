import { RootLayout } from "~/libs/layouts/layouts.js";

import { ArtworksPage } from "~/pages/artworks/artworks.js";

const App: React.FC = () => {
  return (
    <RootLayout>
      <ArtworksPage />
    </RootLayout>
  );
};

export default App;
