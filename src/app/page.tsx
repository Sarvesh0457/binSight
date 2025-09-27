import ToPage from "@/components/toPageButton";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <div>
        <h1 className="text-4xl font-bold">BinSight</h1>
      </div>
      <div className="max-w-md text-center">
        <p className="text-lg">BinSight is an AI-powered web application that helps you identify recyclable materials in images. Simply upload a photo, and our model will classify the items to help you recycle correctly and reduce waste.</p>
      </div>
      <div>
        <ToPage />
      </div>
    </div>
  );
}
