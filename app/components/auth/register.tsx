import { Form } from "@remix-run/react"
import { Transition } from "@remix-run/react/transition"
import React from "react"
import { AuthActionData } from "~/routes/authenticate/login"
import { TextInput } from "../inputs/TextInput"
import { AuthWrap, FieldSet, SubmitButton } from "./login"

interface Props {
  a?: AuthActionData,
  searchParams: URLSearchParams,
  setSearchParams: (data: string) => void,
  t: Transition
}

export const RegisterComponent: React.FC<Props> = ({ a, searchParams, setSearchParams, t }) => {

  React.useEffect(() => {
    if (a?.fields?.redirectTo) {
      setSearchParams(a?.fields?.redirectTo);
    }
  }, [a?.fields?.redirectTo]);

  return <AuthWrap>
  <Form method='post' action='/authenticate/register'>
    <FieldSet disabled={t.state === 'submitting'}>
      <input hidden={true} name='redirectTo' defaultValue={searchParams.get('redirectTo') ?? undefined} />
      <TextInput title={'Username'} name='username' defaultValue={a?.fields?.username ?? ''} />
      <TextInput title={'First name'} name='firstName' defaultValue={a?.fields?.firstName ?? ''} />
      <TextInput title={'Last name'} name='lastName' defaultValue={a?.fields?.lastName ?? ''} />
      <TextInput title={'Email address'} name='email' defaultValue={a?.fields?.email ?? ''} />
      <TextInput title={'Phone number'} name='phone' defaultValue={a?.fields?.phone ?? ''} />
      <TextInput title={'Password'} password={true} name='password' defaultValue={a?.fields?.password ?? ''} />
      <SubmitButton type='submit'>Submit</SubmitButton>
      { a && a.formError && <p>
        {a.formError}
      </p> }
    </FieldSet>
  </Form>
</AuthWrap>
}