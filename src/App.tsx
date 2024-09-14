import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { CssVarsProvider } from "@mui/joy";
import { ThemeProvider } from "./ThemeProvider"; // Import the ThemeProvider
import "@mantine/core/styles.css";
import HomePage from "./pages/HomePage";
import ResearchPage from "./pages/ResearchPage";
import ScraperPage from "./pages/ScraperPage";
// import InvoicePage from "./pages/InvoicePage";
// import NewsTempPage from "./pages/NewsTempPage";

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
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/scrape" element={<ScraperPage />} />
              {/* <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/news" element={<NewsTempPage />} /> */}
            </Routes>
          </Router>
        </CssVarsProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}

export default App;
