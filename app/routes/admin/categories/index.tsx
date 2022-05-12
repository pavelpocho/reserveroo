import { Category } from '@prisma/client';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { getCategoryList } from '~/models/category.server';

interface CategoriesAdminLoaderData {
  categories: Category[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const categories = await getCategoryList({ name: params.categoryId ?? '' });
  return { categories }
}

export default function CategoriesAdminIndex() {

  const { categories } = useLoaderData<CategoriesAdminLoaderData>();

  return <>
    <div>
      { categories.map(c => <div key={c.id}>
        <p>Name: {c.name}</p>
        <Link to={`/admin/categories/${c.id}`}>View / Edit</Link>
      </div>) }
      <Link to={'/admin/categories/new'} >New category</Link>
    </div>
  </>
}