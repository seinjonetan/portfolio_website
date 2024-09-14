import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { CssVarsProvider } from "@mui/joy";
import { ThemeProvider } from "./ThemeProvider"; // Import the ThemeProvider
import "@mantine/core/styles.css";
import HomePage from "./pages/HomePage";
// import InvoicePage from "./pages/InvoicePage";
// import ScraperPage from "./pages/ScraperPage";
// import NewsTempPage from "./pages/NewsTempPage";
// import ResearchPage from "./pages/ResearchPage";

function App() {
  return (
    <ThemeProvider>
      {" "}
      {/* Wrap the application with ThemeProvider */}
      <MantineProvider>
        <CssVarsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/scrape" element={<ScraperPage />} />
              <Route path="/news" element={<NewsTempPage />} />
              <Route path="/research" element={<ResearchPage />} /> */}
            </Routes>
          </Router>
        </CssVarsProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}

export default App;
