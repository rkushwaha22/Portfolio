import { Children, useState } from 'react'
import './App.css'
import Navbar from './Component/Navbar/Navbar'
import Hero from './Component/Hero-section/Hero'
import Services from './Component/Service/Services'
import Project from './Component/Project/Project'
import Skills from './Component/Skill/Skills'
import Contact from './Component/Contact/Contact'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Admin components (jo aap src/Admin me banayenge)
import AdminLayout from './Admin/AdminLayout'
import SectionAdmin from './Admin/SectionAdmin'
import PageNotFound from './Component/PageNotFound/PageNotFound'

import ProtectedRoute from '../src/Admin/ProtectedRoute';
import LoginPage from "../src/Admin/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Navbar />
    </>,
    children: [
      {
        index: true,
        element: <Hero />
      },
      {
        path: "service",
        element: <Services />
      },
      {
        path: "project",
        element: <Project />
      },
      {
        path: "skills",
        element: <Skills />
      },
      {
        path: "contact",
        element: <Contact />
      },

    ]

  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'hero', element: <SectionAdmin apiUrl="/api/hero" fields={['name', 'subtitle', 'roles', 'experience', 'image']} /> },
      { path: 'services', element: <SectionAdmin apiUrl="/api/services" fields={['title', 'description', 'image']} /> },
      { path: 'skills', element: <SectionAdmin apiUrl="/api/skills" fields={['name', 'items', 'percent', 'icon']} /> },
      { path: 'projects', element: <SectionAdmin apiUrl="/api/projects" fields={['title', 'tag', 'image', 'link',]} /> },
      { path: 'contact', element: <SectionAdmin apiUrl="/api/contact-info" fields={['location', 'phone', 'email', 'description']} /> },
      { path: 'contact-msg', element: <SectionAdmin apiUrl="/api/contact-msg" fields={['name', 'email', 'message']} isReadOnly={true} /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },// Login page ka naya route
  {
    path: '*', element: <PageNotFound />
  }

])

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
