import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomNavbar from './components/CustomNavbar'
import BookListPage from './pages/BookListPage'
import NewBookFormPage from './pages/NewBookFormPage'

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path='/' element={<BookListPage />} />
        <Route path='/add-book' element={<NewBookFormPage />} />
      </Routes>
    </Router>
  )
}

export default App
