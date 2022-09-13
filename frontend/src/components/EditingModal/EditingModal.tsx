import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import axios from 'axios'
import { Button, Form, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { API_ENDPOINT } from '../../config'
import { EditingModalProps } from './EditingModal.types'

const EditingModal: FC<EditingModalProps> = ({
  id,
  title,
  author,
  comment,
  completion_date,
  showModal,
  handleClose,
}) => {
  const [show, setShow] = useState(showModal)
  const [inputValues, setInputValues] = useState({
    id,
    title,
    author,
    comment,
    completion_date,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValues({ ...inputValues, [name]: value })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (inputValues.id) {
      axios
        .put(`${API_ENDPOINT}${inputValues.id}/`, inputValues)
        .then(() => {
          handleClose()
          toast.success('The book was successfully updated!')
        })
        .catch(() => toast.error('Something went wrong'))
    }

    setShow(false)
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form action='submit' onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Book title</Form.Label>
            <Form.Control
              name='title'
              required
              onChange={handleChange}
              defaultValue={title}
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='author'>
            <Form.Label>Book author</Form.Label>
            <Form.Control
              name='author'
              required
              onChange={handleChange}
              defaultValue={author}
              maxLength={50}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='comment'>
            <Form.Label>Review</Form.Label>
            <Form.Control
              name='comment'
              as='textarea'
              onChange={handleChange}
              defaultValue={comment}
              maxLength={1000}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='completion_date'>
            <Form.Label>Date of completion</Form.Label>
            <Form.Control
              name='completion_date'
              type='date'
              onChange={handleChange}
              defaultValue={completion_date}
            />
          </Form.Group>
          <Button type='submit' variant='dark' className='d-block mx-auto mt-5'>
            Edit book
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditingModal
