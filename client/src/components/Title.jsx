export default function Title({ title, icon }) {
  return (
    <div className="flex justify-start pr-12 font-bold items-center border-solid border-sky-500 border-y-2 bg-sky-100">
      <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
        <span className={`${icon} text-white text-sm`}></span>
      </div>
      {title}
    </div>
  );
}
