'use client'

import { faCloudArrowUp, faImage, faPalette, faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
import RadioToggler from "../../components/forms/RadioToggler";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { savePageSettings } from "@/app/actions/pageAction";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";
import SubmitButton from "../../components/buttons/SubmitButton";
import { upload } from "@/app/libs/upload";

export default function PageSettingForm({ page, user }) {

  const [avatar, setAvatar] = useState(
    page?.avatar && page.avatar.trim() !== ""
      ? page.avatar
      : user?.image || null
  );
  const [bgType, setBgType] = useState(page?.bgType ?? "color");
  const [bgColor, setBgColor] = useState(page?.bgColor ?? "#ffffff");
  const [bgImage, setBgImage] = useState(page?.bgImage ?? "");
  const [displayName, setDisplayName] = useState(page?.displayName ?? "");
  const [location, setLocation] = useState(page?.location ?? "");
  const [bio, setBio] = useState(page?.bio ?? "");

  async function saveBaseSettings(formData) {
    formData.set("bgImage", bgImage);

    // Save avatar only if it's not the Google default
    if (avatar) {
      formData.set("avatar", avatar);
    }

    const result = await savePageSettings(formData);
    if (result) toast.success("Saved!");
  }

  function handleCoverImgChange(e) {
    upload(e, (link) => setBgImage(link));
  }

  function handleAvatarImgChange(e) {
    upload(e, (link) => setAvatar(link));
  }

  return (
    <div>
      <SectionBox>
        <form action={saveBaseSettings}>
          {/* Background Section */}
          <div
            className="py-12 min-h-[300px] flex justify-center items-center bg-cover bg-center -m-4"
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div className="flex flex-col items-center">
              <RadioToggler
                defaultValue={page?.bgType ?? "color"}
                options={[
                  { value: "color", icon: faPalette, label: "Color" },
                  { value: "image", icon: faImage, label: "Image" },
                ]}
                onChange={(val) => setBgType(val)}
              />

              {bgType === "color" && (
                <div className="bg-white p-2 mt-2 shadow text-lg rounded-md ">
                  <div className="flex justify-center gap-2">
                    <span>Background color:</span>
                    <input
                      type="color"
                      name="bgColor"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {bgType === "image" && (
                <div className="flex justify-center">
                  <label className="bg-white shadow-md px-5 py-2 mt-2 cursor-pointer text-lg rounded-md">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleCoverImgChange}
                    />
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faUpload}/>
                      <span>Choose an image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Avatar Section */}
          <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                {avatar && (
                  <Image
                    className="w-full h-full object-cover"
                    src={avatar}
                    alt="avatar"
                    width={128}
                    height={128}
                  />
                )}
              </div>

              <label
                htmlFor="avatarIn"
                className="absolute bottom-0 right-2 bg-white p-1 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
              >
                <FontAwesomeIcon size={"xl"} icon={faCloudArrowUp} />
              </label>
              <input
                onChange={handleAvatarImgChange}
                type="file"
                id="avatarIn"
                className="hidden"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8">
            <label className="input-label" htmlFor="nameIn">Display name:</label>
            <input
              type="text"
              id="nameIn"
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="bg-gray-100"
            />

            <label className="input-label" htmlFor="locationIn">Location:</label>
            <input
              type="text"
              id="locationIn"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Somewhere in the world"
            />

            <label className="input-label" htmlFor="bioIn">Bio:</label>
            <textarea
              name="bio"
              id="bioIn"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-gray-100"
              placeholder="Your bio..."
            />

            <div className="max-w-[200px] rounded-sm mx-auto">
              <SubmitButton>
                <FontAwesomeIcon icon={faSave} />
                <span>Save</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}
