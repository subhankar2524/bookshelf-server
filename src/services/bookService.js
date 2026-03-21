const apiClient = require("../utils/apiClient");

async function searchBooks(query) {
  try {
    const response = await apiClient.get(`/volumes?q=${query}`);

    return response.data.items.map((book) => ({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      description: book.volumeInfo.description || "",
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || null,
      publishedDate: book.volumeInfo.publishedDate || null,
      publisher: book.volumeInfo.publisher || "",
      pageCount: book.volumeInfo.pageCount || 0,
      categories: book.volumeInfo.categories || [],
      averageRating: book.volumeInfo.averageRating || null,
      ratingsCount: book.volumeInfo.ratingsCount || 0,
      previewLink: book.volumeInfo.previewLink || "",
      infoLink: book.volumeInfo.infoLink || ""
    }));
  } catch (error) {
    console.error("Error fetching books:", error.message);
    throw new Error("Failed to fetch books");
  }
}

async function getBookDetails(bookId){
  try{
    const response = await apiClient.get(`/volumes/${bookId}`);
    const book = response.data;
    return {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      description: book.volumeInfo.description || "",
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || null,
      publishedDate: book.volumeInfo.publishedDate || null,
      publisher: book.volumeInfo.publisher || "",
      pageCount: book.volumeInfo.pageCount || 0,
      categories: book.volumeInfo.categories || [],
      averageRating: book.volumeInfo.averageRating || null,
      ratingsCount: book.volumeInfo.ratingsCount || 0,
      previewLink: book.volumeInfo.previewLink || "",
      infoLink: book.volumeInfo.infoLink || ""
    };
  }catch(error){
    console.error("Error fetching book data:", error.message);
    throw new Error("Failed to fetch book data");
  }
}

module.exports = { searchBooks, getBookDetails };