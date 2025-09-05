import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactPage() {
  return (
    <div className="py-16 px-4 text-slate-300">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl mb-12">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold border-b-2 border-green-500 pb-2">Contact Information</h2>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-2xl text-green-500" />
            <span>123 Creative Lane, Digital City, India</span>
          </div>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-green-500" />
            <span>sayankoner744@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faPhone} className="text-2xl text-green-500" />
            <span>+91 XXXXXXXXXX</span>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold">Your Name</label>
              <input type="text" id="name" className="w-full p-2 rounded-md bg-blue-900 border border-slate-600 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">Your Email</label>
              <input type="email" id="email" className="w-full p-2 rounded-md bg-blue-900 border border-slate-600 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
              <textarea id="message" rows="5" className="w-full p-2 rounded-md bg-blue-900 border border-slate-600 focus:border-green-500 outline-none"></textarea>
            </div>
            <button type="submit" className="bg-green-500 text-blue-950 font-bold py-2 px-6 rounded-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}