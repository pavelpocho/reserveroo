import { Place, Reservable, Reservation, User } from "@prisma/client"
import { Form, Link, useSubmit } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { ReservationStatus } from "~/types/types"
import { isValidEmail, isValidPhone } from "~/utils/forms";
import { Button } from "../button";
import { ConfirmationDialog } from "../confirmation-dialog";
import { IdInput } from "../inputs/ObjectInput";
import { TextInput } from "../inputs/TextInput";
import { SecondaryButton, SecondaryButtonBtn } from "../place/place-summary";

interface AccountSummaryProps {
  user: User | null,
  editing: boolean
}

const Wrap = styled.div`
  background-color: ${styles.colors.gray[5]};
  width: 100%;
`;

const InnerWrap = styled.div`
  display: flex;
  gap: 3rem;
  padding: 2rem 1rem;
  max-width: 968px;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  justify-content: stretch;
  @media (min-width: 800px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Photo = styled.div`
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2rem;
  width: 9rem;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: ${styles.colors.gray[20]};
`;

const SectionTitle = styled.p`
  font-weight: bold;
  font-size: 0.8125rem;
  margin: 0;
  color: ${styles.colors.action};
`;

const Value = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.2rem;
  margin-bottom: 0;
  line-height: 2.3rem;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  column-gap: 1rem;
  row-gap: 1.2rem;
  & > div {
    width: 100%;
    max-width: 100%;
    flex-shrink: 1;
    position: relative;
    overflow: hidden;
    @media (min-width: 500px) {
      width: 45%; 
    }
  }
  & > div > p {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StretchForm = styled(Form)`
  flex-grow: 1;
  max-width: 100%;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const EditButton = styled(SecondaryButton)`
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: ${styles.colors.white};
  width: auto !important;
`;

const DeleteButtonBtn = styled(SecondaryButtonBtn)`
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: ${styles.colors.busy};
  color: white;
  width: auto !important;
`;

const EditButtonBtn = styled(SecondaryButtonBtn)`
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: ${styles.colors.white};
  width: auto !important;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ErrorLabel = styled.p`
  position: absolute;
  margin: 0;
  top: 0;
  right: 0;
  border-radius: 0.25rem;
  font-size: 0.6rem;
  background-color: ${styles.colors.busy};
  font-weight: 500;
  color: ${styles.colors.white};
  padding: 0.1rem 0.5rem;
`;

export const AccountSummary: React.FC<AccountSummaryProps> = ({ editing, user }) => {

  const form = React.useRef<HTMLFormElement>(null);
  const deleteForm = React.useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  const [ validEmail, setValidEmail ] = useState(true);
  const [ validPhone, setValidPhone ] = useState(true);
  const [ shouldDelete, setShouldDelete ] = useState(false);
  const [ confirmationDialog, setConfirmationDialog ] = useState(false);

  useEffect(() => {
    if (shouldDelete && deleteForm.current) {
      submit(deleteForm.current, { replace: true });
    }
  }, [shouldDelete]);

  return user && <Wrap><InnerWrap>
    <ConfirmationDialog hidden={!confirmationDialog} onConfirm={() => {
      setShouldDelete(true);
      setConfirmationDialog(false);
    }} title={"Are you *absolutely* sure?"} text={"This will permanently delete your account. You will immediatelly be signed out forever."} confirmText={"Yes, DELETE my account"} cancelText={"No, go back"} close={() => {
      setConfirmationDialog(false);
    }} />
    <Photo>{user.username[0].toUpperCase()}</Photo>
    { shouldDelete && <Form method={'post'} ref={deleteForm} action='/profile/delete'>
      <IdInput name='id' value={user?.id} />
    </Form> }
    <StretchForm method='post' ref={form}>
      <HeaderWrap>
        <Title>Personal Information</Title>
        { !editing ? <EditButton inSearch={false} to={'/profile/edit'}>Edit</EditButton> : <Flex>
          <DeleteButtonBtn onClick={(e) => {
            e.preventDefault();
            setConfirmationDialog(true);
          }}>
            Delete Account
          </DeleteButtonBtn>
          <EditButtonBtn disabled={!validEmail || !validPhone} onClick={(e) => {
            e.preventDefault();
            if (validEmail && validPhone) {
              submit(form.current, { replace: true });
            }
          }}>{
            !editing ? 'Edit' : 'Save'
          }</EditButtonBtn>
          <EditButton inSearch={false} to={'/profile'}>Cancel</EditButton>
        </Flex>}
      </HeaderWrap>
      <InfoWrap>
          { editing && <IdInput name={'id'} value={user?.id} /> }
          <div>
            <SectionTitle>First Name</SectionTitle>
            { editing ? <TextInput name={'firstName'} defaultValue={user?.firstName} /> : <Value>{user?.firstName}</Value> }
          </div>
          <div>
            <SectionTitle>Last Name</SectionTitle>
            { editing ? <TextInput name={'lastName'} defaultValue={user?.lastName} /> : <Value>{user?.lastName}</Value> }
          </div>
          <div>
            <SectionTitle>Email</SectionTitle>
            { editing ? <TextInput setValue={(s) => { setValidEmail(isValidEmail(s)) }} name={'email'} defaultValue={user?.email} /> : <Value>{user?.email}</Value> }
            { editing && !validEmail && <ErrorLabel>Invalid email</ErrorLabel> }
          </div>
          <div>
            <SectionTitle>Phone</SectionTitle>
            { editing ? <TextInput setValue={(s) => { setValidPhone(isValidPhone(s)) }} name={'phone'} defaultValue={user?.phone} /> : <Value>{user?.phone}</Value> }
            { editing && !validPhone && <ErrorLabel>Invalid phone</ErrorLabel> }
          </div>
          <div>
            <SectionTitle>Username</SectionTitle>
            { editing && false ? <TextInput name={'username'} defaultValue={user?.username ?? ''} /> : <Value>{user?.username}</Value> }
          </div>
          <div>
            <SectionTitle>Reserving since</SectionTitle>
            <Value>{new Date(user?.createdAt).toDateString()}</Value>
          </div>
      </InfoWrap>
    </StretchForm>
  </InnerWrap></Wrap>
}