'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faEnvelope, faMobile, faPlus, faSave, faSort, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { savePageButtons } from "@/app/actions/pageAction";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import SubmitButton from "../../components/buttons/SubmitButton";


export const allButtons = [
    { key: 'email', 'label': 'e-mail', icon: faEnvelope, placeholder: 'text@example.com' },
    { key: 'mobile', 'label': 'mobile', icon: faMobile, placeholder: '+91-XXXXXXXXXX' },
    { key: 'instagram', 'label': 'instagram', icon: faInstagram, placeholder: 'https://instagram/Your_profile' },
    { key: 'facebook', 'label': 'facebook', icon: faFacebook },
    { key: 'youtube', 'label': 'youtube', icon: faYoutube },
    { key: 'whatsapp', 'label': 'whatsapp', icon: faWhatsapp },
    { key: 'github', 'label': 'github', icon: faGithub },
    { key: 'discord', 'label': 'discord', icon: faDiscord },
    { key: 'telegram', 'label': 'telegram', icon: faTelegram },
]

function upperFirst(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export default function PageButtonForm({ user, page }) {
    const pageButtons = page?.buttons ?? {};  // safe fallback to empty object

    const pageSaveButtonKey = Object.keys(pageButtons);

    const pageSaveButtonInfo = pageSaveButtonKey.map(k =>
        allButtons.find(b => b.key === k)
    ).filter(Boolean); // remove nulls if a key doesn’t exist in allButtons

    const [activeButtons, setActiveButtons] = useState(pageSaveButtonInfo);

    function addButtonToProfile(button) {
        setActiveButtons(prevButtons => [...prevButtons, button]);
    }

    function removeButton({ key: keyToRemove }) {
        setActiveButtons(prevButtons =>
            prevButtons.filter(button => button.key !== keyToRemove)
        );
    }

    const availableButtons = allButtons.filter(
        b1 => !activeButtons.find(b2 => b1.key === b2.key)
    );

    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success("Saved");
    }

    return (
        <SectionBox>
            <form action={saveButtons}>
                <h2 className="text-3xl font-bold mb-4">Buttons:</h2>
                <ReactSortable
                    handle={".handle"}
                    list={activeButtons}
                    setList={setActiveButtons}
                >
                    {activeButtons.map(b => (
                        <div key={b.key} className="mb-4 md:flex items-center">
                            <div className="w-56 flex items-center gap-2 p-2 h-full text-gray-700">
                                <FontAwesomeIcon
                                    icon={faSort}
                                    className="cursor-pointer text-gray-300 hover:text-gray-400 p-2 handle"
                                />
                                <FontAwesomeIcon icon={b.icon} />
                                <span>{upperFirst(b.label)}:</span>
                            </div>
                            <div className="flex grow">
                                <input
                                    type="text"
                                    style={{ marginBottom: "0" }}
                                    placeholder={b.placeholder}
                                    defaultValue={pageButtons[b.key] ?? ""}
                                    name={b.key}
                                />

                                <button
                                    onClick={() => removeButton(b)}
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </ReactSortable>

                <div className="flex flex-wrap gap-2 mt-8 border-y py-4">
                    {availableButtons.map(b => (
                        <button
                            key={b.key}
                            type="button"
                            onClick={() => addButtonToProfile(b)}
                            className="flex gap-2 p-2 items-center bg-gray-200"
                        >
                            <FontAwesomeIcon icon={b.icon} />
                            <span>{upperFirst(b.label)}</span>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    ))}
                </div>
                <div className="max-w-xs mx-auto mt-8">
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}
