export function Loader({ progress }: { progress: number }) {
  if (progress >= 100) return null
  return <div className="asset-loader" role="status" aria-label="Loading portfolio artwork"><span className="monogram">m<span>k</span><i>.</i></span><span>{progress}%</span><div style={{ width: `${progress}%` }} /></div>
}
