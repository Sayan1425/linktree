'use client';
import { useState } from "react";
import Chart from "@/app/components/Chart";
import SectionBox from "@/app/components/layout/SectionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faEye } from "@fortawesome/free-solid-svg-icons";
import { isToday, parseISO } from "date-fns"; 

// Helper function to aggregate click data by date
function aggregateClicksByDate(clicks) {
  const grouped = clicks.reduce((acc, click) => {
    const date = click.createdAt.split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(grouped).map(date => ({
    date: date,
    clicks: grouped[date],
  })).sort((a, b) => new Date(a.date) - new Date(b.date));
}

export default function AnalyticsContent({ views, allClicks, page }) {
  const [chartData, setChartData] = useState(views);
  const [activeLinkUri, setActiveLinkUri] = useState(null);

  function handleLinkClick(link) {
    setActiveLinkUri(link.url);
    const linkClicks = allClicks.filter(c => c.uri === link.url);
    const aggregatedData = aggregateClicksByDate(linkClicks);
    setChartData(aggregatedData);
  }
  
  function handleShowViews() {
    setActiveLinkUri(null);
    setChartData(views);
  }

  return (
    <div>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">
          {activeLinkUri ? `Clicks: ${activeLinkUri.replace(/^https?:\/\//, '')}` : 'Total Page Views'}
        </h2>
        <Chart data={chartData} />
      </SectionBox>

      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Controls & Stats</h2>
        <button
          onClick={handleShowViews}
          className={"flex items-center gap-4 w-full p-2 my-2 rounded-md transition-all " + (activeLinkUri === null ? 'bg-blue-200 text-blue-800 font-bold' : 'bg-gray-200 hover:bg-gray-300')}
        >
          <FontAwesomeIcon icon={faEye} className="text-blue-600" />
          <span>Show total page views</span>
        </button>

        
        {page.links.map((link) => {
          const totalClicks = allClicks.filter(c => c.uri === link.url).length;
          const clicksToday = allClicks.filter(c => c.uri === link.url && isToday(parseISO(c.createdAt))).length;

          return (
            <div
              key={link.url}
              onClick={() => handleLinkClick(link)}
              className={"md:flex items-center gap-4 my-2 p-2 rounded-md cursor-pointer transition-all " + (link.url === activeLinkUri ? 'bg-blue-200 text-blue-800 font-bold' : 'bg-gray-200 hover:bg-gray-300')}
            >
              {/* Link Title and Icon */}
              <div className="flex items-center gap-4 grow">
                <FontAwesomeIcon icon={faLink} className="text-blue-600" />
                <span>{link.title || link.url.replace(/^https?:\/\//, '')}</span>
              </div>
              
              {/* Stats */}
              <div className="flex gap-4 mt-2 md:mt-0">
                <div className="text-center border rounded-md p-2 w-24">
                  <div className="text-xl font-bold">{clicksToday}</div>
                  <div className="text-gray-500 text-xs uppercase">clicks today</div>
                </div>
                <div className="text-center border rounded-md p-2 w-24">
                  <div className="text-xl font-bold">{totalClicks}</div>
                  <div className="text-gray-500 text-xs uppercase">clicks total</div>
                </div>
              </div>
            </div>
          );
        })}
      </SectionBox>
    </div>
  );
}