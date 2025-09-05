import { Event } from "@/app/models/Event";
import { Page } from "@/app/models/Page";
import { User } from "@/app/models/User";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives";

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faMobile,
  instagram: faInstagram,
  facebook: faFacebook,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  discord: faDiscord,
  telegram: faTelegram,
};

function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}

export default async function UserPage({ params }) {
  const { uri } = await params;

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);

  // Fetch page and user
  const page = await Page.findOne({ uri });
  if (!page) return <div>Page not found</div>;

  const user = await User.findOne({ email: page.owner });

  // Track page view
  await Event.create({ uri: uri, page: uri, type: "view" });

  return (
    <div className=" text-white min-h-screen pb-12">
      <div
        className="h-60 bg-gray-300 bg-cover bg-center"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>

      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="w-full h-full rounded-full object-cover"
          src={
            page.avatar && page.avatar.trim() !== ""
              ? page.avatar
              : user?.image
          }
          alt="avatar"
          width={256}
          height={256}
        />
      </div>

      <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>

      <h3 className="text-md flex items-center justify-center gap-2 text-white/70">
        <FontAwesomeIcon className="h-4" icon={faLocationDot} />
        <span>{page.location}</span>
      </h3>

      <div className="max-w-xs mx-auto text-center my-2">
        <p>{page.bio}</p>
      </div>

      <div className="flex justify-center gap-2 pb-4 mt-4">
        {Object.keys(page.buttons).map((buttonKey) => (
          <Link
            key={buttonKey}
            href={buttonLink(buttonKey, page.buttons[buttonKey])}
            className="flex justify-center items-center rounded-full text-blue-950 bg-white p-2"
          >
            <FontAwesomeIcon
              className="w-5 h-5"
              icon={buttonsIcons[buttonKey]}
            />
          </Link>
        ))}
      </div>

      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
        {page.links.map((link, index) => (
          <Link
            key={link.url || `link-${index}`}
            target="_blank"
            ping={`/api/click?url=${btoa(link.url)}&page=${page.uri}`}
            className="bg-indigo-800 p-2 flex"
            href={link.url}
          >
            <div className="relative -left-4 overflow-hidden w-16">
              <div className="flex items-center justify-center grow relative bg-blue-700 aspect-square w-16 h-16">
                {link.icon && (
                  <Image
                    className="w-full h-full object-cover"
                    src={link.icon}
                    alt={"icon"}
                    width={64}
                    height={64}
                    priority={true}
                  />
                )}
                {!link.icon && (
                  <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                )}
              </div>
            </div>
            <div className="flex-row items-center justify-center shrink grow-0 overflow-hidden">
              <div>
                <h3>{link.title}</h3>
                <p className="text-white/70 h-6 overflow-hidden">
                  {link.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

     
      <div className="text-center my-6">
        <Link
          href="/account"
          className="bg-indigo-800 hover:bg-indigo-900 text-gray-300 font-semibold py-2 px-6 rounded-md inline-block"
        >
          Back to the account page
        </Link>
      </div>
    </div>
  );
}