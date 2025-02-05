import { RootLayout } from "~/libs/layouts/layouts.js";
import { ModalProvider } from "~/libs/contexts/modal/modal.js";
import { RouterProvider } from "~/libs/components/components.js";

import { ArtworksPage } from "~/pages/artworks/artworks.js";

const App: React.FC = () => {
  return (
    <RouterProvider
      routes={[
        {
          children: [
            {
              element: (
                <ModalProvider>
                  <RootLayout>
                    <ArtworksPage />
                  </RootLayout>
                </ModalProvider>
              ),
              path: "/",
              children: [{ path: "/new" }, { path: "/detaild" }],
            },
          ],
        },
      ]}
    />
  );
};

export default App;
