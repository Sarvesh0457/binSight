export default function ClassifyPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
        <div>
            <h1 className="text-4xl font-bold">Classify</h1>
        </div>
        <div className="flex flex-col gap-4">
            <input type="file" accept="image/*" className="p-2 bg-neutral-700 border-gray-300 rounded-md border" />
            <button className="py-2 px-4 text-white bg-green-700 rounded-md border-green-800 cursor-pointer hover:bg-green-800 border">Scan the Image</button>
        </div>
    </div>
  );
}
