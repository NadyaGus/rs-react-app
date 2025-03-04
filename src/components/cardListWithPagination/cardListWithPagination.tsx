'use client';
import { useEffect, useState } from 'react';
import { CardProps } from '../../shared/types/cardTypes';
import { CardList } from '../cardList/cardList';
import { Pagination } from '../pagination/pagination';
import { Loader } from '../loader/loader';

export const CardListWithPagination = ({
  data,
  totalPages,
}: {
  data: CardProps[];
  totalPages: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <CardList data={data} />
      <Pagination totalPages={totalPages} setIsLoading={setIsLoading} />
    </>
  );
};
