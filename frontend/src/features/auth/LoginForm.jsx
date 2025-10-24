import { Button, Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'
import { useLoginUserMutation } from './authApi.js'
import { useDispatch } from 'react-redux'
import { setUser } from '../user/userSlice.JS'
import toast from 'react-hot-toast'


const valSchema = Yup.object({
  username: Yup.string().min(5).max(50).required(),
  password: Yup.string().min(8).max(128).required()
})

export default function LoginForm() {

  const nav = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}

        onSubmit={async (val) => {
          try {
            const respose = await loginUser(val).unwrap();
            dispatch(setUser(respose));
            dispatch(api.util.invalidateTags(['Users']));
            toast.success('Logged in')
            nav(-1);
          } catch (err) {
            toast.error(err.data.message)
          }
        }}

        validationSchema={valSchema}
      >
        {({ handleChange, handleSubmit, values, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <Card className="mx-auto w-full max-w-[24rem]">
              <CardBody className="flex flex-col gap-4">
                <Typography variant="h4" color="blue-gray">
                  Sign In
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray">
                  Enter your Username and password to Sign In.
                </Typography>
                <Typography className="-mb-2" variant="h6">
                  Your Username
                </Typography>
                <Input
                  label='Username'
                  placeholder='Username'
                  onChange={handleChange}
                  name='username'
                  values={values.username}
                  size="lg"
                  className="w-full placeholder:opacity-100 !border-t !border-blue-gray-200 focus:!border-primary !text-black"
                  labelProps={{ className: "hidden peer" }}
                  containerProps={{ className: "mt-0" }}
                />
                {touched.username && errors.username && <h1 className='text-pink-500'>{errors.username}</h1>}
                <Typography className="-mb-2" variant="h6">
                  Your Password
                </Typography>
                <Input
                  placeholder='********'
                  onChange={handleChange}
                  name='password'
                  value={values.password}
                  size="lg"
                  className="w-full placeholder:opacity-100 !border-t !border-blue-gray-200 focus:!border-primary !text-black"
                  labelProps={{ className: "hidden peer" }}
                  containerProps={{ className: "mt-0" }}
                  type={passwordShown ? 'text' : "password"}
                  icon={
                    <i onClick={() => setPasswordShown(!passwordShown)}
                      className={`fas fa-${passwordShown ? "unlock" : "lock"} fa-md text-black`} />
                  }
                />
                {touched.password && errors.password && <h1 className='text-pink-500'>{errors.password}</h1>}
                {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
              </CardBody>
              <CardFooter className="pt-0">
                <Button loading={isLoading} type='submit' variant="gradient" fullWidth>
                  Sign In
                </Button>
                <Typography variant="small" className="mt-4 flex justify-center">
                  Don&apos;t have an account?
                  <Typography
                    as="a"
                    href=""
                    variant="small"
                    color="blue-gray"
                    onClick={() => nav(`/register`)}
                    className="ml-1 font-bold">
                    Sign up
                  </Typography>
                </Typography>
              </CardFooter>
            </Card>
          </form>
        )}
      </Formik>
    </div>
  )
}
