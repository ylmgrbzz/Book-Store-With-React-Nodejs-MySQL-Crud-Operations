// Express, MySQL, ve CORS kütüphaneleri import ediliyor.
import express from "express";
import mysql from "mysql";
import cors from "cors";

// Express uygulaması oluşturuluyor.
const app = express();

// CORS middleware kullanılıyor.
app.use(cors());

// JSON formatındaki verileri işleyebilmek için express.json() middleware kullanılıyor.
app.use(express.json());

// MySQL veritabanı bağlantısı oluşturuluyor.
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ylmgrbz123456",
  database: "test",
});

// Temel bir "hello" cevabı dönen endpoint.
app.get("/", (req, res) => {
  res.json("hello");
});

// "books" tablosundaki tüm kitapları getiren endpoint.
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Yeni bir kitap ekleyen endpoint.
app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Belirli bir kitabı silebilen endpoint.
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Belirli bir kitabı güncelleyen endpoint.
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Uygulama belirtilen port (8800) üzerinde dinlemeye başlıyor.
app.listen(8800, () => {
  console.log("Connected to backend.");
});
