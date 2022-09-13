import axios from 'axios'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_ENDPOINT } from '../../config'
import * as Styled from './NewBookForm.style'

const NewBookForm = () => {
  const [inputValues, setInputValues] = useState({
    title: '',
    author: '',
    comment: '',
    completion_date: '',
  })

  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValues({ ...inputValues, [name]: value })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    axios
      .post(API_ENDPOINT, inputValues)
      .then(() => {
        navigate('/')
        toast.success('The book was successfully added!')
      })
      .catch(() => toast.error('Something went wrong'))
  }

  return (
    <Styled.FormWrapper>
      <Form
        action='submit'
        onSubmit={handleSubmit}
        className='bg-white p-5 rounded'
      >
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Book title</Form.Label>
          <Form.Control
            name='title'
            required
            onChange={handleChange}
            maxLength={100}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='author'>
          <Form.Label>Book author</Form.Label>
          <Form.Control
            name='author'
            required
            onChange={handleChange}
            maxLength={50}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='comment'>
          <Form.Label>Review</Form.Label>
          <Form.Control
            name='comment'
            as='textarea'
            onChange={handleChange}
            maxLength={1000}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='completion_date'>
          <Form.Label>Date of completion</Form.Label>
          <Form.Control
            type='date'
            name='completion_date'
            onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit' variant='dark' className='d-block mx-auto mt-5'>
          Add book
        </Button>
      </Form>
    </Styled.FormWrapper>
  )
}

export default NewBookForm
