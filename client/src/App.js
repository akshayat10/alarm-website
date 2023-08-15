import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Survey from "scenes/survey";
import Broken150 from "scenes/150broken";
import Air150 from "scenes/air150";
import Other150 from "scenes/other150";
import Broken230 from "scenes/broken230";
import Other230 from "scenes/other230";
import Broken120 from "scenes/broken120";
import Other120 from "scenes/other120";
import Other220 from "scenes/other220";
import Broken220 from "scenes/broken220";
import ScrollablePage from "components/Scrollable";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<ScrollablePage><Dashboard /></ScrollablePage>} />
              <Route path="/broken150" element={<ScrollablePage><Broken150 /></ScrollablePage>} />
              <Route path="/air150" element={<ScrollablePage><Air150 /></ScrollablePage>} />
              <Route path="/other150" element={<Other150 />} />
              <Route path="/broken230" element={<ScrollablePage><Broken230 /></ScrollablePage>} />
              <Route path="/other230" element={<Other230 />} />
              <Route path="/broken120" element={<ScrollablePage><Broken120 /></ScrollablePage>} />
              <Route path="/other120" element={<Other120 />} />
              <Route path="/broken220" element={<ScrollablePage><Broken220 /></ScrollablePage>} />
              <Route path="/other220" element={<Other220 />} />
            </Route>
            <Route path="/survey" element={<Survey/>} />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
