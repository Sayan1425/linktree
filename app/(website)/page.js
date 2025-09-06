import { redirect } from "next/navigation";
import { Page } from "../models/Page";
import HeroForm from "../components/forms/HeroForm";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight, faLink } from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  let user = null;
  let page = null

  if (token) {
    try {
      const decoded = jwt.decode(token);
      if (decoded?.email) {
        user = {
          email: decoded.email,
          name: decoded.name,
        };
        await mongoose.connect(process.env.MONGODB_URI);
        page = await Page.findOne({ owner: user.email });
      }
    } catch (err) {
      console.error("JWT decode error:", err);
    }
  }
  const plainPage = page ? JSON.parse(JSON.stringify(page)) : null;

  if (user && !plainPage) {
    return redirect('/account');
  }

  return (
    <main>
      <section className="md:pt-32 pt-10 text-center mx-auto">
        <div className="max-w-md mb-4">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-300">
            Your one <span> link <FontAwesomeIcon icon={faLink} className="text-5xl" />
            </span>
            <br /> for everything
          </h1>
          <div className="text-slate-200 text-lg md:text-xl mt-8 flex items-center gap-0 md:gap-1">
            <span>
              Share your links, social profiles, contacts info
            </span>
            <span className="mt-1">
              <FontAwesomeIcon icon={faHandPointRight} />
            </span>
          </div>
        </div >
        <HeroForm user={user} page={plainPage} />
      </section>
    </main>
  );
}