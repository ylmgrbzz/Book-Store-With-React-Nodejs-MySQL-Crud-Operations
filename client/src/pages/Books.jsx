import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  // useState hook ile "books" ve "cart" adında state'ler oluşturuluyor.
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  // useEffect hook ile sayfa ilk yüklendiğinde çalışacak olan fonksiyon oluşturuluyor.
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        // Axios kütüphanesi kullanılarak API'den kitap verileri çekiliyor.
        const res = await axios.get("http://localhost:8800/books");
        // Çekilen veri setBooks fonksiyonu ile "books" state'ine atanıyor.
        setBooks(res.data);
      } catch (err) {
        // Hata durumunda hata konsola yazdırılıyor.
        console.log(err);
      }
    };
    // fetchAllBooks fonksiyonu useEffect içinde çağrılıyor.
    fetchAllBooks();
  }, []);

  // Kitap silme işlemi için kullanılan fonksiyon.
  const handleDelete = async (id) => {
    try {
      // Axios kütüphanesi kullanılarak belirtilen ID'ye sahip kitap siliniyor.
      await axios.delete(`http://localhost:8800/books/${id}`);
      // Kitap silindiğinde sayfa yeniden yükleniyor.
      window.location.reload();
    } catch (err) {
      // Hata durumunda hata konsola yazdırılıyor.
      console.log(err);
    }
  };

  // Sepete kitap ekleme işlemi için kullanılan fonksiyon.
  const handleAddToCart = (book) => {
    // setCart fonksiyonu ile "cart" state'ine yeni bir kitap ekleniyor.
    setCart([...cart, book]);
  };

  // Sepetten kitap çıkarma işlemi için kullanılan fonksiyon.
  const handleRemoveFromCart = (index) => {
    // Sepetten çıkarma işlemi için ilgili indeksteki kitap, kopyalanarak güncellenmiş "cart" state'ine atanıyor.
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    // Güncellenmiş "cart" state'i setCart fonksiyonu ile atanıyor.
    setCart(updatedCart);
  };

  // Sayfa içeriği JSX olarak döndürülüyor.
  return (
    <div>
      <h1>Berkay Pazar</h1>
      <div className="books">
        {/* "books" state'indeki her kitap için aşağıdaki içerik oluşturuluyor. */}
        {books.map((book, index) => (
          <div key={book.id} className="book">
            {/* Kitap resmi için generateImageUrl fonksiyonu kullanılıyor. */}
            <img src={generateImageUrl(index)} alt="" />
            {/* Kitap başlığı */}
            <h2>{book.title}</h2>
            {/* Kitap açıklaması */}
            <p>{book.desc}</p>
            {/* Kitap fiyatı */}
            <span>${book.price}</span>
            {/* Kitap silme butonu */}
            <button className="delete" onClick={() => handleDelete(book.id)}>
              delete
            </button>
            {/* Sepete ekleme butonu */}
            <button className="addToCart" onClick={() => handleAddToCart(book)}>
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>

      {/* Sepet bölümü */}
      <div className="cart">
        <h2>Sepet</h2>
        <ul>
          {/* "cart" state'indeki her kitap için aşağıdaki içerik oluşturuluyor. */}
          {cart.map((item, index) => (
            <li key={index}>
              {/* Kitap başlığı */}
              {item.title} {/* Sepetten çıkarma butonu */}
              <button onClick={() => handleRemoveFromCart(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Kitap resmi URL'lerini oluşturan fonksiyon.
const generateImageUrl = (index) => {
  const imageUrls = [
    "https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=5.0.376",
    "https://cdn.britannica.com/83/78183-004-345353F4/Stack-books.jpg",
    "https://m.media-amazon.com/images/I/7173a8decnL._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/519fUBXN5iL._SL500_.jpg",
    "https://m.media-amazon.com/images/I/61zW7dht8aL._AC_UF1000,1000_QL80_.jpg",
  ];

  // Modulo kullanılarak index'in dizi sınırları içinde kalması sağlanıyor.
  return imageUrls[index % imageUrls.length];
};

// Books component'i dışa aktarılıyor.
export default Books;
