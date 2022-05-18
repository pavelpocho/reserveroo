import { Form, Link } from "@remix-run/react";
import { Transition } from "@remix-run/react/transition";
import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { AuthActionData } from "~/routes/authenticate/login";
import { TextInput } from "../inputs/TextInput";

export const AuthWrap = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 0px auto;
  border-radius: 1rem;
  margin-top: 2rem;
  box-shadow: ${styles.shadows[0]};
  border: 1px solid ${styles.colors.gray[10]};
  box-sizing: border-box;
  padding: 1.5rem;
`;

export const FieldSet = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 0.8rem 0rem;
  border: 1.5px solid ${styles.colors.gray[20]};
  border-radius: 0.4rem;
  background-color: ${styles.colors.white};
  cursor: pointer;
  font-size: 0.9rem;
`;

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
        <Link to='/pwd/forgot'>Forgot password</Link>
        <SubmitButton type='submit'>Sign In</SubmitButton>
      </FieldSet>
    </Form>
  </AuthWrap>)
}