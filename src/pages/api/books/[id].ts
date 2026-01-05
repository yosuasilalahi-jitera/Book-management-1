// NOTE: This is a demonstration implementation using in-memory storage.
// For production-ready code, integrate with MongoDB (or another persistent database) and add auth/middleware as necessary.

import { NextApiRequest, NextApiResponse } from 'next'

// In-memory books array for demonstration/testing purpose
let books: { id: string; title: string; author: string }[] = [
  { id: '1', title: 'Book Title 1', author: 'Author 1' },
  { id: '2', title: 'Book Title 2', author: 'Author 2' },
  // Add additional demo book entries here
]

// API Route Handler for book operations by id
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  if (method === 'PATCH') {
    // PATCH /books/:id - Update book fields
    const { title, author } = req.body
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid book id' })
    }

    const bookIndex = books.findIndex((book) => book.id === id)
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' })
    }

    // Check at least one field is being updated
    if (typeof title !== 'string' && typeof author !== 'string') {
      return res.status(400).json({ error: 'At least one of title or author must be provided for update' })
    }

    // Update fields if provided
    if (typeof title === 'string') {
      books[bookIndex].title = title
    }
    if (typeof author === 'string') {
      books[bookIndex].author = author
    }

    return res.status(200).json(books[bookIndex])
  }

  if (method === 'DELETE') {
    // DELETE /books/:id
    const index = books.findIndex(book => book.id === id)
    if (index === -1) {
      // Book not found
      return res.status(404).json({ error: 'Book not found' })
    }
    // Remove the book from the in-memory array
    books.splice(index, 1)
    // 204 No Content on successful deletion
    return res.status(204).end()
  }

  // Only PATCH and DELETE are supported
  res.setHeader('Allow', ['PATCH', 'DELETE'])
  return res.status(405).json({ error: 'Method Not Allowed' })
}

// For production use, replace in-memory books[] with a persistent database like MongoDB,
// and add authentication, authorization, validation, and logging as required.