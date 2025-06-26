"use client";

import React, { useState } from "react";
import { FaFilePdf, FaFilePowerpoint, FaYoutube } from "react-icons/fa";
import { Search, ExternalLink, Loader2 } from "lucide-react";

interface Resource {
  title: string;
  description: string;
  url: string;
  type?: string;
}

export default function ResourceFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      const dummyData: Resource[] = [
        {
          title: `${searchQuery} PDF Guide`,
          description: "A beginner's guide in PDF format.",
          url: "/dummy/sample.pdf",
          type: "PDF",
        },
        {
          title: `${searchQuery} PowerPoint Slides`,
          description: "Presentation slides for quick understanding.",
          url: "/dummy/sample.pptx",
          type: "PowerPoint",
        },
        {
          title: `${searchQuery} Video Tutorial`,
          description: "A YouTube video tutorial.",
          url: "https://example.com/tutorial-video",
          type: "Video",
        },
      ];

      setResources(dummyData);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const getIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case "pdf":
        return <FaFilePdf style={{ color: "#e3342f", marginRight: "0.5rem" }} />;
      case "powerpoint":
        return <FaFilePowerpoint style={{ color: "#d97706", marginRight: "0.5rem" }} />;
      case "video":
        return <FaYoutube style={{ color: "#ff0000", marginRight: "0.5rem" }} />;
      default:
        return null;
    }
  
  };

  return (
    <div className="resource-finder-container">
      <h1 className="title">Resource Finder</h1>
      <p className="subtitle">Discover resources for any topic you're interested in<br/> From tutorials to tools,find everything you need to learn.</p>

     <div className="search-section">
  <div className="search-input-wrapper">
    <Search className="search-icon" />
    <textarea
      placeholder="Ask anything..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={handleKeyPress}
      rows={1}
      className="search-input"
      disabled={isLoading}
    />
  </div>
  <button
    onClick={handleSearch}
    disabled={isLoading || !searchQuery.trim()}
    className="search-button"
  >
    {isLoading ? "Searching..." : "Search"}
  </button>
</div>

      {hasSearched && (
        <div className="results-section">
          <h2 className="results-title">
            {isLoading ? "Searching..." : `Resources for "${searchQuery}"`}
          </h2>

          {resources.length > 0 && !isLoading ? (
            <div className="resource-cards">
              {resources.map((resource, index) => (
                <div className="resource-card" key={index}>
                  <div className="resource-header">
                    <span className="resource-icon">{getIcon(resource.type)}</span>
                    <h3 className="resource-title">{resource.title}</h3>
                    {resource.type && <span className="resource-type">{resource.type}</span>}
                  </div>
                  <p className="resource-description">{resource.description}</p>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    Visit Resource <ExternalLink className="external-link-icon" />
                  </a>
                </div>
              ))}
            </div>
          ) : !isLoading ? (
            <p className="no-results">No resources found.</p>
          ) : null}
        </div>
      )}

      {!hasSearched && (
  <div className="welcome-card">
    <div className="welcome-icon-wrapper">
      <Search className="welcome-icon" />
    </div>
    <h2 className="welcome-title">Start Your Search</h2>
    <p className="welcome-text">
      Enter any topic above to discover helpful resources, tutorials, tools, and more.
    </p>

    <div className="welcome-tags">
      {[
        "Search with resource finder",
        "Discover Tools, Tutorials, and More",
        "Explore and Learn",
        "Find what you need",
        
      ].map((tag, index) => (
        <button key={index} className="tag-button">
          {tag}
        </button>
      ))}
    </div>
  </div>
)}
</div>  
  );
}

