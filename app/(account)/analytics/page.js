import { Event } from "@/app/models/Event";
import { Page } from "@/app/models/Page";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import AnalyticsContent from "@/app/components/AnalyticsContent";

export default async function AnalyticsPage() {
  await mongoose.connect(process.env.MONGODB_URI);
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  let user = null;
  if (token) {
    const decoded = jwt.decode(token);
    if (decoded?.email) {
      user = { email: decoded.email };
    }
  }

  if (!user) {
    return redirect("/");
  }

  const page = await Page.findOne({ owner: user.email });
  if (!page) {
    return redirect("/account");
  }
  
  // Fetch total page views, grouped by day
  const groupedViews = await Event.aggregate([
    { $match: { type: "view", uri: page.uri } },
    {
      $group: {
        _id: { $dateToString: { date: "$createdAt", format: "%Y-%m-%d" } },
        count: { $count: {} },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fetch ALL clicks for this user's page
  const allClicks = await Event.find({ page: page.uri, type: "click" });
  
  // Convert data to be passed to the client component
  const views = groupedViews.map(o => ({
    date: o._id,
    views: o.count,
  }));
  const plainClicks = JSON.parse(JSON.stringify(allClicks));
  const plainPage = JSON.parse(JSON.stringify(page));

  return (
    <div>
      <AnalyticsContent
        views={views}
        allClicks={plainClicks}
        page={plainPage}
      />
    </div>
  );
}