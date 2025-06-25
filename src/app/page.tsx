"use client";

import React, { useState } from "react";
import { FaFilePdf, FaFilePowerpoint, FaYoutube } from "react-icons/fa";


export default function ResourceFinder() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  
  const handleSearch = () => {
     setIsLoading(true); 
  setResults([]); 

 setTimeout(() => {
    const dummyResults = [
      {
        id: 1,
        type: "pdf",
        name: `${query}.pdf file`,
        subtitle: "Size: 1.2MB",
        url: "/dummy-files/sample.pdf",
      },
      {
        id: 2,
        type: "ppt",
        name: `${query}.ppt file`,
        subtitle: "Size: 1.4MB",
        url: "/dummy-files/sample.pptx",
      },
      {
        id: 3,
        type: "video",
        name: `${query}video series`,
        subtitle: "Published: June 2023",
        url: "https://www.example.com/tutorial-video",
      },
    ];
    setResults(dummyResults);
       setIsLoading(false); 
  }, 1100); 
};


  const getIcon = (type: string) => {
    const iconStyle = { fontSize: "1.5rem", marginRight: "0.5rem" };
    switch (type) {
      case "pdf":
        return <FaFilePdf style={{ ...iconStyle, color: "#e3342f" }} />;
      case "ppt":
        return <FaFilePowerpoint style={{ ...iconStyle, color: "#d97706" }} />;
      case "video":
        return <FaYoutube style={{ ...iconStyle, color: "#ff0000" }} />;
      default:
        return null;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case "pdf":
        return "Download PDF";
      case "ppt":
        return "Download PowerPoint";
      case "video":
        return "Watch Video";
      default:
        return "Download";
    }
  };

  return (
    <div className="custom-container">
      <h1 className="head-text">Resource Finder</h1>

      <div className="search-bar">
        <textarea
          placeholder="Ask anything...."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {isLoading && (
  <div className="my-6 flex justify-center">
    <div className="spinner"></div>
  </div>
)}


      <div className="result-list">
        {results.map((item) => (
          <div className="result-row" key={item.id}>
             <div className="file-info">
            <div className="file-info">
  <span className="file-title flex items-center">
    {getIcon(item.type)} {item.name}
  </span>
  <span className="file-subtitle">{item.subtitle}</span>
</div>
            </div>

            {item.id === 3 ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="download-button"
              >
                {getLabel(item.type)}
              </a>
            ) : (
              <a href={item.url} download className="download-button">
                {getLabel(item.type)}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

