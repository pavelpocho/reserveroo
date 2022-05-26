import { ActionFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction, redirect } from '@remix-run/server-runtime'
import { AccountSummary } from '~/components/profile/account-summary'
import { checkForUserByEmail, checkForUserByUsername, getUserByUsername, setUserAsDeleted, updateUser } from '~/models/user.server';
import { getFormEssentials } from '~/utils/forms';
import { logout, requireUsernameAndAdmin } from '~/utils/session.server';
import { ProfileLoaderData } from '../profile';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserByUsername({ username: (await requireUsernameAndAdmin(request)).username });
  if (user) {
    user.passwordHash = '';
  }
  return { user: user };
}

export const action: ActionFunction = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);

  const id = getFormItem('id');
  await setUserAsDeleted({ id });

  return logout(request, '/');
  // const firstName = getFormItem('firstName');
  // const lastName = getFormItem('lastName');
  // const phone = getFormItem('phone');

  // const dcCheck = [await checkForUserByEmail({ email }), await checkForUserByEmail({ username })];
  // for (let i = 0; i < dcCheck.length; i++) {
  //   if (dcCheck[i] != null && dcCheck[i]?.id != id) return {};
  // }

  // if (id && firstName && lastName && /*username && email &&*/ phone) {
  //   await updateUser({
  //     id, firstName, lastName, /*username, email,*/ phone
  //   });
  //   return redirect('/profile');
  // }

  return {};
}