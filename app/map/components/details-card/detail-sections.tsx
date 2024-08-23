type DetailSectionProps = { title: string; detail: string; bg?: string };

const DetailSection = ({ title, detail, bg = 'bg-white' }: DetailSectionProps) => {
  return (
    <div className={`${bg} px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 md:py-5`}>
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{detail}</dd>
    </div>
  );
};

export default DetailSection;
