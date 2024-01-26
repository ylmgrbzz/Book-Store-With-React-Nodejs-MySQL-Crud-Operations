import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";

// Ana uygulama component'i
function App() {
  return (
    // Uygulama ana bileşeni bir div içinde sarmalanıyor ve "app" sınıfı ile stil uygulanıyor.
    <div className="app">
      {/* BrowserRouter ile tarayıcı tarafından yönetilen navigasyon yapısını oluşturuyoruz. */}
      <BrowserRouter>
        {/* Routes ile sayfa rotalarını belirliyoruz. */}
        <Routes>
          {/* Ana sayfa için bir Route tanımlanıyor. Path="/" URL'siyle eşleşen durumda, Books component'i render edilecek. */}
          <Route path="/" element={<Books />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// App component'i dışa aktarılıyor.
export default App;
