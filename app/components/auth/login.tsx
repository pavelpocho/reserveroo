import { Form, Link } from "@remix-run/react";
import { Transition } from "@remix-run/react/transition";
import React from "react";
import AnglesRightIcon from "~/assets/icons/AnglesRight";
import { styles } from "~/constants/styles";
import { AuthActionData } from "~/routes/authenticate/login";
import { TextInput } from "../inputs/TextInput";
import { AuthWrap, FieldSet } from "../other/auth-components";
import { MainButtonBtn } from "../place/place-summary";

interface Props {
  a?: AuthActionData,
  searchParams: URLSearchParams,
  setSearchParams: (data: string) => void,
  t: Transition
}

export const LoginComponent: React.FC<Props> = ({ a, searchParams, setSearchParams, t }) => {
  
  React.useEffect(() => {
    if (a?.fields?.redirectTo) {
      setSearchParams(a?.fields?.redirectTo);
    }
  }, [a?.fields?.redirectTo]);

  return (<AuthWrap>
    <Form method='post' action='/authenticate/login'>
      <FieldSet disabled={t.state === 'submitting'}>
        <input hidden={true} name='redirectTo' defaultValue={searchParams.get('redirectTo') ?? undefined} />
        <TextInput name='username' defaultValue={a?.fields?.username ?? ''} title={'Username'} />
        <TextInput password={true} name='password' defaultValue={a?.fields?.password ?? ''} title={'Password'} />
        <Link style={{ color: styles.colors.black }} to='/pwd/forgot'>Forgot password</Link>
        <MainButtonBtn>Sign In<AnglesRightIcon height={'1.5rem'} /></MainButtonBtn>
      </FieldSet>
    </Form>
  </AuthWrap>)
}