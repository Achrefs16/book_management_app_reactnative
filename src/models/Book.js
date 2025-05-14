export default class Book {
  constructor(data) {
    this.id = data._id || data.id || '';
    this.title = data.title || '';
    this.author = data.author || '';
    this.description = data.description || '';
    this.genre = data.genre || '';
    this.publishedYear = data.publishedYear || 0;
    this.isbn = data.isbn || '';
    this.pages = data.pages || 0;
    this.imageUrl = data.imageUrl || '';
    this.createdBy = data.createdBy || '';
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
  }
} 