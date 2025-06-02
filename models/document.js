const db = require('../util/database');

module.exports = class Document {
  constructor({idDocument, name, description, url, idDocumentCategory, createdAt=null, updatedAt=null}) {
    this.idDocument = idDocument;
    this.name = name;
    this.description = description;
    this.url = url;
    this.idDocumentCategory = idDocumentCategory;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fetchAll() {
    const allDocuments = db.execute('SELECT * FROM document');
    return allDocuments;
  }

  async post() {
    const [result] = await db.execute(
      `INSERT INTO document 
        (id_document, name, description, url, id_document_category) 
        VALUES (?, ?, ?, ?, ?)`, 
        [this.idDocument, this.name, this.description, this.url, this.idDocumentCategory]);
    return result;
  }

  async update() {
    const [result] = await db.execute(
      `UPDATE document
        SET name = ?, description = ?, url = ?, id_document_category = ?
        WHERE id_document = ?`,
        [this.name, this.description, this.url, this.idDocumentCategory, this.idDocument]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Document updated successfully' };
  }

  static delete(id) {
    const [result] = db.execute('DELETE FROM document WHERE id_document = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Document deleted successfully' };
  }
}
