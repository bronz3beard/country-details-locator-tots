type DetailSectionListProps<T> = {
  title: string;
  list: Array<T> | null;
  maxHeight?: string;
  minHeight?: string;
  bg?: string;
};

const DetailSectionList = <T extends { name: string }>({
  title,
  list,
  maxHeight = '176px',
  minHeight = '42px',
  bg = 'bg-white'
}: DetailSectionListProps<T>) => {
  return (
    <div className={`${bg} grid grid-cols-1 gap-1 px-4 py-2 md:grid-cols-[auto_1fr] md:py-5`}>
      <dt className="text-base font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul
          style={{ maxHeight, minHeight }}
          className="ml-0.5 w-full list-inside list-disc space-y-1 overflow-y-scroll text-gray-900"
        >
          {list?.map(({ name }, index) => <li key={index}>{name}</li>)}
        </ul>
      </dd>
    </div>
  );
};

export default DetailSectionList;
