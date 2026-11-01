const mapWidth = 464;
const mapHeight = 290;
const origin = { x: 66, y: 48 };
const branches = [
  { name: "JEDDAH", x: 22, y: 76, curve: "C240 136 170 180" },
  { name: "RIYADH", x: 52, y: 66, curve: "C286 152 265 170" },
  { name: "JUBAIL", x: 72, y: 28, curve: "C317 120 326 99" },
  { name: "DAMMAM", x: 83, y: 22, curve: "C350 117 385 92" },
  { name: "AL HASA", x: 78, y: 78, curve: "C324 173 338 206" }
];

const routes = branches.map((branch) =>
  `M${origin.x * mapWidth / 100} ${origin.y * mapHeight / 100} ${branch.curve} ${branch.x * mapWidth / 100} ${branch.y * mapHeight / 100}`
);

export function OfficeMap() {
  return (
    <div className="presence-card">
      <div className="presence-glow" />
      <div className="presence-heading">
        <p>ACROSS THE KINGDOM</p>
        <h2>OUR PRESENCE</h2>
        <span />
      </div>
      <div className="map-canvas" aria-label="FlowVera office network across Saudi Arabia">
        <svg className="map-grid" viewBox={`0 0 ${mapWidth} ${mapHeight}`} preserveAspectRatio="none" aria-hidden="true">
          <g className="grid-lines">
            <path d="M0 36H464M0 76H464M0 116H464M0 156H464M0 196H464M0 236H464M0 276H464" />
            <path d="M42 0V290M96 0V290M150 0V290M204 0V290M258 0V290M312 0V290M366 0V290M420 0V290" />
          </g>
          <g className="route-lines">
            {routes.map((path) => (
              <path
                key={path}
                className="route-line"
                d={path}
                opacity="0.68"
              />
            ))}
          </g>
          <g className="route-pixels">
            {routes.map((path, routeIndex) =>
              [0, 1, 2].map((pixelIndex) => (
                <rect
                  key={`${routeIndex}-${pixelIndex}`}
                  className="route-pixel"
                  x="-2"
                  y="-2"
                  width="4"
                  height="4"
                  rx="0.5"
                  opacity={pixelIndex === 0 ? 1 : 0.72}
                >
                  <animateMotion
                    path={path}
                    dur="2.8s"
                    begin={`${0.9 + routeIndex * 0.3 + pixelIndex * 0.18}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                  />
                </rect>
              ))
            )}
          </g>
        </svg>
        {branches.map((branch) => (
          <div className="map-pin" key={branch.name} style={{ left: `${branch.x}%`, top: `${branch.y}%` }}>
            <span className="pin-pulse" aria-hidden="true" />
            <span className="pin-dot" aria-hidden="true" />
            <span className="pin-label">{branch.name}</span>
          </div>
        ))}
        <div className="map-head-office" style={{ left: `${origin.x}%`, top: `${origin.y}%` }}>
          <span className="origin-dot" aria-hidden="true" />
          <span className="origin-pulse" aria-hidden="true" />
          <strong>AL KHOBAR</strong>
          <span className="origin-label">HEAD OFFICE</span>
        </div>
      </div>
      <div className="office-cards">
        <div><small>HEAD OFFICE</small><strong>Al Khobar</strong></div>
        <div><small>BRANCHES</small><strong>Jubail · Dammam · Al Hasa<br />Jeddah · Riyadh</strong></div>
      </div>
    </div>
  );
}
