import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Book } from './BookList.types'
import { Button, Table } from 'react-bootstrap'
import * as Styled from './BookList.style'
import { FaEdit, FaTrash } from 'react-icons/fa'
import EditingModal from '../EditingModal'
import { API_ENDPOINT } from '../../config'

const BookList = () => {
  const tableColumns = [
    'Book title',
    'Author',
    'Review',
    'Date of completion',
    'Actions',
  ]

  const [bookList, setBookList] = useState<Book[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editedBook, setEditedBook] = useState<Book>({
    id: '',
    title: '',
    author: '',
    comment: '',
    completion_date: '',
  })

  const getBooksFromAPI = () => {
    axios.get(API_ENDPOINT).then((res) => setBookList(res.data))
  }

  useEffect(() => {
    getBooksFromAPI()
  }, [])

  const handleEdit = (book: Book) => {
    setShowModal(true)
    setEditedBook(book)
  }

  const handleClose = () => {
    setShowModal(false)
    getBooksFromAPI()
  }

  const handleDelete = (book: Book) => {
    axios.delete(`${API_ENDPOINT}${book.id}/`).then(() => getBooksFromAPI())
  }

  return (
    <>
      <Styled.TableContainer>
        <Table striped bordered variant='light'>
          <thead>
            <tr>
              {tableColumns.map((column) => (
                <th className='p-3'>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <tr key={book.id}>
                <td className='p-3'>{book.title}</td>
                <td className='p-3'>{book.author}</td>
                <td className='p-3'>{book.comment}</td>
                <td className='p-3'>{book.completion_date.toString()}</td>
                <td className='d-flex gap-2'>
                  <Button
                    variant='secondary'
                    title='Edit'
                    onClick={() => handleEdit(book)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant='danger'
                    title='Delete'
                    onClick={() => handleDelete(book)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Styled.TableContainer>
      {showModal && (
        <EditingModal
          {...editedBook}
          showModal={showModal}
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default BookList
