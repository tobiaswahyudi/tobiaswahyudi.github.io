import React from 'react'
import * as yup from 'yup'
import { Formik, FormikProps, ErrorMessage, FormikHelpers } from 'formik'
import axios from 'axios'

import '../index.scss'

export interface FormFields {
  name: string
  email: string
  message: string
}

export const ContactForm: React.FC = () => {

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please provide your name."),
    email: yup.string().email("Please provide a valid email.").required("Please provide your email."),
    message: yup.string().required("Please leave a message.")
  })

  const handleSubmit = async (values: FormFields, actions: FormikHelpers<FormFields>) => {
    actions.setSubmitting(true)
    await axios.post("https://formspree.io/xzbajaba", values)
    await actions.resetForm()
    actions.setSubmitting(false)
  }

  return (
    <>
      <div className="contact">
        <h2 id="contact">Contact Me</h2>
        <div className="contact-form">
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {(formik: FormikProps<FormFields>) => {

              return (
                <form onSubmit={formik.handleSubmit}>
                  <div id="top">
                    <div className="field-container">
                      <input
                        id="name"
                        className={`overpass-light ${formik.errors.name ? 'has-errors' : ''} ${formik.isSubmitting ? 'disabled' : ''}`}
                        placeholder="Name and/or company"
                        name="name"
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        value={formik.values.name}
                      />
                      <ErrorMessage name="name">{msg => <div className="form-error overpass-light">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="field-container">
                      <input
                        className={`overpass-light ${formik.errors.email ? 'has-errors' : ''} ${formik.isSubmitting ? 'disabled' : ''}`}
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        value={formik.values.email}
                      />
                      <ErrorMessage name="email">{msg => <div className="form-error overpass-light">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div id="middle">
                    <textarea
                      className={`overpass-light
                        ${formik.errors.message ? 'has-errors' : ''}
                        ${formik.isSubmitting ? 'disabled' : ''}
                      `}
                      placeholder="Message"
                      name="message"
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      value={formik.values.message}
                    />
                    <ErrorMessage name="message">{msg => <div className="form-error overpass-light">{msg}</div>}</ErrorMessage>
                  </div>
                  <div id="bottom">
                    <input
                      className={`overpass-regular 
                        ${formik.isSubmitting ? 'disabled' : ''}`}
                      id="send"
                      type="submit"
                      value="Send!"
                      disabled={formik.isSubmitting} />
                  </div>
                </form>
              )
            }
            }
          </Formik>
        </div>
      </div >
    </>
  )
}

export default ContactForm;