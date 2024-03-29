import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { useLangs } from '~/contexts/langsContext';
import { getAllCategories } from '~/models/category.server';
import type { CategoryWithTexts } from '~/types/types';

interface CategoriesAdminLoaderData {
  categories: CategoryWithTexts[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const categories = await getAllCategories();
  return { categories }
}

export default function CategoriesAdminIndex() {

  const { categories } = useLoaderData<CategoriesAdminLoaderData>();

  const { lang } = useLangs();

  return <>
    <div>
      { categories.map(c => <div key={c.id}>
        <p>Name: {c.multiLangName && c.multiLangName[lang]}</p>
        <Link to={`/admin/categories/${c.id}`}>View / Edit</Link>
      </div>) }
      <Link to={'/admin/categories/new'} >New category</Link>
    </div>
  </>
}