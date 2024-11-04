import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fontsource/poppins";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import { getToken } from "./auth/oauth.ts";
import { Suspense, lazy, useEffect } from "react";
import data from "./data/data.json"

const loadComponent = (location:any) => lazy(() => import(`${location}`));
const routesData = data.routes;
const preloadComponents = () => {
  routesData.forEach(route => {
    import(`${route.location}`);
  });
};

function App() {
  getToken();

  useEffect(() => {
    preloadComponents();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTopButton />
      <Suspense fallback={<div style={{ opacity: 0 }}>Loading...</div>}>
        <Routes>
          {routesData.map((route, index) => {
            const Component = loadComponent(route.location);
            return <Route key={index} path={route.path} element={<Component />} />;
          })}
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
