import { faCheck, faStar, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PlansPage() {
  return (
    <div className="text-center py-16 px-4 text-slate-300">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
      <p className="max-w-xl mx-auto text-lg md:text-xl mb-12">
        Start for free and scale up as you grow. No credit card required.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="bg-blue-900 p-8 rounded-lg shadow-lg border-2 border-transparent">
          <FontAwesomeIcon icon={faStar} className="text-4xl text-gray-400 mb-4" />
          <h2 className="text-3xl font-semibold mb-2">Free</h2>
          <p className="text-5xl font-bold mb-4">$0<span className="text-lg font-normal">/mo</span></p>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Unlimited Links</li>
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Basic Analytics</li>
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Customizable Profile</li>
          </ul>
          <button className="bg-gray-500 text-white w-full py-2 rounded-lg font-semibold">Get Started</button>
        </div>

        {/* Pro Plan - Highlighted */}
        <div className="bg-blue-800 p-8 rounded-lg shadow-lg border-2 border-green-500 relative">
          <span className="bg-green-500 text-blue-950 font-bold text-sm px-4 py-1 rounded-full absolute -top-4 left-1/2 -translate-x-1/2">MOST POPULAR</span>
          <FontAwesomeIcon icon={faRocket} className="text-4xl text-green-400 mb-4" />
          <h2 className="text-3xl font-semibold mb-2">Pro</h2>
          <p className="text-5xl font-bold mb-4">$5<span className="text-lg font-normal">/mo</span></p>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Everything in Free</li>
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Advanced Analytics</li>
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Custom Backgrounds</li>
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Priority Support</li>
          </ul>
          <button className="bg-green-500 text-blue-950 w-full py-2 rounded-lg font-semibold">Go Pro</button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-blue-900 p-8 rounded-lg shadow-lg border-2 border-transparent">
          <h2 className="text-3xl font-semibold mb-2 mt-10">Enterprise</h2>
          <p className="text-2xl font-bold mb-4">Custom</p>
          <p className="mb-6">For large teams and organizations with unique needs. Get in touch for a custom quote.</p>
          <button className="bg-gray-500 text-white w-full py-2 rounded-lg font-semibold">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}