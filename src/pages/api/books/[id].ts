// NOTE: This is a demonstration implementation using in-memory storage.
// For production-ready code, integrate with MongoDB (or another persistent database) and add auth/middleware as necessary.

import { NextApiRequest, NextApiResponse } from 'next'

// In-memory books array for demonstration/testing purpose
let books: { id: string; title: string; author: string }[] = [
  { id: '1', title: 'Book Title 1', author: 'Author 1' },
  { id: '2', title: 'Book Title 2', author: 'Author 2' },
  // Add additional demo book entries here
]

// API Route Handler for deleting a book by id
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  if (method !== 'DELETE') {
    // Only DELETE is supported
    res.setHeader('Allow', ['DELETE'])
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // Find index of the book to be deleted
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

// For production use, replace in-memory books[] with a persistent database like MongoDB,
// and add authentication, authorization, validation, and logging as required.