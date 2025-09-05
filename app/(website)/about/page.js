import { faBullseye, faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AboutPage() {
  return (
    <div className="text-center py-16 px-4 text-slate-300">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">About LinkTree</h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl mb-12">
        We believe in simplifying the way you share your world. LinkTree provides one link to house all your important content, making it easier for your audience to find everything in one place.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-blue-900 p-6 rounded-lg shadow-lg">
          <FontAwesomeIcon icon={faBullseye} className="text-5xl text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p>To provide a simple, powerful, and elegant solution for content creators and businesses to connect with their audience.</p>
        </div>
        <div className="bg-blue-900 p-6 rounded-lg shadow-lg">
          <FontAwesomeIcon icon={faUsers} className="text-5xl text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
          <p>We are a team of passionate developers and designers dedicated to building tools that help you grow and succeed online.</p>
        </div>
        <div className="bg-blue-900 p-6 rounded-lg shadow-lg">
          <FontAwesomeIcon icon={faHeart} className="text-5xl text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
          <p>We value simplicity, user experience, and a commitment to helping our community thrive in the digital landscape.</p>
        </div>
      </div>
    </div>
  );
}