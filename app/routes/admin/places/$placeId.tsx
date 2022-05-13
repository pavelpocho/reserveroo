import { Category, Company, Location, OpeningTime, Reservable, Tag } from '@prisma/client';
import { unstable_parseMultipartFormData, UploadHandler } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '~/components/button';
import { ArrayInput } from '~/components/inputs/ArrayInput';
import { ImageInput } from '~/components/inputs/ImageInput';
import { MultiSelectorInput } from '~/components/inputs/MultiSelectorInput';
import { NumberInput } from '~/components/inputs/NumberInput';
import { IdInput } from '~/components/inputs/ObjectInput';
import { SingleSelectorInput } from '~/components/inputs/SingleSelectorInput';
import { TextInput } from '~/components/inputs/TextInput';
import { TimeInput } from '~/components/inputs/TimeInput';
import { useLangs } from '~/contexts/langsContext';
import { getCategoryList } from '~/models/category.server';
import { getCompanyList } from '~/models/company.server';
import { getLocationList } from '~/models/location.server';
import { updateOpeningTime } from '~/models/openingTime.server';
import { getPlace, Place, updatePlace } from '~/models/place.server';
import { createReservable, deleteReservable, updateReservable } from '~/models/reservable.server';
import { getTagList } from '~/models/tag.server';
import { CategoryWithTexts, LocationWithTexts, PlaceForEdit, TagWithTexts } from '~/types/types';
import { getDateObjectFromTimeString, getFormEssentials } from '~/utils/forms';
import { uploadImageToS3 } from '~/utils/s3.server';

