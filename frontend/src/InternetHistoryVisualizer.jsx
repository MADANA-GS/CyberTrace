import React, { useState, useEffect } from 'react';

const InternetHistoryVisualizer = () => {
  const [activeEra, setActiveEra] = useState('1970s');
  const [activeView, setActiveView] = useState('network');
  const [searchTerm, setSearchTerm] = useState('');
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const eras = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
  const views = ['Network', 'Timeline', 'Map'];

  const getEraTitle = (era) => {
    switch(era) {
      case '1960s': return 'Internet in the 1960s: Origins and Concepts';
      case '1970s': return 'Internet in the 1970s: ARPANET and Early Networking';
      case '1980s': return 'Internet in the 1980s: DNS and Global Expansion';
      case '1990s': return 'Internet in the 1990s: World Wide Web and Dot-Com Rise';
      case '2000s': return 'Internet in the 2000s: Broadband and Web 2.0';
      case '2010s': return 'Internet in the 2010s: Mobile Internet and Social Media';
      case '2020s': return 'Internet in the 2020s: AI, IoT, and Web3';
      default: return '';
    }
  };

  const timelineMarkers = [
    { year: 1969, position: 10, event: 'ARPANET Established (1969)' },
    { year: 1971, position: 20, event: 'Email Invented (1971)' },
    { year: 1978, position: 30, event: 'TCP/IP Developed (1978)' },
    { year: 1984, position: 40, event: 'DNS Implemented (1984)' },
    { year: 1991, position: 50, event: 'World Wide Web Created (1991)' },
    { year: 1997, position: 60, event: 'Dot-com Boom (1997-2000)' },
    { year: 2004, position: 70, event: 'Social Media Era Begins (2004)' },
    { year: 2010, position: 80, event: 'Mobile Internet Takes Off (2010)' },
    { year: 2020, position: 90, event: 'AI & IoT Expansion (2020)' }
  ];

  const networkNodes = [
    { id: 'arpa', name: 'ARPA', top: 50, left: 50, color: '#e74c3c', tooltip: 'ARPANET Backbone' },
    { id: 'ucla', name: 'UCLA', top: 30, left: 30, color: '#3498db', tooltip: 'UCLA - First ARPANET Node' },
    { id: 'sri', name: 'SRI', top: 35, left: 70, color: '#3498db', tooltip: 'Stanford Research Institute' },
    { id: 'utah', name: 'UTAH', top: 70, left: 40, color: '#3498db', tooltip: 'University of Utah' },
    { id: 'ucsb', name: 'UCSB', top: 65, left: 65, color: '#3498db', tooltip: 'UC Santa Barbara' }
  ];

  const connections = [
    { from: 'arpa', to: 'ucla', angle: -45, length: 25 },
    { from: 'arpa', to: 'sri', angle: 20, length: 21 },
    { from: 'arpa', to: 'utah', angle: 215, length: 17 },
    { from: 'arpa', to: 'ucsb', angle: 155, length: 19 }
  ];

  // Timeline data (expanded for the Timeline view)
  const timelineEvents = [
    { year: 1969, title: 'ARPANET Established', description: 'The first four nodes of ARPANET were interconnected between UCLA, Stanford Research Institute, UC Santa Barbara, and the University of Utah.' },
    { year: 1971, title: 'Email Invented', description: 'Ray Tomlinson implemented the first email program on the ARPANET, choosing the @ symbol to separate the user name from the destination server.' },
    { year: 1973, title: 'First International Connections', description: 'ARPANET made its first international connections to University College London in England and the Royal Radar Establishment in Norway.' },
    { year: 1974, title: 'TCP Specification', description: 'Vint Cerf and Bob Kahn published the specification for TCP, which later evolved into the TCP/IP protocol suite.' },
    { year: 1978, title: 'TCP/IP Development', description: 'TCP/IP protocols were developed and standardized, laying the foundation for the modern internet.' },
    { year: 1983, title: 'ARPANET Transition to TCP/IP', description: 'ARPANET officially transitioned from the NCP protocol to TCP/IP on January 1, 1983, creating the foundation for the modern Internet.' }
  ];

  // Map data
  const mapLocations = [
    { id: 'usa', name: 'United States', top: 40, left: 25, size: 'large', connections: 5, description: 'Home of ARPANET and earliest network nodes including UCLA, Stanford, and Utah.' },
    { id: 'uk', name: 'United Kingdom', top: 35, left: 48, size: 'medium', connections: 2, description: 'University College London became the first international ARPANET connection in 1973.' },
    { id: 'norway', name: 'Norway', top: 30, left: 52, size: 'small', connections: 1, description: 'Royal Radar Establishment connected to ARPANET in 1973.' },
    { id: 'france', name: 'France', top: 40, left: 50, size: 'small', connections: 1, description: 'French research networks began connecting in the late 1970s.' },
    { id: 'japan', name: 'Japan', top: 42, left: 82, size: 'small', connections: 1, description: 'Early packet-switched networks developed in parallel to ARPANET.' }
  ];

  const handleTooltipShow = (e, content) => {
    setTooltipContent(content);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  const handleTooltipHide = () => {
    setShowTooltip(false);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Render Network Visualization
  const renderNetworkView = () => (
    <div className="relative h-96 border border-gray-200 rounded-lg overflow-hidden">
      {networkNodes.map((node) => (
        <div 
          key={node.id}
          className="absolute w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-medium cursor-pointer transition-transform hover:scale-110 shadow-md"
          style={{ 
            top: `${node.top}%`, 
            left: `${node.left}%`, 
            backgroundColor: node.color 
          }}
          onMouseEnter={(e) => handleTooltipShow(e, node.tooltip)}
          onMouseLeave={handleTooltipHide}
        >
          {node.name}
        </div>
      ))}
      
      {connections.map((conn, index) => (
        <div 
          key={index}
          className="absolute h-0.5 bg-gray-300 origin-left"
          style={{ 
            top: '50%', 
            left: '50%', 
            width: `${conn.length}%`, 
            transform: `rotate(${conn.angle}deg)` 
          }}
        ></div>
      ))}
    </div>
  );

  // Render Timeline View
  const renderTimelineView = () => (
    <div className="overflow-y-auto h-96 border border-gray-200 rounded-lg p-4">
      <div className="relative ml-4">
        <div className="absolute h-full w-0.5 bg-blue-500 left-0"></div>
        
        {timelineEvents
          .filter(event => event.year.toString().includes(activeEra.replace('s', '')))
          .map((event, index) => (
            <div key={index} className="mb-8 pl-6 relative">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full left-0 transform -translate-x-1/2 mt-1"></div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-blue-600">{event.title}</h3>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">{event.year}</span>
                </div>
                <p className="text-gray-700 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  // Render Map View
  const renderMapView = () => (
    <div className="relative h-96 border border-gray-200 rounded-lg overflow-hidden bg-blue-50">
      {/* Simple world map background */}
      <div className="absolute inset-0 p-4">
        <div className="h-full w-full rounded-lg opacity-20 bg-contain bg-no-repeat bg-center"
             style={{ backgroundImage: `url('/api/placeholder/800/400')` }}>
        </div>
      </div>
      
      {mapLocations.map((location) => {
        const getSize = (size) => {
          switch(size) {
            case 'large': return 'w-16 h-16';
            case 'medium': return 'w-12 h-12';
            case 'small': return 'w-8 h-8';
            default: return 'w-10 h-10';
          }
        };
        
        return (
          <div 
            key={location.id}
            className={`absolute ${getSize(location.size)} rounded-full flex items-center justify-center text-white text-xs font-medium cursor-pointer transition-transform hover:scale-110 shadow-md`}
            style={{ 
              top: `${location.top}%`, 
              left: `${location.left}%`, 
              backgroundColor: '#3498db',
              opacity: 0.8
            }}
            onMouseEnter={(e) => handleTooltipShow(e, `${location.name}: ${location.description}`)}
            onMouseLeave={handleTooltipHide}
          >
            <span className="text-xs">{location.connections}</span>
          </div>
        );
      })}
      
      {/* Simple connection lines */}
      <div className="absolute h-0.5 bg-gray-400 origin-left opacity-40"
           style={{ top: '40%', left: '25%', width: '23%', transform: 'rotate(10deg)' }}></div>
      <div className="absolute h-0.5 bg-gray-400 origin-left opacity-40"
           style={{ top: '35%', left: '48%', width: '4%', transform: 'rotate(-20deg)' }}></div>
      <div className="absolute h-0.5 bg-gray-400 origin-left opacity-40"
           style={{ top: '40%', left: '25%', width: '57%', transform: 'rotate(20deg)' }}></div>
    </div>
  );

  const renderVisualization = () => {
    switch(activeView) {
      case 'network':
        return renderNetworkView();
      case 'timeline':
        return renderTimelineView();
      case 'map':
        return renderMapView();
      default:
        return renderNetworkView();
    }
  };

  const renderLegend = () => {
    if (activeView === 'network') {
      return (
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm">Main Network Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-sm">Research Institution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-300"></div>
            <span className="text-sm">Network Connection</span>
          </div>
        </div>
      );
    } else if (activeView === 'map') {
      return (
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-sm">Network Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-400 opacity-40"></div>
            <span className="text-sm">International Connection</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Numbers indicate connected nodes</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Internet History Evolution Visualizer</h1>
        <p className="text-sm opacity-80">Explore the development of the Internet from ARPANET to the Modern Web</p>
      </header>
      
      <div className="max-w-6xl mx-auto p-4">
        {/* Controls Section */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {eras.map(era => (
              <button 
                key={era}
                className={`px-3 py-2 rounded ${activeEra === era ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white hover:bg-blue-500'}`}
                onClick={() => setActiveEra(era)}
              >
                {era}
              </button>
            ))}
          </div>
          
          <div className="flex">
            <input 
              type="text" 
              placeholder="Search for technology..." 
              className="px-3 py-2 border border-gray-700 rounded"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex gap-2">
            {views.map(view => (
              <button 
                key={view}
                className={`px-3 py-2 rounded ${activeView === view.toLowerCase() ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white hover:bg-blue-500'}`}
                onClick={() => setActiveView(view.toLowerCase())}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
        
        {/* Timeline */}
        <div className="relative h-24 bg-white rounded-lg mb-8 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500 transform -translate-y-1/2"></div>
          
          {timelineMarkers.map((marker, index) => (
            <div key={index} className="absolute" style={{ left: `${marker.position}%` }}>
              <div 
                className="absolute top-1/2 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"
                onMouseEnter={(e) => handleTooltipShow(e, marker.event)}
                onMouseLeave={handleTooltipHide}
              ></div>
              <div className="absolute bottom-2 transform -translate-x-1/2 text-xs">
                {marker.year}
              </div>
            </div>
          ))}
        </div>
        
        {/* Visualization Section */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{getEraTitle(activeEra)}</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-blue-500">Zoom In</button>
                <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-blue-500">Zoom Out</button>
              </div>
            </div>
            
            {/* Info Cards */}
            <div className="flex flex-wrap gap-8 mb-6">
              <div className="flex-1 min-w-fit bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Key Technologies</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>ARPANET - First wide-area packet-switching network</li>
                  <li>Email - First electronic messaging system</li>
                  <li>TCP/IP - Foundation protocols for internet communication</li>
                  <li>Telnet - Remote login protocol</li>
                  <li>FTP - File Transfer Protocol for sharing files</li>
                </ul>
              </div>
              
              <div className="flex-1 min-w-fit bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Notable Developments</h3>
                <p className="text-sm">
                  The 1970s saw the expansion of ARPANET from its initial four nodes to dozens of connected research institutions. 
                  Ray Tomlinson sent the first email in 1971, establishing the @ symbol convention still used today. 
                  By 1976, Queen Elizabeth II sent her first email, highlighting the technology's growing importance.
                </p>
              </div>
            </div>
            
            {/* Dynamic Visualization based on active view */}
            {renderVisualization()}
            
            {/* Dynamic Legend based on active view */}
            {renderLegend()}
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="fixed bg-gray-800 text-white py-1 px-2 rounded text-xs max-w-xs z-50 pointer-events-none"
          style={{ 
            left: `${tooltipPosition.x + 10}px`, 
            top: `${tooltipPosition.y + 10}px` 
          }}
        >
          {tooltipContent}
        </div>
      )}
      
      <footer className="bg-gray-800 text-white p-4 text-center mt-8">
        <p>Interactive Internet History Evolution Visualizer &copy; 2025</p>
      </footer>
    </div>
  );
};

export default InternetHistoryVisualizer;