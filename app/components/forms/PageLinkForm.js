'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faCloudArrowUp, faLink, faPlus, faSave, faSort, faTrash } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../../components/buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/app/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/app/actions/pageAction";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

export default function PageLinkForm({ page }) {
  const [links,setLinks] = useState(
    (page.links || []).map(link => ({
      ...link,
      key: link.key || uuidv4(), 
    }))
  );

  async function save() {
    await savePageLinks(links);
    toast.success('Saved!');
  }

  function addNewLink() {
    setLinks(prev => {
      return [...prev, {
        key:  uuidv4(),
        title: '',
        subtitle: '',
        icon: '',
        url: '',
      }];
    });
  }

  function handleUpload(e, linkKeyForUpload) {
    upload(e, uploadedImageUrl => {
      setLinks(prevLinks => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }

  function handleLinkChange(keyOfLinkToChange, prop, e) {
    setLinks(prev => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = e.target.value;
        }
      });
      return newLinks;
    })
  }

  function removeLink(linkKeyToRemove){
    setLinks(prevLinks => [...prevLinks].filter(l => l.key !== linkKeyToRemove))
    //toast.success('The link has been successfully removed!')
  }


  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-3xl font-bold mb-4 ">Links:</h2>
        <button
        onClick={addNewLink}
         type="button" className="flex items-center text-blue-500 text-lg cursor-pointer gap-2">
          <FontAwesomeIcon icon={faPlus} className="bg-blue-500 text-white p-1 rounded-full aspect-square" />
          <span>Add new</span>
        </button>

        <div>
          <ReactSortable
            handle={'.handle'}
            list={links} setList={setLinks}>
            {links.map(l => (
              <div key={l.key} className="mt-8 md:flex items-center gap-6">
                <div className="handle">
                  <FontAwesomeIcon icon={faSort} className="cursor-pointer text-gray-500 hover:text-gray-700 mr-2" />
                </div>

                <div className="text-center">
                  <div className="bg-gray-300 p-4 rounded-full relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                    {l.icon && (
                      <Image
                        className="object-cover w-full h-full"
                        src={l.icon}
                        alt={'icon'}
                        width={64} height={64}
                      />
                    )}
                    {!l.icon && (
                      <FontAwesomeIcon size="xl" icon={faLink} />
                    )}
                  </div>
                  <div>
                    <input
                      onChange={e => handleUpload(e, l.key,)}
                      id={'icon' + l.key}
                      type="file"
                      className="hidden" />
                    <label
                      htmlFor={'icon' + l.key} 
                      className="border text-gray-600 flex items-center justify-center gap-1 mt-2 mb-2 p-2 cursor-pointer">
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      <span>Change  icon</span>
                    </label>
                     <button
                     onClick={()=>removeLink(l.key)} 
                     type="button" className="bg-gray-300 py-2 px-3 mb-2 w-full h-full flex items-center gap-2 justify-center">
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Remove this link</span>
                  </button>
                  </div>
                </div>

                <div className="grow">
                  <label className="input-label">Title:</label>
                  <input
                    value={l.title}
                    onChange={e => handleLinkChange(l.key, 'title', e)}
                    type="text" placeholder="title" />

                  <label className="input-label">Subtitle:</label>
                  <input
                    value={l.subtitle}
                    onChange={e => handleLinkChange(l.key, 'subtitle', e)}
                    type="text"
                    placeholder="subtitle(optional)" />

                  <label className="input-label">Url:</label>
                  <input
                    value={l.url}
                    onChange={e => handleLinkChange(l.key, 'url', e)}
                    type="text"
                    placeholder="url" />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>

        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  )
}