interface AdminPlaceDetailLoaderData {
  place: PlaceForEdit;
  companies: Company[];
  tags: TagWithTexts[];
  categories: CategoryWithTexts[];
  locations: LocationWithTexts[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.placeId) return json({})
  return json({
    place: await getPlace({ id: params.placeId }),
    companies: await getCompanyList({ name: '' }),
    tags: await getTagList({ nameFragment: '' }),
    categories: await getCategoryList({ nameFragment: '' }),
    locations: await getLocationList({ cityCountry: '' })
  });
}

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem: getFileType } = await getFormEssentials(request);

  const getFormItem = (name: string) => imgForm.get(name)?.toString() ?? '';
  const getFormItems = (key: string) => imgForm.getAll(key).map(r => r.toString());

  const uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== 'image') {
      stream.resume();
      return;
    }

    const stream2buffer: Buffer = await new Promise((resolve, reject) => {
      const _buf: any[] = [];
  
      stream.on('data', (chunk) => _buf.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(_buf)));
      stream.on('error', (err) => reject(err));

    });

    if (stream2buffer.byteLength > 500_000) {
      return '';
    }

    const extension = getFileType('imageType').split('.')[getFileType('imageType').split('.').length - 1].toLowerCase();
    const acceptableTypes = ['jpeg', 'jpg', 'png', 'webp', 'gif'];
    if (!acceptableTypes.includes(extension)) {
      return '';
    }
    
    return await uploadImageToS3(stream2buffer, `${getFileType('id')}.${getFileType('imageType').split('.')[getFileType('imageType').split('.').length - 1]}`);
  }

  const imgForm = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  )

  const imageUrl = imgForm.get('image')?.toString() ?? '';

  const place: Pick<Place, 'id' | 'name' | 'companyId' | 'hidden' | 'profilePicUrl'> & {
    addedTagIds: string[],
    removedTagIds: string[],
    addedCategoryIds: string[],
    removedCategoryIds: string[],
    locationId: string
  } = {
    id: getFormItem('id'),
    name: getFormItem('name'),
    companyId: getFormItem('companyId'),
    hidden: getFormItem('hidden') == '1',
    addedTagIds: getFormItems('addedTagIds[]'),
    removedTagIds: getFormItems('removedTagIds[]'),
    addedCategoryIds: getFormItems('addedCategoryIds[]'),
    removedCategoryIds: getFormItems('removedCategoryIds[]'),
    locationId: getFormItem('locationId'),
    profilePicUrl: imageUrl
  }

  const reservables: Pick<Reservable, 'id' | 'name' | 'placeId' | 'minimumReservationTime' | 'reservationsPerSlot'>[] = getFormItems('reservableId[]').map((id, i) => {
    return {
      id,
      name: getFormItems('reservableName[]')[i],
      minimumReservationTime: parseInt(getFormItems('minimumReservationTime[]')[i]),
      reservationsPerSlot: parseInt(getFormItems('reservationsPerSlot[]')[i]),
      placeId: place.id
    }
  });

  const openingTimes: Pick<OpeningTime, 'id' | 'open' | 'close' | 'day'>[] = getFormItems('openingTime[]').map((id, i) => {
    return {
      id,
      open: getDateObjectFromTimeString(getFormItems('open[]')[i]),
      close: getDateObjectFromTimeString(getFormItems('close[]')[i]),
      day: parseInt(getFormItems('day[]')[i])
    }
  });

  const deletedReservableIds = getFormItems('deletedReservable[]');

  await Promise.all([
    ...reservables.map(r => r.id == '-1' ? createReservable(r) : updateReservable(r)),
    ...openingTimes.sort((a, b) => a.day - b.day).map(ot => updateOpeningTime(ot)),
    ...deletedReservableIds.map(id => deleteReservable({ id })),
    updatePlace(place)
  ]);

  return redirect('/admin/places');
}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminPlaceDetail() {

  const { place: defaultPlace, companies, tags, locations, categories } = useLoaderData<AdminPlaceDetailLoaderData>();

  const [ place, setPlace ] = useState<PlaceForEdit>(defaultPlace);

  const [ deletedReservables, setDeletedReservables ] = useState<string[]>([]);

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const [ imgExtension, setImgExtension ] = React.useState<string | null>(null);

  const deleteReservable = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    if (id != '-1') {
      setDeletedReservables([...deletedReservables, id])
    }
    setPlace({
      ...place,
      reservables: [...place.reservables.filter(rx => rx.id != id)]
    });
  }

  const addReservable = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPlace({
      ...place,
      reservables: [
        ...place.reservables,
        {
          id: '-1',
          name: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          placeId: place.id,
          minimumReservationTime: 30,
          reservationsPerSlot: 1
        }
      ]
    });
  }

  const { lang } = useLangs();

  return <div>
    <Form method='post' encType='multipart/form-data'>

      <IdInput name='id' value={place?.id} />        
      <TextInput name='name' title='Name' defaultValue={place?.name} />
      <select name='hidden' defaultValue={place.hidden ? '1' : '0'}>
        <option value='1'>Hidden</option>
        <option value='0'>Not hidden</option>
      </select>
      <select name='companyId' defaultValue={place?.companyId ?? ''}>
        { companies.map(c => <option key={c.id} value={c.id} >{c.name}</option>) }
      </select>

      <ArrayInput
        arrayTitle={'Reservables'}
        deletedIdsName={'deletedReservable[]'}
        deletedIds={deletedReservables}
        onAdd={(e) => { addReservable(e); }}
        addButtonText='Add new reservable'
      >
        { place.reservables.map(r => <ArrayInputWrap key={r.id + r.createdAt}>
          <IdInput name='reservableId[]' value={r.id} />
          <TextInput title='Reservable name' name='reservableName[]' defaultValue={r.name} />
          <NumberInput title='Minimum reservation interval (minutes)' name='minimumReservationTime[]' defaultValue={r.minimumReservationTime} />
          <NumberInput title='Reservations per slot' name='reservationsPerSlot[]' defaultValue={r.minimumReservationTime} />
          <Button onClick={(e) => { deleteReservable(e, r.id); }}>Delete</Button>
        </ArrayInputWrap>) }
      </ArrayInput>

      <ArrayInput arrayTitle='Opening times'>
        { place.openingTimes.sort((a, b) => a.day - b.day).map(t => <ArrayInputWrap key={t.id}>
          <p>{daysOfWeek[t.day]}</p>
          <IdInput name='openingTime[]' value={`${t.id}`} />
          <IdInput name='day[]' value={`${t.day}`} />
          <TimeInput title='Open:' name='open[]' defaultValue={new Date(t.open)} />
          <TimeInput title='Close:' name='close[]' defaultValue={new Date(t.close)} />
        </ArrayInputWrap>) }
      </ArrayInput>

      <MultiSelectorInput
        possibleValuesAndTexts={tags.map(t => ({ value: t.id, text: t.multiLangName ? t.multiLangName[lang] : '' }))}
        defaultValuesAndTexts={place.tags.map(t => ({ value: t.id, text: t.multiLangName ? t.multiLangName[lang] : '' }))}
        removedName={'removedTagIds[]'}
        addedName={'addedTagIds[]'}
      />

      <MultiSelectorInput
        possibleValuesAndTexts={categories.map(c => ({ value: c.id, text: c.multiLangName ? c.multiLangName[lang] : '' }))}
        defaultValuesAndTexts={place.categories.map(c => ({ value: c.id, text: c.multiLangName ? c.multiLangName[lang] : '' }))}
        removedName={'removedCategoryIds[]'}
        addedName={'addedCategoryIds[]'}
      />

      <SingleSelectorInput
        possibleValuesAndTexts={locations.map(l => ({ value: l.id, text: `${l.multiLangCity ? l.multiLangCity[lang] : ''}, ${l.multiLangCountry ? l.multiLangCountry[lang] : ''}` }))}
        name={'locationId'}
        defaultValueAndText={{
          value: place.Location?.id ?? '',
          text: place.Location ? `${place.Location?.multiLangCity ? place.Location?.multiLangCity[lang] : ''}, ${place.Location?.multiLangCountry ? place.Location?.multiLangCountry[lang] : ''}` : ''
      }} />

      <input type='file' name='image' accept='.png,.jpg,.jpeg,.webp,.gif' onChange={(e) => {
        setImgExtension(e.currentTarget.value);
      }} />
      <IdInput name='imageType' value={imgExtension ?? ''} />

      <input type='submit'/>
    </Form>
  </div>
}