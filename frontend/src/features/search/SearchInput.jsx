import { Input } from '@material-tailwind/react'
import { Formik } from 'formik'
import React from 'react'
import * as  Yup from 'yup'

export const valSchema = Yup.object({
  search: Yup.string().min(3).max(15).required()
})

export default function SearchInput() {
  return (
    <div>
      <Formik
      initialValues={{
        search: ''
      }}

      onSubmit={(val) => {
        console.log(val);
      }}

      validationSchema={valSchema}
      >
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <form action="">
            <div>
              <Input 
              onChange={handleChange}
              name='search'
              value={values.search}
              label='Type in search'
              icon={<i className='fas fa-fa-search'/>}/>
              {errors.search && touched.search && <h1 className='text-pink-500 pl-1'>{errors.search}</h1>}
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
