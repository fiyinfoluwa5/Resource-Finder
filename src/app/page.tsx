"use client";

import React, { useState } from "react";

export default function ResourceFinder() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    // Dummy result based on query
    const dummyResults = [
      {
        id: 1,
        type: "pdf",
        name: `${query} .pdf file`,
        url: "/dummy-files/sample.pdf",
      },
      {
        id: 2,
        type: "ppt",
        name: `${query} .ppt file`,
        url: "/dummy-files/sample.pptx",
      },
      {
        id: 3,
        type: "video",
        name: `${query} video series`,
        url: "https://www.example.com/tutorial-video",
      },
    ];
    setResults(dummyResults);
  };

  const getLabel = (type: string) => {
    switch (type) {
      case "pdf":
        return "Download PDF";
      case "ppt":
        return "Download PowerPoint";
      case "video":
        return "Video links";
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

      <div className="result-list">
        {results.map((item) => (
          <div className="result-row" key={item.id}>
            <span className="file-title">{item.name}</span>

            {item.id === 3 ? (
              // Link opens in a new tab
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
