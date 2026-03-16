export default function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className="text-2xl bg-indigo-50 text-indigo-600 h-12 w-12 flex items-center justify-center rounded-full">
        {icon}
      </div>
    </div>
  );
}