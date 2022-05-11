import { Place, Reservable, Reservation, User } from "@prisma/client"
import { Form, Link, useSubmit } from "@remix-run/react";
import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { ReservationStatus } from "~/types/types"
import { Button } from "../button";
import { IdInput } from "../inputs/ObjectInput";
import { TextInput } from "../inputs/TextInput";

interface AccountSummaryProps {
  user: User | null,
  editing: boolean
}

const Wrap = styled.div`
  display: flex;
  gap: 3rem;
  padding: 2rem;
  align-items: center;
  justify-content: stretch;
  background-color: ${styles.colors.gray[10]};
`;

const Photo = styled.div`
  height: 6rem;
  width: 6rem;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: ${styles.colors.gray[30]};
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
  color: ${styles.colors.action};
`;

const Value = styled.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
  line-height: 2.3rem;
`;

const InfoWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
`;

const StretchForm = styled(Form)`
  flex-grow: 1;
`;

const EditLink = styled(Link)`
  flex-shrink: 0;
  width: 6rem;
  display: flex;
  height: 1rem;
  font-size: 0.8rem;
  background-color: white;
  border: 1px solid ${styles.colors.gray[20]};
`;

const EditButton = styled.button`
  flex-shrink: 0;
  width: 6rem;
`;

export const AccountSummary: React.FC<AccountSummaryProps> = ({ editing, user }) => {

  const form = React.useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  return user && <Wrap>
    <Photo />
    <StretchForm method='post' ref={form}>
      <InfoWrap>
          { editing && <IdInput name={'id'} value={user?.id} /> }
          <div>
            <Title>First Name</Title>
            { editing ? <TextInput name={'firstName'} defaultValue={user?.firstName} /> : <Value>{user?.firstName}</Value> }
          </div>
          <div>
            <Title>Last Name</Title>
            { editing ? <TextInput name={'lastName'} defaultValue={user?.lastName} /> : <Value>{user?.lastName}</Value> }
          </div>
          <div>
            <Title>Username</Title>
            { editing && false ? <TextInput name={'username'} defaultValue={user?.username ?? ''} /> : <Value>{user?.username}</Value> }
          </div>
          <div>
            <Title>Email</Title>
            { editing ? <TextInput name={'email'} defaultValue={user?.email} /> : <Value>{user?.email}</Value> }
          </div>
          <div>
            <Title>Phone</Title>
            { editing ? <TextInput name={'phone'} defaultValue={user?.phone} /> : <Value>{user?.phone}</Value> }
          </div>
          <div>
            <Title>Reserving since</Title>
            <Value>{new Date(user?.createdAt).toDateString()}</Value>
          </div>
      </InfoWrap>
    </StretchForm>
    { !editing ? <EditLink to={'/profile/edit'}>Edit</EditLink> : <EditButton onClick={() => {
      submit(form.current, { replace: true })
    }}>{
      !editing ? 'Edit profile' : 'Save changes'
    }</EditButton>}
  </Wrap>
}