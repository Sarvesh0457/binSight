import  Classify  from "@/components/Classify";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/auth";
export default async function ClassifyPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  return <>
    <Classify />
  </>
}