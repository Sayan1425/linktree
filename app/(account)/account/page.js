import { redirect } from "next/navigation";
import UsernameForm from "../../components/forms/UsernameForm";
import { Page } from "../../models/Page";
import mongoose from "mongoose";
import PageSettingForm from "@/app/components/forms/PageSettingForm";
import PageButtonForm from "../../components/forms/PageButtonForm";
import PageLinkForm from "@/app/components/forms/PageLinkForm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import cloneDeep from "lodash/cloneDeep";

export default async function AccountPage({ searchParams }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    redirect("/");
  }

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.email) {
      redirect("/");
    }
    user = {
      email: decoded.email,
      name: decoded.name,
      image: decoded.image,
    };
  } catch (err) {
    console.error("JWT decode error:", err);
    redirect("/");
  }

  const params = await searchParams;
  const desired_username = params?.desired_username;

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: user.email });

  if (page) {
    // Convert mongoose doc → plain object
    const leanPage = cloneDeep(page.toJSON());
    leanPage._id = leanPage._id.toString();
    return (
      <>
        <PageSettingForm page={leanPage} user={user} />
        <PageButtonForm page={leanPage} user={user} />
        <PageLinkForm page={leanPage} user={user} />
      </>
    );
  }

  return (
    <div>
      <UsernameForm desired_username={desired_username} />
    </div>
  );
}